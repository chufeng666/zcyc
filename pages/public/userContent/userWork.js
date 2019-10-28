// pages/public/userContent/userWork.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 公司名称
    corporate: '广州万宝有限公司',
    // 职位名称
    gangwei: '安全员',
    // 当天时间
    sameDay: '',
    sameDay2: '至今',
    jingli: '1.负责落实公司各项安全规章管理制度\n2.确保项目部顺利实行安全生产工作\n3.现场检查管理工作及内场资料。'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.sameDay();
  },
  // 当天时间
  sameDay () {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    this.setData({
      sameDay: Y + '-' + M
    })
  },
  setSameDay (e) {
    this.setData({
      sameDay: e.detail.value
    })
  },
  setSameDay2 (e) {
    this.setData({
      sameDay2: e.detail.value
    })
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