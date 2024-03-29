const app = getApp();
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    audit_status:'' // 实名验证
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getStorageItem('savePostion', app)           //获取底部导航
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    this.getUserInfo();
    this.initUserInfo();
  },
  getUserInfo () {
    var that = this
    ServerData.userInfo({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({ info: res.data.data })
      }
      else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    });
  },
  //切换账号
  switchUser () {
    wx.showModal({
      content: '是否切换账号?',
      confirmText: '是',
      confirmColor: '#d93e23',
      cancelText: '否',
      cancelColor: '#666',
      success (res) {
        if (res.confirm) {
          wx.removeStorageSync('token')
          wx.removeStorageSync('savePostion')
          wx.reLaunch({
            url: '../../login/login'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 实名验证
  initUserInfo() {
    let regtype = wx.getStorageSync("savePostion")
    ServerData.initUserInfo({ regtype }).then((res) => {
      if (res.data.status == 1) {
        var info = res.data.data
        this.setData({
          audit_status: info.audit_status,
        })
      }
    })
  },
})