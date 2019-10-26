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
    pCode: '',                    //获取选中的省ID
    cCode: '',                    //获取选中的市ID
    aCode: '',                    //获取选中的区ID
    site_show: true,              //
    showTST: true
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
  // 请求
  lookMore () {
    this.setData({
      page: this.data.page + 1
    })
    this.getCompanyList()
  },
  getCompanyList () {
    var that = this,
      _opt = {
        'regtype': 2,
        'province': that.data.pCode,
        'city': that.data.cCode,
        'district': that.data.aCode,
        'page': that.data.page,
        'rows': that.data.rows
      }
    ServerData.companyList(_opt).then((res) => {
      var status = res.data.status,
        newArray = []
      if (status == 1) {
        if (res.data.data.length != "") {
          if (that.data.page == 1) {
            newArray = res.data.data
          } else {
            newArray = [...that.data.recList, ...res.data.data]
          }
          var tt = res.data.data.length >= that.data.rows ? true : false
          this.setData({
            recList: newArray,
            isMore: tt
          })
        } else {
          this.setData({
            isMore: false
          })
          // ServerData._wxTost('没有数据了')
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


  /***********地址开始**************** */
  tabEvent (data) {      //接收传过来的参数
    var info = data.detail
    this.setData({
      areaInfo: info.areaInfo,
      pCode: info.pCode,
      cCode: info.cCode,
      aCode: info.aCode,
      showTST: info.showTST
    })
    this.reqIndex()
  },

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    this.addressForm.showPopup()
    this.addressForm.startAddressAnimation(true)
  },
  /***********地址结束**************** */
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})