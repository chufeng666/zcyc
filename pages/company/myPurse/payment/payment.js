// pages/company/myPurse/payment/payment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    id: '',
    status: 0,
    msg: '',
    money: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      id: options.id,
      status: options.status,
      money: options.money,
      msg: options.msg,

    })
    let { status } = this.data
    console.log(status);
    if (status == 1) {
      this.setData({
        isShow: true
      })
    } else {
      this.setData({
        isShow: false
      })
    }
  },
  detail() {
    wx.navigateBack({
      delta: 1,
    })
  }
})