// pages/company/postionDetail.js
import ServerData from '../../utils/serverData.js';
const util = require('../../utils/util.js');  //通用方法
const app = getApp();
Page({

  /**
	 * 页面的初始数据
	 */
	data: {
    Id: '',
    isCollect: 0,
    pColor: '',                          //动态获取字体颜色
    pBgC: '',                            //动态获背景颜色                 
    pBC: ''                             //动态获边框颜色   
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// 接收id
		this.setData({
      id: options.id,
      pBgC: util.loginIdentity().pBgC,
      pColor: util.loginIdentity().pColor,
      pBC: util.loginIdentity().pBC
		});
    this.reqPersonal(); //请求数据
	},

	/**
	 * 个人简历详情数据
	 */
	reqPersonal: function () {
		// 要传给后台的参数
		var _opt = {
			id:this.data.id
		}
		ServerData.personalDetail(_opt).then((res) => {
			if (res.data.status == 1) {
				this.setData({
          personalData: res.data.data,
          isCollect: res.data.data.is_collection
				})
			} else  if (res.data.status == -1) {
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
    var statuss = e.currentTarget.dataset.stu
    if (e.currentTarget.dataset.stu == 0) {
      statuss = 1
    } else {
      statuss = 0
    }
    this.setData({
      isCollect: statuss
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
  callWithHim:function(){
    wx.makePhoneCall({
      phoneNumber: '18365478951' // 仅为示例，并非真实的电话号码
    })
  },

  // 预定
  toReservation:function(){
    var that =this
    var _opt = {
      id:this.data.id
    }
    ServerData.booking(_opt).then((res) => {
      if (res.data.status == 1) {
          wx.showToast({
            title: '预订成功',
            icon: 'success',
            duration: 2000
          })
      } else if(res.data.status == 5){
        wx.redirectTo({
          url: '../public/pay/payWay?id=' + that.data.id
        })
      }else{
          ServerData._wxTost(res.data.msg)
      }
    })
  },
   
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})