const app = getApp();
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recList: [],
    noData: false,
    //地址三级开始
    province: '',
    city: '',
    district: '',
    site_show: false,              //
    showTST: true,
    xingzhi: ['国企', '民营', '私企'],
    type: '', //公司性质
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getStorageItem('savePostion', app);   //获取底部导航
    this.getCompanyList()                      //公司及第三方职位列表

    /*********地址 */
    if (wx.hideHomeButton) wx.hideHomeButton()
    this.addressForm = this.selectComponent('#address');
    /*********地址 */
  },
  // 1 定时器id
  TimeId: -1,
  handeSearchInput(e) {
    // 2 输入框的值
    const { value } = e.detail;
    this.setData({
      isShowInfo: true,
      recList: [],
      page: 1,
      company_name: value
    })
    // // 4 正常
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.getCompanyList();
    }, 0);
  },
  // 请求
  lookMore() {
    this.setData({
      page: this.data.page + 1
    })
    this.getCompanyList()
  },
  getCompanyList() {
    var that = this;
    if (this.data.page == 1) {
      ServerData._showLoading('加载中')
    }
    let _opt = {
      'type': that.data.type,
      'company_name': that.data.company_name,
      'regtype': 2,
      'province': that.data.province,
      'city': that.data.city,
      'district': that.data.district,
      'page': that.data.page
    }
    ServerData.companyList(_opt).then((res) => {
      if (res.data.status == 1) {
        if (res.data.data == '') {
          that.setData({
            noData: true,
          })
        }
        this.setData({
          recList: [...that.data.recList, ...res.data.data],
        })
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  setXingzhi(e) {
    let { xingzhi } = this.data;
    this.setData({
      recList: [],
      type: xingzhi[e.detail.value],
      page: 1,
    })
    this.getCompanyList()
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
      recList: [],
      page: 1,
    })
    this.getCompanyList()
  },

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    this.addressForm.showPopup()
    this.addressForm.startAddressAnimation(true)
  },
  /***********地址结束**************** */
  bindcancel() {
    this.setData({
      type: '',
      recList: [],
      page: 1,
    })
    this.getCompanyList();
  },
  onReachBottom: function () {
    let { noData } = this.data
    if (noData) {
      return ServerData._wxTost('暂无更多数据')
    }
    this.setData({
      page: this.data.page + 1,
    })
    this.getCompanyList();
  },
  // lookMore() {

  // },
})