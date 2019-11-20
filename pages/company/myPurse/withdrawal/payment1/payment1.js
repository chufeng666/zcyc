// pages/company/myPurse/payment/payment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    satus: '',
    txmoney: ''// 提现金额
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      txmoney: options.txmoney,
      satus: options.satus,
    })
  },
  datil() {
    wx.navigateBack({
      delta: 1,
    });
  }
})