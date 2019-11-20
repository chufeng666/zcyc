// pages/userInfo/collect.js
import ServerData from '../../../utils/serverData.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
    collData: [],
  },
  onLoad: function () {
    this.UcList()
  },
  UcList: function () {
    var _opt = {
      'page': 1,
      'regtype': this.data.currentTab
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
  onPullDownRefresh: function () {
    this.collectionList()
  },
  detil() {
    wx.navigateBack({
      delta: 2,
    });
  }
})