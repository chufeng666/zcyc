// pages/information/infoDetail.js
var WxParse = require('../wxParse/wxParse.js');
import ServerData from '../../utils/serverData.js';
const util = require('../../utils/util.js');  //通用方法
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dId: '',
    info: {},
    addTime: '',
    bgc:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options) {
      this.setData({ dId: options.id });
    }
    this.getDtailInfo();
    let regtype = wx.getStorageSync('savePostion');
    if (regtype == 1 || regtype == 2) {
      this.setData({
        bgc: util.loginIdentity().pBC
      })
    } else {
      this.setData({
        bgc: util.loginIdentity().pBgC
      })
    }
  },

  getDtailInfo() {
    var that = this,
      time = ''
    ServerData.messageDetail({ id: that.data.dId }).then((res) => {
      let info = res.data.data;
      if (res.data.code == 1) {
        time = ServerData._timeStampForwardAate(res.data.data.create_time);
        var article = info.content
        // console.log(article);
        WxParse.wxParse('article', 'html', article, that, 0)
        that.setData({
          info: info,
          addTime: time
        })
      }
      else if (res.data.code == -1) {
        wx.redirectTo({
          url: '../login/login'
        })
      }
      else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  fanhui() {
    wx.navigateBack({
      delta: 1
    });
  }
})