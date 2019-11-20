// pages/information/infoDetail.js
var WxParse = require('../wxParse/wxParse.js');
import ServerData from '../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dId: '',
    info: {},
    addTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options) {
      this.setData({ dId: options.id })
    }
    this.getDtailInfo()
  },

  getDtailInfo () {
    var that = this,
      time = ''
    ServerData.messageDetail({ id: that.data.dId}).then((res) => {
      let info = res.data.data;
      console.log(info);
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
  fanhui(){
    wx.navigateBack({
      delta: 1
    });
      
  }
})