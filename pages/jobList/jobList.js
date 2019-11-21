// pages/company/jobList.js
import ServerData from '../../utils/serverData.js';
const util = require('../../utils/util.js');  //通用方法
Page({
  data: {
    page: 1,
    isDel: false,
    isCheck: true,
    recruitData: [],
    dStatus: 0,
    id: '',
    noData: false,
    moreDataBtn: false,
  },
  // 编辑
  showDelectBox(e) {
    var status = e.currentTarget.dataset.aa
    let { recruitData } = this.data
    if (recruitData == '') {
      return ServerData._wxTost('没有推送简历')
    }
    if (status == 0) {
      this.setData({ moreDataBtn: true, noData: true, dStatus: 1 })
    } else {
      this.setData({ moreDataBtn: false, noData: false, dStatus: 0 })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.recruit()
    this.setData({
      pColor: util.loginIdentity().pColor,
      pBgC: util.loginIdentity().pBgC
    })
  },
  // 请求
  recruit() {
    var that = this,
      newArray = [],
      _opt = { 'page': that.data.page }
    ServerData.recruit(_opt).then((res) => {
      if (res.data.status == 1) {
        var data = res.data.data
        if (data.length < 1) {
          that.data.noData = true
        } else {
          that.data.moreDataBtn = true
          if (that.data.page == 1) {
            newArray = data
          } else {
            newArray = [...that.data.recruitData, ...data]
          }
        }
        for (var i in data) {
          data[i].selected = false
        }
        this.setData({
          recruitData: newArray
        })
      }
      else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../login/login'
        })
      }
      else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },

  // 删除招工信息
  detel() {
    let { recruitData } = this.data
    let that = this
    let index = -1
    let delnum = 0
    let arr = ''
    wx.showModal({
      title: '提示',
      content: '确定要删除吗',
      success(res) {
        if (res.confirm) {
          for (let i in recruitData) {
            if (recruitData[i].selected) {
              if (index == -1) {
                index = i
              }
              arr = arr + ',' + recruitData[i].id
              delnum++
            }
          }
          arr = arr.substr(1)
          if (arr == "") {
            return ServerData._wxTost('请选择要删除的信息')
          }
          recruitData.splice(index, delnum)
          ServerData.deleteRecruit({ ids: arr }).then((res) => {
            if (res.data.status == 1) {
              ServerData._wxTost(res.data.msg)
            } else {
              ServerData._wxTost(res.data.msg)
            }
          })
          that.setData({ recruitData, searchLoading: false })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    this.recruit()
  },
  changItemStatus(e) {
    var index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let list = this.data.recruitData
    list[index].selected = !list[index].selected; // 改变状态
    this.setData({
      recruitData: list
    });
  },
  detil() {
    wx.navigateBack({
      delta: 1,
    });
  }
})