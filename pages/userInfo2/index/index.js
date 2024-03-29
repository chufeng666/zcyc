//index.js
//获取应用实例
const app = getApp()

const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';

Page({
  data: {
    showTST: true,         //是否选择地址
    person: [],         //游客首页数据
    recruit: [],         //游客首页数据
    // 轮播图
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    //地址
    showTST1: true,
    province: '',
    city: '',
    district: '',
    // 消息
    array: [],
    // 历史窗口
    isShow: false,
    audit_status: [],//是否完善信息
    //tab栏
    index: 0,
    tabs: [
      { id: 0, title: "最新", isActive: true },
      { id: 1, title: "最热", isActive: false },
    ],
    noData: false,
    // 更多返回的数据
    require_cert: '', //证书
    education: '',  // 学历
    work_age: '',   // 工龄
    salary: '',     // 薪资
    type: '',         //工种
    page: 1,         //工种
  },
  onShow: function () {
    let { require_cert, type, education, work_age, salary, person, recruit } = this.data;
    if (require_cert != '' || type != '' || education != '' || work_age != '' || salary != '') {
      this.setData({
        showTST1: false
      })
      this.reqIndex()
    }
    this.initUserInfo();
  },
	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function () {
    this.messageList()
    this.reqIndex(); //请求数据
    this.category();
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
    let { province, city, district, type, title, job_type, require_cert, education, work_age, salary } = this.data;
    if (this.data.page == 1) {
      ServerData._showLoading('加载中')
    }
    var that = this;
    if (require_cert == '需要证书') {
      require_cert = 1
    } else if (require_cert == '无需证书') {
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
      'province': province,
      'city': city,
      'district': district,
      'title': title,
      'job_type': job_type,
      'type': type,
      'education': education,
      'work_age': work_age,
      'salary': salary,
      'require_cert': require_cert,
      'page': that.data.page
    }
    ServerData.userVisit(_opt).then((res) => {
      if (res.data.status == 1) {
        if (res.data.data.person == '') {
          this.setData({
            noData: true,
          })
        } else {
          this.setData({
            person: [...that.data.person, ...res.data.data.person],
            // recruit: [...that.data.recruit, ...res.data.data.recruit],
          })
        }
        if (res.data.data.recruit == '') {
          this.setData({
            noData: true,
          })
        } else {
          this.setData({
            // person: [...that.data.person, ...res.data.data.person],
            recruit: [...that.data.recruit, ...res.data.data.recruit],
          })
        }
      }
      else if (res.data.status == -1) {
        wx.navigateTo({
          url: '../../login/login'
        })
      }
      else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },

  // 是否完善信息请求
  initUserInfo() {
    let regtype = wx.getStorageSync("savePostion")
    ServerData.initUserInfo({ regtype }).then((res) => {
      if (res.data.status == 1) {
        var info = res.data.data
        if (info.audit_status == null) {
          wx.showModal({
            title: '提示',
            content: '是否完善个人信息',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/userInfo2/editInfo/editInfo'
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
    this.reqIndex()
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
      showTST1: info.isShow,
      job_type: info.job_type
    })
    this.reqIndex()
  },

  // 点击所在地区弹出选择框
  selectOccupational: function (e) {
    this.Occupational.showPopup()
    this.Occupational.startAddressAnimation(true)
  },
  /***********职位结束**************** */

  // tabs栏
  changeTitleByIndex(e) {
    const { index } = e.currentTarget.dataset;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({ tabs, index });
  },

  // 消息请求
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
    setTimeout(() => {
      this.reqIndex();
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
  category() {
    let that = this
    ServerData.category({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          jobArry: res.data.data
        })
      }
    })
  },
  onReachBottom: function () {
    let { noData } = this.data;
    if (noData) {
      return ServerData._wxTost('暂无更多数据')
    }
    this.setData({
      page: this.data.page + 1,
    })
    this.reqIndex();
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
  // lookMore() {
  //   let { noData } = this.data
  //   if (noData) {
  //     ServerData._wxTost('暂无数据')
  //   }
  // },
})
