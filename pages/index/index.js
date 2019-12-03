//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js');  //通用方法
import ServerData from '../../utils/serverData.js';
Page({
	/**
	 * 页面的初始数据
	 */
  data: {
    mode: "scaleToFill",
    statusBarHeight: app.globalData.statusBarHeight,
    array: [], // 消息数据
    indexData: [],//游客首页数据
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    tabs: [
      { id: 0, title: "最新", isActive: true },
      { id: 1, title: "最热", isActive: false },
    ],
    index: 0,
    showTST: true
  },

	/**
	* 生命周期函数--监听页面加载
	*/
  onLoad: function () {
    this.reqIndex(); //请求数据
    util.getStorageItem('savePostion', app)   //获取底部导航
    this.messageList()
  },

	/**
	 * 请求数据
	 */
  reqIndex: function () {
    ServerData.reqIndex({}).then((res) => {
      if (res.data.status == 1) {
        this.setData({
          indexData: res.data.data
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    }).catch((error) => {
      console.log("数据请求失败!")
    })
  },
  messageList() {
    var that = this,
      newArray = []
    var toke = wx.getStorage('token')
    ServerData.messageList({ toke }).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        this.setData({
          array: res.data.data
        })
      }
    })
  },
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
  onReady: function () {

  },

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // tabs栏
  changeTitleByIndex(e) {
    const { index } = e.currentTarget.dataset;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({ tabs, index });
  },
})
