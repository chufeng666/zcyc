import ServerData from '../../utils/serverData.js';
const util = require('../../utils/util.js');  //通用方法

Page({
  /**
   * 页面的初始数据
   */
  data: {
    codeIsCanClick: true,                //是否点击倒计时
    mobile: '',
    mcode: '',
    pColor: '',                          //动态获取字体颜色
    pBgC: '',                            //动态获背景颜色                 
    brc1: '',                            //动态获边框颜色   
    getmobile: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      pBgC: util.loginIdentity().pBgC,
      pColor: util.loginIdentity().pColor,
      pBC1: util.loginIdentity().pBC1,
      brc1: util.loginIdentity().brc1,
      getmobile: options.mobile
    })
  },

  saveInfo: function () {
    var that = this,
      mobile = that.data.mobile,
      code = that.data.mcode
    if (!ServerData._zzVerifyMobile(mobile) || mobile == "") {
      return ServerData._wxTost('请正确输入手机号')
    }
    if (code == "" || code.length != 6 || isNaN(code)) {
      return ServerData._wxTost('请正确输入验证码')
    }
    var _opt = {
      'mobile': mobile,
      'code': code
    }
    ServerData.editMobile(_opt).then((res) => {
      if (res.data.status == 1) {
        wx.navigateTo({
          url: '../public/setting'
        })
      } else if (res.data.status == -1) {
        wx.navigateTo({
          url: '../login/login'
        })
      }
      ServerData._wxTost(res.data.msg)
    });

    // wx.navigateTo({
    //   url: '../public/setting'
    // })
  },

  getVale: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  getVale2: function (e) {
    this.setData({
      mcode: e.detail.value
    })
  },
  clickCode: function () {     //发送验证码
    var that = this,
      mobile = that.data.mobile
    if (!ServerData._zzVerifyMobile(mobile) || mobile == "") {
      return ServerData._wxTost('请正确输入手机号!')
    }
    var _opt = { 'mobile': mobile }
    ServerData.fsCode(_opt).then((res) => {
      if (res.data.status == 1) {
        settime(that)
      }
      ServerData._wxTost(res.data.msg)
    });
  },

  deletetext: function (e) {
    this.setData({
      inputValue: '',
      status: false
    })
  },
  /**
* 点击验证码按钮
*/
  detil() {
    wx.navigateBack({
      delta: 1,
    });
  },
})
// 倒计时事件 单位s
var countdown = 60;
var settime = function (that) {
  if (countdown == 0) {
    that.setData({
      codeIsCanClick: true
    })
    countdown = 60;
    return;
  } else {
    that.setData({
      codeIsCanClick: false,
      last_time: countdown
    })
    countdown--;
  }
  setTimeout(function () {
    settime(that)
  }, 1000)
}