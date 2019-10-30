// pages/userInfo/search.js
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cStatus: 0,
    kw: '',
    rows: 200,
    page: 1,
    list: [],
    isShowInfo: false,
    pColor: '',                   //动态获字体颜色     
    pBgC: '',                     //动态获背景颜色                 
    pBC1: '',                     //动态获边框颜色  
    pCode: '',                    //获取选中的省ID
    cCode: '',                    //获取选中的市ID
    aCode: '',                    //获取选中的区ID
    site_show: false,             //是否选择人才
    showTST: true,                //是否选择地址
    hiddenhistory: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*********地址 */
    if (wx.hideHomeButton) wx.hideHomeButton()
    this.addressForm = this.selectComponent('#address');
    /*********地址 */
    this.setData({
      pColor: util.loginIdentity().pColor,
      pBC1: util.loginIdentity().pBC1,
      pBgC: util.loginIdentity().pBgC,
    })
  },

  searchInfp () {
    var that = this,
      _opt = {
        kw: that.data.kw,
        rows: that.data.rows,
        page: that.data.page
      }
    ServerData.searchInfp(_opt).then((res) => {
      if (res.data.status == 1) {
        var status = false
        if (res.data.data.recruit.length < 1 && res.data.data.person.length < 1) {
          status = true
        }

        that.setData({
          list: res.data.data,
          isShowInfo: status
        })
      }
      else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
      console.log(res)
    });
  },
  changStatus: function (e) {
    this.setData({
      cStatus: e.currentTarget.dataset.status
    })
  },
  selecKeyWord (e) {
    this.setData({
      kw: e.detail.value,
      hiddenhistory: false
    })
    this.searchInfp()
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