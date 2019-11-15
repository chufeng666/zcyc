// pages/company/postionDetail.js
import ServerData from '../../utils/serverData.js';
const util = require('../../utils/util.js');  //通用方法
const app = getApp();
Page({

  /**
	 * 页面的初始数据
	 */
  data: {
    id: '',
    isCollect: 0,
    personalData: {},
    experience: [],
    balance: '', // 预定用户的余额
    money: '',
    reserve:{}
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    // 接收id
    this.setData({
      id: options.id
    });
    this.reqPersonal(); //请求数据
  },
  onUnload:function () {
    // let regtype = wx.getStorageSync('savePostion')
    // console.log(regtype);
    // if(regtype == 1 ) {
    //   wx.reLaunch({
    //     url: '/pages/company/index/index'
    //   })
    // } else {
    //   wx.reLaunch({
    //     url: '/pages/thirdParty/index/index'
    //   })
    // }
    
  },
	/**
	 * 个人简历详情数据
	 */
  reqPersonal: function () {
    // 要传给后台的参数
    var _opt = {
      id: this.data.id
      // id: 57
    }
    ServerData.personalDetail(_opt).then((res) => {
      if (res.data.status == 1) {
        this.setData({
          personalData: res.data.data,
          isCollect: res.data.data.is_collection,
          experience: res.data.data.experience,
          reserve: res.data.reserve,
        })
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },

	/**
	 * 收藏/取消收藏
	 */
  onCollection: function (e) {
    // 要传给后台的参数
    var _opt = {
      'type': 2,
      'to_id': this.data.id
    }
    ServerData.collection(_opt).then((res) => {
      if (res.data.status == 1) {
        // 轻提示调用
        ServerData._wxTost(res.data.msg)
      } else {
        ServerData._wxTost(res.data.msg)
      }
    });

  },


  // 拨打电话
  callWithHim: function () {
    wx.makePhoneCall({
      phoneNumber: '18365478951' // 仅为示例，并非真实的电话号码
    })
  },
  yuDing() {
    let that = this,
      images, id
    let { personalData } = that.data
    images = JSON.stringify(personalData.images)
    id = personalData.id
    ServerData.setPersonYuding({ id }).then((res) => {
      console.log(res);
      if (res.data.status == 1) {
        that.setData({
          balance: res.data.data.balance,
          money: res.data.data.money
        })
      }
    })
    wx.showModal({
      title: '提示',
      content: '是否预定人才',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../company/Scheduled/Scheduled?name=' + personalData.name + "&images=" + images + "&money=" + that.data.money + "&balance=" + that.data.balance + '&id=' + id,
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  // 预定
  toReservation: function () {
    var that = this
    var _opt = {
      id: this.data.id
    }
    ServerData.booking(_opt).then((res) => {
      if (res.data.status == 1) {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          duration: 2000
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 1500)
      } else if (res.data.status == 5) {
        var id = res.data.data
        wx.showModal({
          title: '提示',
          confirmText: '购买vip',
          cancelText: '预订人才',
          content: '您当前还不是vip用户或者vip预订次数用完,是否去购买vip？',
          success(res) {
            // console.log(res)
            if (res.confirm) {
              // console.log('用户点击确定')
              wx.redirectTo({
                url: '../myPurse/cyPurse'
              })

            } else if (res.cancel) {
              // console.log('用户点击取消')
              wx.redirectTo({
                url: '../public/pay/payWay?pType=2&money=' + that.data.personalData.reserve_money + '&id=' + id
              })

            }
          }
        })



      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
})