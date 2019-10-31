// pages/userInfo/collect.js
import ServerData from '../../../utils/serverData.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
    regtype: '',
    collData: '',
    tabs: [
      { id: 1, name: '公司/服务商', isActive: true },
      { id: 2, name: '职位', isActive: false }
    ]
  },
  //点击切换
  clickTab: function (e) {
    let { index } = e.currentTarget.dataset;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({ tabs, currentTab: index + 1 })
    this.UcList();
  },

  UcList: function () {
    var _opt = {
      regtype: this.data.currentTab
    }
    ServerData.Ucollect(_opt).then((res) => {
      if (res.data.status == 1) {
        this.setData({
          collData: res.data.data
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
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
    this.UcList();
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