//index.js

import ServerData from '../../../utils/serverData.js';
const app = getApp()          //获取应用实例
const util = require('../../../utils/util.js');  //通用方法
let currentPage = 0
Page({
  data: {
    person: [],
    recruit: [],
    array: [],
    noData: false,
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    tabs: [
      { id: 0, title: "人才", isActive: true },
      { id: 1, title: "企业", isActive: false },
    ],
    index: 0,
    audit_status: [],//是否完善信息
    isShow: false,
    // 更多返回的数据
    showTST2: false,
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
    page: 1,
  },
  onLoad: function () {
    util.getStorageItem('savePostion', app)   //获取底部导航
    this.getUserInfo()           //主页信息
    this.initUserInfo()          //完善信息请求
    this.messageList()          //消息请求
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

    if (require_cert != '' || type != '' || education != '' || work_age != '' || salary != '') {
      this.setData({
        showTST2: true
      })
      this.getUserInfo()
    }
  },
  //主页信息请求
  getUserInfo: function () {
    let { province, city, district, type, title, require_cert, education, work_age, salary } = this.data;
    if (this.data.page == 1) {
      ServerData._showLoading('加载中')
    }
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
      'page': that.data.page,
    }
    ServerData.userVisit(_opt).then((res) => {
      if (res.data.status == 1) {
        if (res.data.data.person == '') {
          that.setData({
            noData: true
          })
        } else {
          that.setData({
            person: [...that.data.person, ...res.data.data.person],
            // recruit: [...that.data.recruit, ...res.data.data.recruit],
          })
        }
        if (res.data.data.recruit == '') {
          that.setData({
            noData: true
          })
        } else {
          that.setData({
            // person: [...that.data.person, ...res.data.data.person],
            recruit: [...that.data.recruit, ...res.data.data.recruit],
          })
        }
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
      person: [],
      recruit: [],
      page: 1
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
      showTST: info.showTST,
      person: [],
      recruit: [],
      page: 1
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
  changeTitleByIndex(e) {
    const { index } = e.currentTarget.dataset;
    console.log(index);
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({ tabs, index });
  },
  onReachBottom: function () {
    let { noData } = this.data
    if (noData) {
      return ServerData._wxTost('暂无更多数据')
    }
    this.setData({
      page: this.data.page + 1,
    })
    this.getUserInfo();
  },
  bindtapMore() {
    setTimeout(() => {
      this.setData({
        person: [],
        recruit: [],
        page: 1
      })
    }, 1000);
  },
  messageList() {
    var that = this,
      newArray = []
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
