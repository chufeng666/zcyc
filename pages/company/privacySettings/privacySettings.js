// pages/company/myReserve.js
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],
    bookListData: [],
    isShowR: false,                     // 没有数据是显示 
    searchLoading: false,               // 显示删除按钮和复选框
    dStatus: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.companyResume_list();
    let { bookListData } = this.data
    if (bookListData == []) {
      this.setData({
        isShowR: true
      })
    }
  },
  companyResume_list() {
    let page = 1
    let that = this
    ServerData.companyResume_list({ page }).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          bookListData: res.data.data
        })
      }
    })
  },
  bianji(e) {
    let { bookListData, searchLoading } = this.data
    if (bookListData == '') {
      return ServerData._wxTost('没有推送简历')
    }
    let status = e.currentTarget.dataset.aa,
      newS = ""
    if (status == 0) {
      newS = 1
      searchLoading = true
    } else {
      newS = 0
      searchLoading = false
    }
    this.setData({
      dStatus: newS,
      searchLoading
    })
  },
  detel() {
    let { bookListData } = this.data
    let that = this
    let index = -1
    let delnum = 0
    let arr = ''
    wx.showModal({
      title: '提示',
      content: '确定要删除吗',
      success(res) {
        if (res.confirm) {
          for (let i in bookListData) {
            if (bookListData[i].selected) {
              if (index == -1) {
                index = i
              }
              arr = arr + ',' + bookListData[i].id
              delnum++
            }
          }
          arr = arr.substr(1)
          if (arr == "") {
            return ServerData._wxTost('请选择要删除的信息')
          }
          bookListData.splice(index, delnum)
          ServerData.companyDel_resume({ id: arr }).then((res) => {
            if (res.data.status == 1) {
              ServerData._wxTost(res.data.msg)
            } else {
              ServerData._wxTost(res.data.msg)
            }
          })
          that.setData({ bookListData, searchLoading: false })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    this.companyResume_list()
  },
  changItemStatus(e) {
    var index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let bookListData = this.data.bookListData
    bookListData[index].selected = !bookListData[index].selected; // 改变状态
    this.setData({
      bookListData
    });
  },
  detil() {
    wx.navigateBack({
      delta: 1
    });
  }
})