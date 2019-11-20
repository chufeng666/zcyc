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
    reserve: {},
    user_id: 0
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
  onUnload: function () {
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
          user_id: res.data.user_id,
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
    let status = e.currentTarget.dataset.stu;
    if (status == 0) {
      status = 1
    } else {
      status = 0
    }
    this.setData({
      isCollect: status
    })
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
})