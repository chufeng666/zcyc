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
    showTST: true,                 //是否选择地址
    page: 1,
    rows: 10,
    isMore: true,
    pColor: '',                            //动态获z字体颜色 
    pBgC: '',                            //动态获背景颜色     
    xingzhi: ['国企', '民营', '私企'],
    type: '请选择公司性质', //公司性质            
  },
  setXingzhi(e) {
    let { xingzhi } = this.data;
    this.setData({
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
    /*********地址 */
    if (wx.hideHomeButton) wx.hideHomeButton()
    this.addressForm = this.selectComponent('#address');
    /*********地址 */
    this.setData({
      pColor: util.loginIdentity().pColor,
      pBgC: util.loginIdentity().pBgC
    })

  },


  /***********地址开始**************** */
  tabEvent(data) {      //接收传过来的参数
    var info = data.detail
    this.setData({
      areaInfo: info.areaInfo,
      showTST: info.showTST
    })
    this.getCompanyList()
    // this.hiring()             //主页信息
  },

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    this.addressForm.showPopup()
    this.addressForm.startAddressAnimation(true)
  },

  /***********地址结束**************** */
  // 1 定时器id
  TimeId: -1,
  handeSearchInput(e) {
    // 2 输入框的值
    const { value } = e.detail;
    // 3 简单做一些验证 trim() 
    if (!value.trim()) {
      this.setData({
        recList: [],
      })
      // 不合法 
      return;
    }
    // // 4 正常
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.getCompanyList(value);
    }, 1000);
  },

  // lookMore() {
  //   this.setData({
  //     page: this.data.page + 1
  //   })
  //   this.getCompanyList()
  // },
  getCompanyList(value) {
    var that = this,
      { type } = that.data
    if (type === '请选择公司性质') {
      type = ''
    }
    let _opt = {
      "type": type,
      "company_name": value,
      'regtype': 1,
      'province': that.data.province,
      'city': that.data.city,
      'district': that.data.district,
      'page': that.data.page,
      'rows': that.data.rows
    }
    ServerData.companyList(_opt).then((res) => {
      var status = res.data.status,
        newArray = []
      if (status == 1) {
        if (res.data.data.length > 0) {
          if (that.data.page == 1) {
            newArray = res.data.data
          } else {
            newArray = [...that.data.recList, ...res.data.data]
          }
          this.setData({
            recList: newArray,
            isMore: true
          })
        } else {
          this.setData({
            isMore: false,
          })
          ServerData._wxTost('没有数据了')
        }

        if (that.data.page == 1 && res.data.data == "") {
          this.setData({
            recList: [],
          })
        }
      } else if (status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  onShareAppMessage: function () {
    return
  }
})