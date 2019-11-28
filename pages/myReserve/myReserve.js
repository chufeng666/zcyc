// pages/company/myReserve.js
const util = require('../../utils/util.js');  //通用方法
import ServerData from '../../utils/serverData.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],
    bookListData: [],
    isShowR: false,                      // 没有数据是显示 
    pageNum: 1,                         // 设置加载的第几次，默认是第一次  
    searchLoading: false,               //显示删除按钮和复选框 
    dStatus: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bookList();
    let { bookListData } = this.data
    if (bookListData == []) {
      this.setData({
        isShowR:true
      })
    }
  },
  onShow() {
    wx.getSystemInfo({
      success: (res) => { // 用这种方法调用，this指向Page
        this.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  changItemStatus(e) {
    var index = e.currentTarget.dataset.index; // 获取data- 传进来的index
    let bookListData = this.data.bookListData
    bookListData[index].selected = !bookListData[index].selected; // 改变状态
    this.setData({
      bookListData
    });
  },
  bianji(e) {
    let { bookListData, searchLoading } = this.data
    if (bookListData == '') {
      return ServerData._wxTost('没有预定的人才')
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
  bookList: function () {
    var that = this
    ServerData.bookingList({ 'page': that.data.pageNum }).then((res) => {
      if (res.data.status == 1) {
        var sstatus = false,
          nodata = false
        if (res.data.data.length < 1) {
          if (that.data.pageNum == 1) {
            sstatus = true
          } else {
            nodata = true
          }
        }
        this.setData({
          bookListData: res.data.data,
          isShowR: sstatus,
          noMoreData: nodata
        })
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      }
      else {
        ServerData._wxTost(res.data.msg)
      }
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
      content: '确定要取消预订吗',
      success(res) {
        if (res.confirm) {
          for (let i in bookListData) {
            if (bookListData[i].selected) {
              if (index == -1) {
                index = i
              }
              arr = arr + ',' + bookListData[i].person_id
              delnum++
            }
          }
          arr = arr.substr(1)
          if (arr == "") {
            return ServerData._wxTost('请选择要取消的岗位')
          }
          bookListData.splice(index, delnum)
          console.log(arr);
          ServerData.companyDel_reserve({ id: arr }).then((res) => {
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
    this.bookList()
  },
  // scrollLower() {
  //   var that =this
  //   if (that.data.listArry==""){
  //     return
  //   }
  //   ServerData._showLoading('加载中')
  //   that.bookList()
  // }
  detil(){
    wx.navigateBack({
      delta: 1
    });
  }
})