// pages/userInfo/myInfo.js
const app = getApp();
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';
// import commonData from '../../../utils/serverData.js';
Page({
  data: {
    hiringData: [],
    noData: false,
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
  },
  onShow: function () {
    let { require_cert, school_type, work_age, salary, job_intention } = this.data;
    if (require_cert != '' || job_intention != '' || school_type != '' || work_age != '' || salary != '') {
      this.hiring()
    }
  },
  hiring: function () {
    var that = this;
    let { require_cert, job_intention, school_type, work_age, salary } = this.data;
    if (this.data.page == 1) {
      ServerData._showLoading('加载中')
    }
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
      'page': that.data.page,
    }
    ServerData.hiring(_opt).then((res) => {
      if (res.data.status == 1) {
        if (res.data.data == '') {
          that.setData({
            noData: true
          })
        }
        that.setData({
          hiringData: [...that.data.hiringData, ...res.data.data]
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
      hiringData: [],
      page: 1
    })
    this.hiring()             //主页信息
  },
  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    this.addressForm.showPopup()
    this.addressForm.startAddressAnimation(true)
  },
  /* 地址结束 */
  // 1 定时器id
  TimeId: -1,
  bindconfirm(e) {
    // 2 输入框的值
    const { value } = e.detail;
    this.setData({
      hiringData: [],
      page: 1,
      careers: value
    })
    // // 4 正常
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.hiring(value);
    }, 0);
  },
  onReachBottom: function () {
    let { noData } = this.data
    if (noData) {
      ServerData._wxTost('暂无更多数据')
    }
    this.setData({
      page: this.data.page + 1,
    })
    this.hiring();
  },
  bindtapMore() {
    setTimeout(() => {
      this.setData({
        hiringData: [],
        page: 1
      })
    }, 1000);
  },
  // lookMore() {
    
  // },
})