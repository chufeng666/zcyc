// pages/examinationSystem/examinationSystem/examinationSystem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    // interval: 2000,
    // duration: 500
    arr:['企业主要负责人','项目主要负责人','专职安全生产管理员','企业主要负责人','项目主要负责人111','专职安全生产管理员'],
    currentTab:0
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
  handleClick(e){
    let currentTab = e.currentTarget.dataset.index
    this.setData({
      currentTab
    })
  },
  detail() {
    wx.navigateBack({
      delta: 1,
    });
  }
})