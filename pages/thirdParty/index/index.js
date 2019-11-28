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
    tabs: [
      { id: 0, title: "人才", isActive: true },
      { id: 1, title: "企业", isActive: false },
    ],
    index: 0,
    audit_status: [],//是否完善信息
    isShow: false,
    // 更多返回的数据
    require_cert: '', //证书
    education: '',  // 学历
    work_age: '',   // 工龄
    salary: '',     // 薪资
    type: '',         //工种
    //地址
    showTST: true,                  //是否选择地址
    province: '',
    city: '',
    district: '',
    //搜索
    showTST1: true,
    title: '',        //职位

  },
  onLoad: function () {
    util.getStorageItem('savePostion', app)   //获取底部导航
    this.getUserInfo()           //主页信息
    this.initUserInfo()          //完善信息请求
    /*********地址 */
    if (wx.hideHomeButton) wx.hideHomeButton()
    this.addressForm = this.selectComponent('#address');
    /*********地址 */
    /*********职位 */
    this.Occupational = this.selectComponent('#Occupational');
    /*********职位 */
  },
  onShow: function () {
    let { require_cert, education, type, work_age, salary } = this.data;
    console.log(type);
    if (require_cert != '' || type != '' || education != '' || work_age != '' || salary != '') {
      this.getUserInfo()
    }
  },
  //主页信息请求
  getUserInfo: function () {
    let { province, city, district, type, title, require_cert, education, work_age, salary } = this.data
    var that = this
    if (require_cert == '有证书') {
      require_cert = 1
    } else if (require_cert == '无证书') {
      require_cert = 0
    } else {
      require_cert = ''
    }
    if (work_age == '全部') {
      work_age = '';
    }
    if (type == '全部') {
      type = '';
    }
    if (education == '全部') {
      education = '';
    }
    if (salary == '不限') {
      salary = ''
    }
    let _opt = {
      'title': title,
      'province': province,
      'city': city,
      'district': district,
      'regtype': 2,
      'type': type,
      'education': education,
      'work_age': work_age,
      'salary': salary,
      'require_cert': require_cert,
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
  // 是否完善信息请求
  initUserInfo() {
    let regtype = wx.getStorageSync("savePostion")
    ServerData.setCompanyInfo({ regtype }).then((res) => {
      if (res.data.status == 1) {
        var info = res.data.data
        if (info.audit_status == null) {
          wx.showModal({
            title: '提示',
            content: '是否完善个人信息',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/thirdParty/editInfo/editInfo'
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
  //主页信息请求
  /* 搜索内容传递给请求部分 */
  handeSearchInput(e) {
    // 2 输入框的值
    const { value } = e.detail;
    this.setData({
      title: value,
      isShow: false,
    })
    // // 4 正常
    setTimeout(() => {
      this.getUserInfo();
    }, 0);
  },
  bindfocus(e) {
    this.setData({
      isShow: true,
    })
  },
  bindblur(e) {
    this.setData({
      isShow: false,
    })
  },
  /* 搜索内容传递给请求部分 */
  /***********地址开始**************** */
  tabEvent(data) {      //接收传过来的参数
    var info = data.detail
    this.setData({
      areaInfo: info.areaInfo,
      province: info.province,
      city: info.city,
      district: info.area,
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
  /***********职位开始**************** */
  tabEvent1(data) {      //接收传过来的参数
    var info = data.detail
    this.setData({
      title: info.job_careers,
      type: info.job_intention,
      showTST1: info.isShow
    })
    this.getUserInfo()
  },
  // 点击所在地区弹出选择框
  selectOccupational: function (e) {
    this.Occupational.showPopup()
    this.Occupational.startAddressAnimation(true)
  },
  /***********职位开始结束**************** */
  // tabs栏
  changeTitleByIndex(e) {
    const { index } = e.currentTarget.dataset;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({ tabs, index });
  },
})
