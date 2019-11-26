// pages/userInfo/myInfo.js
const app = getApp();
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiringData: [],
    jobArray: [],                 //职位列表
    row: 10,                     //默认拿一百条
    page: 1,                        //默认第一页
    //地址三级开始
    province: '',
    city: '',
    district: '',
    job_intention: '请选择职位',
    showTST: true,
    // 更多返回的数据
    require_cert: '', //证书
    type: '',        //工种
    education: '',  // 学历
    work_age: '',   // 工龄
    salary: '',     // 薪资
    // 传递到更多里面的参数
    name: '招人'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getStorageItem('savePostion', app)
    this.hiring()
    this.getCategoryList()         //职位列表
    /*********地址 */
    if (wx.hideHomeButton) wx.hideHomeButton()
    this.addressForm = this.selectComponent('#address');
    /*********地址 */
    this.setData({
      pColor: util.loginIdentity().pColor,
      pBgC: util.loginIdentity().pBgC,
    })
  },
  onShow: function () {
    let { require_cert, type, education, work_age, salary } = this.data;
    if (require_cert != '' || type != '' || education != '' || work_age != '' || salary != '') {
      this.hiring()
    }
  },
  // 1 定时器id
  TimeId: -1,
  handeSearchInput(e) {
    // 2 输入框的值
    const { value } = e.detail;
    // 3 简单做一些验证 trim() 
    // if (!value.trim()) {
    //   this.setData({
    //     hiringData: [],
    //   })
    //   // 不合法 
    //   return;
    // }
    // // 4 正常
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.hiring(value);
    }, 0);
  },
  setJobsearch(e) {
    let { jobArray } = this.data
    this.setData({
      job_intention: jobArray[e.detail.value]
    })
    this.hiring()
  },
  hiring: function (value) {
    let { province, city, district, require_cert, type, education, work_age, salary } = this.data
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
    let { job_intention } = this.data
    if (job_intention === '请选择职位') {
      job_intention = ''
    }
    let _opt = {
      'title': value,
      'province': province,
      'city': city,
      'district': district,
      'regtype': 2,
      'require_cert': require_cert,
      'type': type,
      'education': education,
      'work_age': work_age,
      'salary': salary,
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
  getCategoryList() {
    ServerData.categoryList({}).then((res) => {
      if (res.data.status == 1) {
        var newArry = []
        for (let i in res.data.data) {
          newArry.push(res.data.data[i].cat_name)
        }
        this.setData({ jobArray: newArry })
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  jobChange: function (e) {
    var t = e.detail.value == 0 ? false : true
    this.setData({
      jobIndex: e.detail.value,
      job_type: this.data.jobArray[e.detail.value].cat_id,
      site_show: t
    })
    this.hiring()             //主页信息
  },
  /********************其他资料结束 */
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
    this.hiring()
  },

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    this.addressForm.showPopup()
    this.addressForm.startAddressAnimation(true)
  },
  /***********地址结束**************** */
})