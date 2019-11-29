// pages/userInfo/myInfo.js
const app = getApp();
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';
// import commonData from '../../../utils/serverData.js';
Page({
  data: {
    hiringData: [],
    row: 10,                      //默认拿10条
    page: 1,                      //默认第一页

    //地址三级开始
    province: '',
    city: '',
    district: '',
    site_show: false,
    showTST: true,
    // 筛选
    require_cert: '', //证书
    school_type: '',  // 学历
    work_age: '',   // 工龄
    salary: '',     // 薪资 
    //职位
    showTST1: true,
    careers: '',         //工种
    job_intention: '',        //职位  一级    
  },
  setXingzhi(e) {
    let { jobArray } = this.data;
    this.setData({
      job_intention: jobArray[e.detail.value]
    })
    this.hiring()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getStorageItem('savePostion', app)
    this.hiring()
    if (wx.hideHomeButton) wx.hideHomeButton();
    /*********地址 */
    this.addressForm = this.selectComponent('#address');
    /*********地址 */
    /*********职位 */
    this.Occupational = this.selectComponent('#Occupational');
    /*********职位 */
  },
  onShow: function () {
    let { require_cert, school_type, work_age, salary,job_intention } = this.data;
    if (require_cert != '' || job_intention != '' || school_type != '' || work_age != '' || salary != '') {
      this.hiring()
    }
  },
  hiring: function () {
    var that = this
    let { require_cert, job_intention, school_type, work_age, salary} = this.data
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
    if (job_intention == '全部') {
      job_intention = '';
    }
    if (school_type == '全部') {
      school_type = '';
    }
    if (salary == '不限') {
      salary = ''
    }
    var _opt = {
      'careers': that.data.careers,
      'job_intention': job_intention,
      'school_type': school_type,
      'work_age': work_age,
      'salary': salary,
      'province': that.data.province,
      'city': that.data.city,
      'district': that.data.district,
      'require_cert': require_cert,
    }
    ServerData.hiring(_opt).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          hiringData: res.data.data
        })
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      }
      else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  /********************其他资料结束 */

  /***********地址开始**************** */
  tabEvent(data) {      //接收传过来的参数
    var info = data.detail
    this.setData({
      areaInfo: info.areaInfo,
      showTST: info.showTST,
      province: info.province,
      city: info.city,
      district: info.area,
    })
    this.hiring()             //主页信息
  },

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    this.addressForm.showPopup()
    this.addressForm.startAddressAnimation(true)
  },
  /* 地址结束 */
  /***********职位开始**************** */
  tabEvent1(data) {      //接收传过来的参数
    var info = data.detail
    this.setData({
      type: info.job_careers,
      title: info.job_intention,
      showTST1: info.isShow
    })
    this.hiring()
  },
  // 点击所在地区弹出选择框
  selectOccupational: function (e) {
    this.Occupational.showPopup()
    this.Occupational.startAddressAnimation(true)
  },
  /***********职位开始结束**************** */
  // 1 定时器id
  TimeId: -1,
  bindconfirm(e) {
    // 2 输入框的值
    const { value } = e.detail;
    // // 3 简单做一些验证 trim() 
    // if (!value.trim()) {
    this.setData({
      careers:value
    })
    //   // 不合法 
    //   return;
    // }
    // // 4 正常
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.hiring(value);
    }, 0);
  },
})