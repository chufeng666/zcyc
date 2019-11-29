const app = getApp();
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recList: [],
    //地址三级开始
    province: '',
    city: '',
    district: '',
    site_show: false,              //
    showTST: true,
    xingzhi: ['国企', '民营', '私企'],
    type: '', //公司性质
    row: 10,
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
    console.log(value);
    // // 3 简单做一些验证 trim() 
    // if (!value.trim()) {
    //   this.setData({
    //     goods: [],
    //     inputValue: "",
    //     isFocus: false
    //   })
    //   // 不合法 
    //   return;
    // }
    this.setData({
      isShowInfo: true
    })
    // // 4 正常
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.getCompanyList(value);
    }, 1000);
  },
  // 请求
  lookMore() {
    this.setData({
      page: this.data.page + 1
    })
    this.getCompanyList()
  },
  getCompanyList(value) {
    var that = this,
      { type } = that.data
    if (type === '请选择公司性质') {
      type = ''
    }
    let _opt = {
      'type': type,
      'company_name': value,
      'regtype': 1,
      'province': that.data.province,
      'city': that.data.city,
      'district': that.data.district
    }
    ServerData.companyList(_opt).then((res) => {
      if (res.data.status == 1) {
        if (res.data.data == '') {
          ServerData._wxTost('没有数据了');
          that.setData({
            recList: res.data.data
          })
        } else {
          that.setData({
            recList: res.data.data
          })
        }
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
      type: xingzhi[e.detail.value]
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
      showTST: info.showTST
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
      type: ''
    })
    this.getCompanyList();
  }
})