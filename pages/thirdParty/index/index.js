//index.js

import ServerData from '../../../utils/serverData.js';
const app = getApp()          //获取应用实例
const util = require('../../../utils/util.js');  //通用方法
Page({
  data: {
    list: [],
    indicatorDots: true,
    autoplay: true,               //自动播放
    interval: 3000,               //播放间隔
    duration: 1000,               //停留时间
    job_type: '',                 //选中的职位值
    jobArray: [],                 //职位列表
    jobIndex: 0,                  //职位下标

    pCode: '',                    //获取选中的省ID
    cCode: '',                    //获取选中的市ID
    aCode: '',                    //获取选中的区ID
    site_show: false,
    showTST: true,
    tabs: [
      { id: 0, title: "最新", isActive: true },
      { id: 1, title: "最热", isActive: false },
    ],
    index: 0

  },
  onLoad: function () {
    util.getStorageItem('savePostion', app)   //获取底部导航
    this.getUserInfo()             //主页信息
    this.getCategoryList()         //职位列表

    /*********地址 */
    if (wx.hideHomeButton) wx.hideHomeButton()
    this.addressForm = this.selectComponent('#address');
    /*********地址 */

  },
  getUserInfo: function () {
    var that = this,
      _opt = {
        'job_type': that.data.job_type,
        'province': that.data.pCode,
        'city': that.data.cCode,
        'district': that.data.aCode,
      }
    ServerData.userVisit(_opt).then((res) => {
      // console.log(res.data)
      if (res.data.status == 1) {
        that.setData({
          list: res.data.data
        })

      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login',
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  getCategoryList () {
    var that = this
    ServerData.categoryList({}).then((res) => {

      if (res.data.status == 1) {
        var newArry = []
        newArry.push({ cat_id: '', cat_name: "选择人才" })
        var recl = [...newArry, ...res.data.data]
        this.setData({ jobArray: recl })
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  jobChange: function (e) {
    var t = e.detail.value == 0 ? false : true
    this.setData({
      jobIndex: e.detail.value,
      job_type: this.data.jobArray[e.detail.value].cat_id,
      site_show: t
    })
    this.getUserInfo()             //主页信息
  },
  onShareAppMessage: function () {
    return
  },
  /***********地址开始**************** */
  tabEvent (data) {      //接收传过来的参数
    var info = data.detail
    this.setData({
      areaInfo: info.areaInfo,
      pCode: info.pCode,
      cCode: info.cCode,
      aCode: info.aCode,
      showTST: info.showTST
    })
    this.getUserInfo()
  },

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    this.addressForm.showPopup()
    this.addressForm.startAddressAnimation(true)
  },
  /***********地址结束**************** */
  // tabs栏
  changeTitleByIndex (e) {
    const { index } = e.currentTarget.dataset;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({ tabs, index });
  },


})
