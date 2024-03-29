// pages/userInfo/collect.js
import ServerData from '../../../utils/serverData.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 3,
    data: [],
    data2: [],
    tabs: [
      { id: 0, name: '公司/服务商', isActive: true },
      { id: 1, name: '职位', isActive: false }
    ],
    index: 0
  },

  collectionList: function () {
    var _opt = {
      'page': 1,
      'regtype': this.data.currentTab
    }
    ServerData.Ucollect(_opt).then((res) => {
      if (res.data.status == 1) {
        this.setData({
          data: res.data.data,
          data2: res.data.data2,
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  onPullDownRefresh: function () {
    this.collectionList()
  },
  tabs(e) {
    let { index } = e.currentTarget.dataset;
    let { tabs } = this.data;
    tabs.forEach((v, i) => { i === index ? v.isActive = true : v.isActive = false })
    this.setData({ tabs, index })
  },
  onShow:function () {
    this.collectionList()
  }
})