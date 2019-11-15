//index.js
//获取应用实例
const app = getApp()

const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';

Page({
  data: {
    jobIndex:0,
    jobArray: [],                 //职位列表
    //地址三级开始
    site_show: false,             //是否选择人才
    showTST: true,         //是否选择地址
    mode: "scaleToFill",
    arr: [],
    indexData: [],//游客首页数据
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    province: '',
    city: '',
    district: '',
    tabs: [
      { id: 0, title: "最新", isActive: true },
      { id: 1, title: "最热", isActive: false },
    ],
    index: 0,
    popular: [],
    array: [],
    job_type:'',
    isShow:true
  },

  onShow: function () {
    // wx.showModal({
    //   title: '提示',
    //   content: '是否完善个人信息',
    //   success (res) {
    //     if (res.confirm) {
    //       wx.redirectTo({
    //         url: '../userInfo2/editInfo/editInfo'
    //       })
    //     } else if (res.cancel) {
    //     }
    //   }
    // })
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function () {
    this.messageList()
    this.reqIndex(); //请求数据
    util.getStorageItem('savePostion', app);   //
    /*********地址 */
    if (wx.hideHomeButton) wx.hideHomeButton()
    this.addressForm = this.selectComponent('#address');
    /*********地址 */
    /*********职业 */
    this.Occupational = this.selectComponent('#Occupational');
    /*********职业 */
  },
  reqIndex() {
    var that = this,
      _opt = {
        'job_type': that.data.job_type,
        'province': that.data.province,
        'city': that.data.city,
        'district': that.data.district,
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
    ServerData.recruitHot(_opt).then((res) => {

      if (res.data.status == 1) {
        this.setData({
          popular: res.data.data,
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
      isShow:false
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
  /***********职位选择**************** */
  tabEvent(data) {      //接收传过来的参数
    var info = data.detail

    this.setData({
      areaInfo: info.areaInfo,
      province: info.province,
      city: info.city,
      district: info.area,
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
    console.log(e.currentTarget.dataset);
    const { index } = e.currentTarget.dataset;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({ tabs, index });
  },
  messageList() {
    var toke = wx.getStorage('token')
    ServerData.messageList({ toke }).then((res) => {
      if (res.data.code === 1) {
        this.setData({
          array: res.data.data
        })
      }
    })
  },

})
