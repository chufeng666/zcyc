// pages/public/companyContent/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 公司成立时间
    sameDay: '',
    // 公司规模
    index: 0,
    guimo: ["请选择公司规模", "0-20人", "20-99人", "100-499人", "500-999人", "1000-9999人", "10000人以上"],
    // 公司性质
    index2: 0,
    xingzhi: ['请选择公司性质', '国企', '民营', '私企']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  setSameDay (e) {
    this.setData({
      sameDay: e.detail.value
    })
  },
  // 公司规模
  setGuimo (e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 公司性质
  setXingzhi (e) {
    this.setData({
      index2: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})