// pages/company/More/More.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xingzhi: [
      { id: 0, name: "全部", isShow: true },
      { id: 1, name: "国企", isShow: false },
      { id: 2, name: "民营", isShow: false }
    ],
    guimo: [
      { id: 0, name: "全部", isShow: true },
      { id: 1, name: "0-20人", isShow: false },
      { id: 2, name: "20-99人", isShow: false },
      { id: 3, name: "100-499人", isShow: false },
      { id: 4, name: "500-999人", isShow: false },
      { id: 5, name: "1000-9999人", isShow: false },
      { id: 6, name: "10000人以上", isShow: false },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  changIsActive (e) {
    let { index } = e.currentTarget.dataset;
    let { xingzhi } = this.data
    xingzhi.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ xingzhi })
  },
  changZhiwei (e) {
    let { index } = e.currentTarget.dataset;
    let { guimo } = this.data
    guimo.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ guimo })
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