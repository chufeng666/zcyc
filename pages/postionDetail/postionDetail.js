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
    recruitDetail: [], // 公司详情
    isCollect: 0,
    pColor: '',                          //动态获取字体颜色   
    pBgC: '',                     //动态获背景颜色               
    pBC: '',                           //动态获边框颜色   
    isShow: true,
    bgc: '',
    resume_status: '',
    companyShow: false, // 隐藏推荐按钮
    regtype: 0,
    
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    let regtype = wx.getStorageSync('savePostion')
     // 更改图标
     if (regtype == 1 || regtype == 2) {
      regtype = 1
    }else {
      regtype = 3
    }
    // 接收id
    this.setData({
      id: options.id,
      regtype
    });
    this.reqDetails();
    if (regtype == 1 || regtype == 2) {
      this.setData({
        isShow: false,
        bgc: util.loginIdentity().pBC,
        pColor: util.loginIdentity().pColor,
        companyShow:false
      })
    } else {
      this.setData({
        bgc: util.loginIdentity().pBgC,
        pColor: util.loginIdentity().pColor,
        companyShow:true
      })
    }
  },
  onShow: function (params) {

    // if (regtype == 1 || regtype == 2) {
    //   this.setData({
    //     isShow: false,
    //     bgc: 'var(--thirdPartyColor)'
    //   })
    // }
  },
	/**
	 * 公司职位详情数据
	 */
  reqDetails: function () {
    // 要传给后台的参数
    // this.data.id职位id
    var _opt = {
      id: this.data.id
    }
    ServerData.recruitDetail(_opt).then((res) => {
      if (res.data.status == 1) {
        this.setData({
          recruitDetail: res.data.data,
          isCollect: res.data.data.is_collection,
          resume_status: res.data.resume_status
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
      'type': 1,
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

  // 拨打号码
  callWithHim: function () {
    wx.makePhoneCall({
      phoneNumber: '18365478951' // 仅为示例，并非真实的电话号码
    })
  },

  // 推送簡歷
  tuisong() {
    let { company_id } = this.data.recruitDetail
    ServerData.companyPush_resume({ company_id }).then((res) => {
      if (res.data.status == 1) {
        ServerData._wxTost(res.data.msg)
        this.reqDetails()
      }
      ServerData._wxTost(res.data.msg)
    })
  }
})