import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: '',      // 人才金額
    images: [], // 人才职业证书
    name: '',   // 预定人才姓名
    balance: '',   // 用户预定的余额
    id: '',  // 人才id
    status: 1, // 支付成功与否的状态
    msg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let images = JSON.parse(options.images)
    this.setData({
      images: images,
      name: options.name,
      money: options.money,
      balance: options.balance,
      id: options.id,
    })
  },
  setPersonZhifu() {
    let that = this
    let { id, money} = this.data
    ServerData.setPersonZhifu({ id, money }).then((res) => {
      console.log(res);
      if (res.data.status == 1) {
        that.setData({
          status: res.data.status,
          msg: res.data.msg
        })
      } else {
        that.setData({
          status: res.data.status,
          msg: res.data.msg
        })
      }
    })

    wx.showModal({
      title: '提示',
      content: `确定支付`,
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../myPurse/payment/payment?id=' + id + '&status=' + that.data.status + '&msg=' + that.data.msg + '&money=' + money,
          })
          ServerData._wxTost(that.data.msg)
        } else if (res.cancel) {

        }
      }
    })
  },
  delta() {
    wx.navigateBack({
      url: "../../../companyPostionDetail/companyPostionDetail?id={{id}}"
    });//返回上一页面
  }
})