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
    jishu: [
      { name: '建筑', id: 1 },
      { name: '机电', id: 2 },
      { name: '水利水电', id: 3 }
    ],
    zizhi: [
      { name: '建筑工程施工总承包资质二级', id: 1 },
      { name: '电力工程施工总承包资质三级', id: 2 }
    ],
    tabs: [
      { id: 0, name: '公司介绍', isActive: true },
      { id: 1, name: '最新招聘', isActive: false }
    ],
    index: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      companyId: options.company_id,
      pBgC: util.loginIdentity().pBgC,
      pColor: util.loginIdentity().pColor
    })
    this.lookCompany()
    this.getRecruitList()
  },
  onReady: function () {

  },

  lookCompany () {         // 要传给后台的参数
    var _opt = {
      company_id: this.data.companyId
    }
    ServerData.lookCompany(_opt).then((res) => {
      if (res.data.status == 1) {
        this.setData({
          cList: res.data.data,
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
  getRecruitList () {         // 要传给后台的参数
    var _opt = {
      company_id: this.data.companyId
    }
    ServerData.getRecruitList(_opt).then((res) => {
      if (res.data.status == 1) {
        this.setData({
          pList: res.data.data,
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
  handleItemChange (e) {
    let { index } = e.currentTarget.dataset;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({ tabs, index })
  }
})