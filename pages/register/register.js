import ServerData from '../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeIsCanClick: true,
    mobile: '',
    mCode: '',
    password: '',
    comPasd: '',
    color: '#ccc',
    show: false,                //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: [
      { name: '个人', id: 0, isShow: true },
      { name: '企业', id: 1, isShow: false },
      { name: '服务商', id: 2, isShow: false }
    ],                          //下拉列表的数据
    index: 0,                   //选择的下拉列表下标
    toke: '',                //微信登陆后台返回的toke
    register: '',
    status: false,
    status1: false,
    status2: false,
    status3: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      toke: options.toke == undefined ? "" : options.toke,
      register: options.register == undefined ? "" : options.register,
    })

  },
  clickCode: function () {     //发送验证码
    var that = this,
      mobile = that.data.mobile,
      reg = /^1[3456789]\d{9}$/
    if (!reg.test(mobile) || mobile == "") {
      return ServerData._wxTost('请正确输入手机号!')
    }
    var _opt = { 'mobile': mobile }
    ServerData.verifyCode(_opt).then((res) => {
      console.log(res);
      // settime(that)
      if (res.data.status == 1) {
        settime(that)
      } else {
        ServerData._wxTost(res.data.msg)
      }
    });
  },
  saveRegister() {        //注册账号
    var that = this,
      type = 0;
    if (!that.verifyUserInfo()) { return }
    that.data.index == 0 ? type = 3 : type = that.data.index
    var _opt = {
      'type': type,
      'mobile': that.data.mobile,
      'code': that.data.mCode,
      'pwd': that.data.password,
      'pwd2': that.data.comPasd,
      'register': that.data.register,
      'token': that.data.toke
    }
    console.log(type);
    ServerData._register(_opt).then((res) => {       //保存注册信息
      console.log(res);
      wx.removeStorageSync('token')
      wx.removeStorageSync('savePostion')
      if (res.data.status == 1) {
        wx.setStorageSync('token', res.data.data.token);
        wx.setStorageSync('savePostion', type);
        if (type == 3) {                               //跳转 3 跳转到个人信息录入 ，不是3就跳转到企业信息录入
          wx.redirectTo({
            url: '../userInfo2/index/index'
          })
        } else if (type == 1) {
          wx.redirectTo({
            url: '../company/index/index'
          })
        } else { 
          wx.redirectTo({
            url: '../thirdParty/index/index'
          })
        }
      }
      else if (res.data.status == -1) {             //注册过/token 过期
        ServerData._wxTost(res.data.msg)
        setTimeout(() => {
          wx.redirectTo({
            url: '../login/login'
          })
        }, 1000)
      }
      else {
        ServerData._wxTost(res.data.msg)
      }
    });
  },
  verifyUserInfo() {             //验证输入信息
    var mobile = this.data.mobile
    var mCode = this.data.mCode
    var password = this.data.password
    var comPasd = this.data.comPasd
    var reg = /^1[3456789]\d{9}$/
    if (!reg.test(mobile) || mobile == "") {
      ServerData._wxTost('请正确输入手机号!')
      return false
    }
    if (isNaN(mCode) || mCode == "" || mCode.length != 6) {
      ServerData._wxTost('请正确输入验证码')
      return false
    }
    if (password == "") {
      ServerData._wxTost('请输入密码')
      return false
    }
    if (comPasd == "") {
      ServerData._wxTost('请输确认密码')
      return false
    }
    if (comPasd != password) {
      ServerData._wxTost('两次密码不相符')
      return false
    }
    return true
  },

  getVale: function (e) {
    this.data.mobile = ''
    if (e.detail.value != '') {
      this.setData({
        status: true,
        mobile: e.detail.value
      })
    } else {
      this.setData({
        status: false
      })

    }
    if (e.detail.value != '' && this.data.mCode != '') {
      this.setData({
        color: '#ee291a'
      })
    }
    if (e.detail.value == '' || this.data.mobile == '') {
      this.setData({
        color: '#ee291a'
      })
    }

  },
  getVale2: function (e) {
    this.data.mCode = ''
    if (e.detail.value != '') {
      this.setData({
        mCode: e.detail.value,
        status1: true,
      })
    }else {
      this.setData({
        status1: false
      })
    }
    if (this.data.mobile != '' && e.detail.value != '') {
      this.setData({
        color: '#ee291a'
      })
    }
    if (e.detail.value == '' || this.data.mobile == '') {
      this.setData({
        color: '#ccc'
      })
    }

  },
  getPassword(e) {
    if (e.detail.value != '') {
      this.setData({
        password: e.detail.value,
        status2: true,
      })
    }else {
      this.setData({
        status2: false
      })
    }
   
  },

  comfirnPasd(e) {
    if (e.detail.value != '') {
      this.setData({
        comPasd: e.detail.value,
        status3: true,
      })
    }else {
      this.setData({
        status3: false
      })
    }
    
  },
  deletetext: function (e) {
    this.setData({
      inputValue: '',
      status: false
    })
  },

  // 点击选择身份
  selectData(e) {
    const { index } = e.currentTarget.dataset;
    let { selectData } = this.data;
    selectData.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ selectData, index });
  },
  personal: function (e) {
    var index = this.data.index;
    var id = this.data.selectData[index].id
    if (id == 0) {
      wx.navigateTo({
        url: '../personalMessage/personalMessage'
      })
    } else {
      wx.navigateTo({
        url: 'fillInInformation/fillInInformation'
      })
    }
  },
  onShareAppMessage: function () {
    return
  }
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