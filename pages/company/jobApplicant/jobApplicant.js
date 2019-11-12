// pages/userInfo/myInfo.js
const app = getApp();
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';
// import commonData from '../../../utils/serverData.js';
Page({
  data: {
    hiringData: [],
    job_type: '',                 //选中的职位值
    jobArray: [],                 //职位列表
    jobIndex: 0,                  //职位下标
    row: 300,                     //默认拿一百条
    page: 1,                        //默认第一页

    //地址三级开始
    province: '',
    city: '',
    district: '',
    pCode: '',                    //获取选中的省ID
    cCode: '',                    //获取选中的市ID
    aCode: '',                    //获取选中的区ID
    site_show: false,
    showTST: true,
    job_intention: '请选择职位', //职位
    //
    pColor: '',                            //动态获z字体颜色 
    pBgC: '',                            //动态获背景颜色                 
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
    this.getCategoryList()         //职位列表
    if (wx.hideHomeButton) wx.hideHomeButton();
    /*********地址 */
    this.addressForm = this.selectComponent('#address');
    /*********地址 */
    this.setData({
      pColor: util.loginIdentity().pColor,
      pBgC: util.loginIdentity().pBgC,
    })
  },
  hiring: function (value) {
    var that = this,
      { job_intention } = that.data
    if (job_intention === '请选择职位') {
      job_intention = ''
    }
    var _opt = {
      'job_intention': job_intention,
      'name': value,
      'rows': that.data.row,
      'page': that.data.page,
      'type': that.data.job_type,
      'province': that.data.province,
      'city': that.data.city,
      'district': that.data.district,

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
    var that = this
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
    this.data.page = 1
    this.hiring()             //主页信息
  },

  /********************其他资料结束 */

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
  handeSearchInput(e) {
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