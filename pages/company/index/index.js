//index.js
//获取应用实例
const app = getApp()

const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';

Page({
  data: {
    // 消息
    array: [],
    //游客首页数据
    indexData: [],
    // 轮播图
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    // 更多返回的数据
    require_cert: '', //证书
    type: '',        //工种
    education: '',  // 学历
    work_age: '',   // 工龄
    salary: '',     // 薪资
    //地址
    showTST: true,                  //是否选择地址
    province: '',
    city: '',
    district: '',
    tabs: [
      { id: 0, title: "人才", isActive: true },
      { id: 1, title: "服务商", isActive: false },
    ],
    index: 0,
    // 历史消息模态框开关
    isShow: false,
  },

  onShow: function () {
    let { require_cert, type, education, work_age, salary } = this.data;
    if (require_cert != '' || type != '' || education != '' || work_age != '' || salary != '') {
      this.reqIndex()
    }
    this.initUserInfo()
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
  /* 搜索内容传递给请求部分 */
  handeSearchInput(e) {
    // 2 输入框的值
    const { value } = e.detail;
    this.setData({
      isShow: false,
    })
    // // 4 正常
    setTimeout(() => {
      this.reqIndex(value);
    }, 1000);
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
	/**
	 * 请求数据
	 */
  reqIndex(value) {
    let { province, city, district, require_cert, type, education, work_age, salary } = this.data
    var that = this
    if (require_cert == '有证书') {
      require_cert = 0
    } else if (require_cert == '无证书') {
      require_cert = 1
    } else {
      require_cert = ''
    }
    if (type && education && work_age === '全部' || salary === '不限') {
      type = '';
      education = '';
      work_age = '';
      salary = ''
    }
    let _opt = {
      'title': value,
      'province': province,
      'city': city,
      'district': district,
      'regtype': 1,
      'require_cert': require_cert,
      'type': type,
      'education': education,
      'work_age': work_age,
      'salary': salary,
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
  },
  // 消息
  messageList() {
    ServerData.messageList({}).then((res) => {
      if (res.data.code === 1) {
        this.setData({
          array: res.data.data
        })
      }
    })
  },
})
