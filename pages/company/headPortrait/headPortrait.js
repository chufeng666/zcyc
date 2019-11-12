// pages/userInfo/headPortrait.js
import ServerData from '../../../utils/serverData.js';
const util = require('../../../utils/util.js');  //通用方法
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  initUserInfoSeven () {
    let { logo } = this.data
    ServerData.setCompanyInfo7({ logo }).then((res) => {
      if (res.data.status == 1) {
        ServerData._wxTost(res.data.msg)
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
      ServerData._wxTost(res.data.msg)
    })
  },
  addPosPic () {
    var _this = this
    let { logo } = _this.data;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgSrc = res.tempFilePaths[0];
        ServerData.uploadFile(imgSrc).then((res) => {
          var dat = JSON.parse(res.data)
          if (dat.status == 1) {
            logo = dat.data
            _this.setData({
              logo, isShow2: false,
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
})