// pages/auditInfo/explain.js
import ServerData from '../../utils/serverData.js';
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    info: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name
    })
    var that = this
    ServerData.helpExp({ 'name': options.name }).then((res) => {
      // console.log(res.data)
      if (res.data.status == 1) {
        var article = res.data.data
        WxParse.wxParse('article', 'html', article, that, 0)
        that.setData({ info: article })
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  detil() {
    wx.navigateBack({
      delta: 1
    });
  }

})