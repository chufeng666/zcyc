// pages/userInfo/goldDeposits.js
import ServerData from '../../../../utils/serverData.js';
Page({
  data: {
    saveMoney: '', // 充值金额
    balance: '',     // 用户余额
    recharge_id: '',
    openid: ''
  },
  changMoney: function (e) {
    var val = e.detail.value;
    this.setData({ saveMoney: val })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      balance: options.balance,
      openid: options.openid
    })
  },
  saveInfo(){
    this.toDeposits()
  },
  toDeposits() {   //充值
    var that = this
    var _opt = {
      'money': new Number(this.data.saveMoney),
      'pay_type': 1
    }
    ServerData.rechargePay(_opt).then((res) => {
      if (res.data.status == 5) {
        console.log(res.data.data);
        that.getPayUrl(res.data.data)
        that.setData({
          recharge_id: res.data.data
        })
      }
      else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      }
      else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  getPayUrl(id) {
    ServerData.payRecharge_pay({ 'recharge_id': id }).then((res) => {
      console.log(res)
      var info = res.data.data
      if (res.data.status == 1) {   //吊起外部链接
        wx.requestPayment({
          timeStamp: info.timeStamp,
          nonceStr: info.nonceStr,
          package: info.package,
          signType: info.signType,
          paySign: info.paySign,
          success(res) {
            console.log(res);
            if (res.errMsg == 'requestPayment:ok') {
              ServerData.payPay_callback({ 'recharge_id': id }).then((res) => {
                console.log(res);
                if (res.data.status == 1) {
                  ServerData._wxTost('支付成功')
                  wx.navigateBack({
                    delta: 2,
                  })
                } else {
                  ServerData._wxTost(res.data.msg)
                  wx.redirectTo({
                    url: '/pages/company/myPurse/goldDeposits/payment/payment'
                  })
                }
              })
            }
          },
          fail(res) {
            ServerData._wxTost('支付失败')
          }
        })
      }
      else if (res.data.status == 8) {      //未绑定微信支付，跳去绑定
        wx.redirectTo({
          url: '/pages/public/setting'
        })
      }
      else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      }
      else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
})
