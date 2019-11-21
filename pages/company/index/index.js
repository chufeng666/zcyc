//index.js
//获取应用实例
const app = getApp()

const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';

Page({
  data: {
    mode: "scaleToFill",
    statusBarHeight: app.globalData.statusBarHeight,
    arr: [],
    indexData: [],//游客首页数据
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,

    job_type: '',                 //选中的职位值
    jobArray: [],                 //职位列表
    jobIndex: 0,                  //职位下标

    //地址三级开始
    pCode: '',                    //获取选中的省ID
    cCode: '',                    //获取选中的市ID
    aCode: '',                    //获取选中的区ID
    site_show: false,             //是否选择人才
    showTST: true,                  //是否选择地址
    tabs: [
      { id: 0, title: "人才", isActive: true },
      { id: 1, title: "服务商", isActive: false },
    ],
    index: 0,
    popular: [],
    isShow: true,
    arry: []
  },

  onShow: function () {
    this.initUserInfo()
  },
  // 是否完善信息请求
  initUserInfo() {
    ServerData.initUserInfo({}).then((res) => {
      if (res.data.status == 1) {
        var info = res.data.data
        if (info.audit_status == null) {
          wx.showModal({
            title: '提示',
            content: '是否完善个人信息',
            success(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/company/editInfo/editInfo'
                })
              } else if (res.cancel) {
              }
            }
          })
        }
        this.setData({
          audit_status: info.audit_status,
        })
      }
    })
  },
	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function () {
    this.messageList()
    this.reqIndex(); //请求数据
    util.getStorageItem('savePostion', app)   //
    /*********地址 */
    if (wx.hideHomeButton) wx.hideHomeButton()
    this.addressForm = this.selectComponent('#address');
    /*********地址 */
    /*********职业 */
    this.Occupational = this.selectComponent('#Occupational');
    /*********职业 */
  },
	/**
	 * 请求数据
	 */
  reqIndex() {
    var that = this,
      _opt = {
        'province': that.data.pCode,
        'city': that.data.cCode,
        'district': that.data.aCode,
      }
    ServerData.userVisit(_opt).then((res) => {
      if (res.data.status == 1) {
        this.setData({
          indexData: res.data.data,
        })
      }
      else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      }
      else {
        ServerData._wxTost(res.data.msg)
      }
    }).catch((error) => {
      ServerData._wxTost("数据请求失败!")
    })
  },
  /***********职位选择**************** */
  tabEvent1(data) {
    let info = data.detail
    console.log(info);
    this.setData({
      job_type: info.job_careers,
      isShow: false
    })
    this.reqIndex()
  },
  selectOccupational: function (e) {
    this.Occupational.showPopup()
    this.Occupational.startAddressAnimation(true)
    this.setData({
      occupationalBoxShow: false
    })
  },
  /***********地址开始**************** */
  tabEvent(data) {      //接收传过来的参数
    var info = data.detail
    this.setData({
      areaInfo: info.areaInfo,
      pCode: info.pCode,
      cCode: info.cCode,
      aCode: info.aCode,
      showTST: info.showTST
    })
    this.reqIndex()
  },

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    this.addressForm.showPopup()
    this.addressForm.startAddressAnimation(true)
  },
  /***********地址结束**************** */
  // tabs栏
  changeTitleByIndex(e) {
    const { index } = e.currentTarget.dataset;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({ tabs, index });
    this.reqIndex();
  },
  messageList() {
    ServerData.messageList({}).then((res) => {
      console.log(res);
      if (res.data.code === 1) {
        this.setData({
          array: res.data.data
        })
      }
    })
  },
})
