import ServerData from '../../../utils/serverData.js';
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      }
      ServerData._wxTost(res.data.msg)
    })

  },
  detil() {
    wx.navigateBack({
      delta: 1,
    });
  }

})