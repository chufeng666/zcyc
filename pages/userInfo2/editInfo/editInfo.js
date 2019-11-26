import ServerData from '../../../utils/serverData.js';
const util = require('../../../utils/util.js');  //通用方法
const payArray = [];
for (let i = 1; i <= 20; i++) {
  // i=i+1000-1;
  payArray.push(i);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getUData: [],
    bgc: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let regtype = wx.getStorageSync('savePostion')
    if (regtype == 1 || regtype == 2) {
      this.setData({
        isShow: false,
        bgc: util.loginIdentity().pBC,
        companyShow: false
      })
    } else {
      this.setData({
        bgc: util.loginIdentity().pBgC,
        companyShow: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initUserInfo();
  },
  initUserInfo() {
    ServerData.initUserInfo({}).then((res) => {
      console.log(res);
      if (res.data.status == 1) {
        var info = res.data.data
        this.setData({
          getUData: info,
        })
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      }
      else if (res.data.status == -3) {
        ServerData._wxTost(res.data.msg)
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 1500)
      }
      else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  shenhe() {
    ServerData.shenhe({}).then((res) => {
      if (res.data.status == 1) {
        wx.navigateBack({
          url: '../userCenter/userCenter'
        })
      } else if (res.data.status == -1) {
        ServerData._wxTost('审核失败，请重新填写资料')
      }else {
        ServerData._wxTost(res.data.msg)
      }
    })

  },
  detil() {
    wx.navigateBack({
      delta: 1,
    });
  }

})