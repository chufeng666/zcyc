// pages/userInfo/search.js
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cStatus: 0,
    list: [],
    isShowInfo: false,
    pCode: '',                    //获取选中的省ID
    cCode: '',                    //获取选中的市ID
    aCode: '',                    //获取选中的区ID
    site_show: false,             //是否选择人才
    showTST: true,                //是否选择地址
    hiddenhistory: false,
    require_cert: '', //证书
    type: '',        //工种
    education: '',  // 学历
    work_age: '',   // 工龄
    salary: '',     // 薪资
    province: '',
    city: '',
    district: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*********地址 */
    if (wx.hideHomeButton) wx.hideHomeButton()
    this.addressForm = this.selectComponent('#address');
    /*********地址 */

  },
  onShow: function (params) {
    let { require_cert, type, education, work_age, salary } = this.data;
    if (require_cert && type && education && work_age && salary !== '') {
      this.reqIndex()
    }
  },
  // 1 定时器id
  TimeId: -1,
  handeSearchInput(e) {
    // 2 输入框的值
    const { value } = e.detail;
    // 3 简单做一些验证 trim() 
    if (!value.trim()) {
      this.setData({
        goods: [],
        inputValue: "",
        isFocus: false
      })
      // 不合法 
      return;
    }
    this.setData({
      isShowInfo: true
    })
    // // 4 正常
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.reqIndex(value);
    }, 1000);
  },
	/**
	 * 请求数据
	 */
  reqIndex(value) {
    let { require_cert, type, education, work_age, salary, province, city, district } = this.data
    var that = this
    if (require_cert == '需要证书') {
      require_cert = 0
    } else if (require_cert == '无需证书') {
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
      'name': value,
      'type': type,
      'education': education,
      'work_age': work_age,
      'salary': salary,
      'province': province,
      'city': city,
      'district': district,
    }
    ServerData.userVisit(_opt).then((res) => {
      if (res.data.status == 1) {
        if (res.data.data.recruit.length < 1 || res.data.data.person.length < 1) {
          that.setData({ hiddenhistory: true })
        } else {
          this.setData({
            list: res.data.data,
            isShowInfo: true,
            hiddenhistory: false
          })
        }
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
      pCode: info.pCode,
      cCode: info.cCode,
      aCode: info.aCode,
      showTST: info.showTST,
      province: info.province,
      city: info.city,
      district: info.area
    })
    this.reqIndex()
  },

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    this.addressForm.showPopup()
    this.addressForm.startAddressAnimation(true)
  },
  /***********地址结束**************** */
  changStatus: function (e) {
    this.setData({
      cStatus: e.currentTarget.dataset.status
    })
  },
})