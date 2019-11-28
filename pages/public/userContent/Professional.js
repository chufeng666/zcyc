import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    showAddBtn: 1,
    index: 0,
    disabled: false // 点击一次的开关
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initUserInfo7()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    this.setData({
      disabled: false
    })
  },
  initUserInfo7() {
    let that = this;
    ServerData.initUserInfo7({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          images: res.data.data.images,
        })
      }
    })
  },
  detil() {
    wx.navigateBack({
      delta: 1,
    });
  }
})