// pages/cOrTInfo/cOrTInfo.js

import ServerData from '../../utils/serverData.js';
const util = require('../../utils/util.js');  //通用方法
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cList: [],          //公司列表
    pList: [],          //公司招聘列表
    companyId: '',
    pColor: '',                            //动态获z字体颜色 
    pBgC: '',                            //动态获背景颜色 
    tabs: [
      { id: 0, name: '公司介绍', isActive: true },
      { id: 1, name: '最新招聘', isActive: false }
    ],
    index: 0,
    savePostion: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let savePostion = wx.getStorageSync("savePostion");
    // 更改图标
    if (savePostion == 1 || savePostion == 2) {
      savePostion = 1
    }else {
      savePostion = 3
    }
    this.setData({
      companyId: options.company_id,
      savePostion
    })
    this.getRecruitList();
  },

  getRecruitList() {         // 要传给后台的参数
    var _opt = {
      company_id: this.data.companyId
    }
    ServerData.company_detail(_opt).then((res) => {
      if (res.data.status == 1) {
        this.setData({
          cList: res.data.company,
          pList: res.data.recruit_list
        })
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  // tabs
  handleItemChange(e) {
    let { index } = e.currentTarget.dataset;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({ tabs, index })
  }
})