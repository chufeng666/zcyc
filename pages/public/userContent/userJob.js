import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 工种
    jobArray: [],
    // 工种城市
    addressBoxShow: true,
    // 岗位
    gangwei: '安全员',
    // 薪资
    xinzi: ['不限', '3k以下', '3 - 5k', '5 - 10k', '10 - 20k', '20 - 50k', '50k以上'],
    workJob: ['离职-随时到岗', '在职-月内到岗', '在职-考虑机会', '在职-暂不考虑',],
    // 上传数据
    careers: '',    // 期望岗位职业
    city: '',    // 市
    district: '',    // 区
    job_type: 0, // 工作类型
    job_intention: '', // 工种名称
    province: '',   // 省
    salary: '',    // 期望薪资
    daogang_time: '' // 工作状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取工种
    this.getCategoryList();
    this.initUserInfo7();
    /*********地址 */
    this.addressForm = this.selectComponent('#address');
    /*********地址 */
  },
  // 请求
  initUserInfo7() {
    let that = this;
    ServerData.initUserInfo7({}).then((res) => {
      console.log(res);
      if (res.data.status == 1) {
        that.setData({
          careers: res.data.data.careers,
          city: res.data.data.city,
          district: res.data.data.district,
          job_type: res.data.data.job_type,
          job_intention: res.data.data.job_intention,
          province: res.data.data.province,
          salary: res.data.data.salary,
        })
      }
    })
  },

  // 上传
  initUserInfoSeven() {
    let {daogang_time, careers, city, district, job_type, job_intention, province, salary } = this.data
    ServerData.initUserInfoSeven({daogang_time, careers, city, district, job_type, job_intention, province, salary }).then((res) => {
      if (res.data.status == 1) {
        if (res.data.status == 1) {
          ServerData._wxTost(res.data.msg);
          setTimeout(function () {
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          }, 1500)
        } else if (res.data.status == -1) {
          ServerData._wxTost('请随机修改一个信息');
        } else {
          ServerData._wxTost(res.data.msg);
        }
      }
    })
  },
  // 请求工种
  getCategoryList() {
    var that = this
    ServerData.categoryList({}).then((res) => {
      if (res.data.status == 1) {
        this.setData({ jobArray: res.data.data })
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
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
      addressBoxShow: info.isShow,
      province: info.province,
      city: info.city + '-',
      district: info.area,
    })
    // this.hiring()             //主页信息
  },
  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    this.addressForm.showPopup()
    this.addressForm.startAddressAnimation(true)
    this.setData({
      addressBoxShow: false
    })
  },
  /***********地址结束**************** */

  // 薪资
  setiXinzi(e) {
    let index = e.detail.value
    let { xinzi } = this.data
    this.setData({
      salary: xinzi[index]
    })
  },
  // 类型
  jobChange(e) {
    let value = e.detail.value
    let { jobArray } = this.data
    this.setData({
      job_intention: jobArray[value].cat_name,
      job_type: value
    })
  },
  // 期望职位
  inputGangwei(e) {
    let careers = e.detail.value;
    this.setData({
      careers
    })
  },
  setiworkJob(e) {
    let { workJob } = this.data;
    this.setData({
      daogang_time: workJob[e.detail.value]
    })
  }
})