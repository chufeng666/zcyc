// pages/company/company.js
const app = getApp();
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';
Page({
  data: {
    recList: [],
    //地址三级开始
    province: '',
    city: '',
    district: '',
    site_show: true,
    page: 1,
    isMore: true,
    showTST: true,
    xingzhi: ['国企', '民营', '私企'],
    type: '', //公司性质
    noData:false
  },
  setXingzhi(e) {
    let { xingzhi } = this.data;
    this.setData({
      recList: [],
      page: 1,
      type: xingzhi[e.detail.value]
    })
    this.getCompanyList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getStorageItem('savePostion', app);   //获取底部导航
    this.getCompanyList()                      //公司及第三方职位列表
    if (wx.hideHomeButton) wx.hideHomeButton();
    /*********地址 */
    this.addressForm = this.selectComponent('#address');
    /*********地址 */
  },
  /***********地址开始**************** */
  tabEvent(data) {      //接收传过来的参数
    var info = data.detail
    this.setData({
      showTST: info.showTST,
      province: info.province,
      city: info.city,
      district: info.area,
      recList: [],
      page: 1,
    })
    this.getCompanyList()             //主页信息
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
    // // 4 正常
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.getCompanyList(value);
    }, 0);
  },
  getCompanyList(value) {
    var that = this;
    if (this.data.page == 1) {
      ServerData._showLoading('加载中')
    }
    let _opt = {
      "type": that.data.type,
      "company_name": value,
      'regtype': 2,
      'province': that.data.province,
      'city': that.data.city,
      'district': that.data.district,
      'page': that.data.page
    }
    ServerData.companyList(_opt).then((res) => {
      if (res.data.status == 1) {
        if (res.data.data.length == "") {
          that.setData({
            noData:true
          })
        }
        this.setData({
          recList: [...that.data.recList, ...res.data.data],
        })
      } else if (status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  bindcancel() {
    this.setData({
      recList: [],
      page: 1,
      type: ''
    })
    this.getCompanyList();
  },
  onReachBottom: function () {
    let { noData } = this.data;
    if (noData) {
      return ServerData._wxTost('暂无更多数据')
    }
    this.setData({
      page: this.data.page + 1,
    })
    this.getCompanyList();
  },
})