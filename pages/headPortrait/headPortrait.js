// pages/userInfo/headPortrait.js
import ServerData from '../../utils/serverData.js';
const util = require('../../utils/util.js');  //通用方法
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo: '',
    buttonClicked: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let regtype = wx.getStorageSync('savePostion')
    if (regtype == 1 || regtype == 2) {
      this.setData({
        isShow: false,
        bgc: util.loginIdentity().pBC,
      })
    } else {
      this.setData({
        bgc: util.loginIdentity().pBgC,
      })
    }
    this.setCompanyInfo7()
  },
  setCompanyInfo7() {
    var that = this
    ServerData.setCompanyInfo7({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          logo: res.data.data.logo
        })
      }
    })
  },
  setCompanyInfoSeven() {
    var that = this,
      logo = that.data.logo
    if (logo == "") { return ServerData._wxTost("请选择头像") }
    ServerData.setCompanyInfoSeven({ 'logo': logo }).then((res) => {
      if (res.data.status == 1) {
        ServerData._wxTost(res.data.msg)
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      } else if (res.data.status == 1) {
        ServerData.showModal('是否不修改信息').then(res => {
          wx.navigateBack({
            delta: 1
          })
        }).catch(rex => {

        })
      }
      ServerData._wxTost(res.data.msg)
    })
  },
  addIdCardPic: function (e) {                                    //头像上传
    var _this = this,
      logo = _this.data.logo;
    ServerData.buttonClicked(this);
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
              logo
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