import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    desc: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initUserInfo8()
  },
  initUserInfo8() {
    let that = this
    ServerData.initUserInfo8({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({ desc: res.data.data.desc })
      }
    })
  },
  initUserInfoEight() {
    let that = this
    let { desc } = that.data
    ServerData.initUserInfoEight({ desc }).then((res) => {
      if (res.data.status == 1) {
        ServerData._wxTost(res.data.msg);
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      } else if (res.data.status == -1) {
        wx.showModal({
          title: '提示',
          content: '是否不修改信息',
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            } else if (res.cancel) {
            }
          }
        })
      } else {
        ServerData._wxTost(res.data.msg);
      }
    })
  },
  onContentChange(e) {
    this.setData({
      desc: e.detail.value
    })
  },
  detil() {
    wx.navigateBack({
      delta: 1,
    });
  }
})