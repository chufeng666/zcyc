// pages/userInfo/setting.js
const util = require('../../utils/util.js');  //通用方法
import ServerData from '../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pBgC: '',
    mobile: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = ''
    if ('undefined' != typeof (options.mobile)) {
      t = options.openid.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2");
    }
    this.setData({
      mobile: t
    })
  },

  binWx () {
    var that = this
    wx.login({
      success: res => {
        var _opt = {
          code: res.code
        }
        ServerData.bindWeixin(_opt).then((res) => {
          if (res.data.status == 1) {
            ServerData._wxTost(res.data.msg)
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          } else if (res.data.status == -1) {
            wx.redirectTo({
              url: '../login/login'
            })
          } else {
            ServerData._wxTost(res.data.msg)
          }
        })
      }
    })
  },


  save: function () {
    wx.navigateTo({
      url: '../public/editMobile?mobile=' + this.data.mobile
    })
  },
  password: function () {
    wx.navigateTo({
      url: '../public/password'
    })
  },
  unLogin () {
    wx.removeStorageSync('token')
    wx.removeStorageSync('savePostion')
    wx.navigateTo({
      url: '../login/login'
    })

  }
})