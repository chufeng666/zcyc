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
    type: '',        //工种
    education: '',  // 学历
    work_age: '',   // 工龄
    salary: '',     // 薪资           
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
  },
  onShow: function () {
    let { require_cert, type, education, work_age, salary } = this.data;
    if (require_cert != '' || type != '' || education != '' || work_age != '' || salary != '') {
      this.hiring()
    }
  },
  hiring: function (value) {
    var that = this
    let { require_cert, type, education, work_age, salary, province, city, district } = this.data
    if (require_cert == '有证书') {
      require_cert = 1
    } else if(require_cert == '无证书'){
      require_cert = 0
    } else {
      require_cert = ''
    }
    if (type && education && work_age === '全部' || salary === '不限') {
      type = '';
      education = '';
      work_age = '';
      salary = ''
    }
    var _opt = {
      'name': value,
      'type': type,
      'education': education,
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
  // 1 定时器id
  TimeId: -1,
  bindconfirm(e) {
    // 2 输入框的值
    const { value } = e.detail;
    // 3 简单做一些验证 trim() 
    if (!value.trim()) {
      this.setData({
        hiringData: [],
      })
      // 不合法 
      return;
    }
    // // 4 正常
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.hiring(value);
    }, 1000);
  },
})