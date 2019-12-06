import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    desc: '',
    disabled: false // 点击一次的开关
  },
  onShow() {
    this.setData({
      disabled: false
    })
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
  TimeId: -1,
  initUserInfoEightOut() {
    let that = this
    let { desc } = that.data;
    that.setData({
      disabled: true
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.initUserInfoEight(desc)
    }, 350);
  },
  initUserInfoEight(desc) {
    let that = this;
    ServerData.buttonClicked(this);
    ServerData.initUserInfoEight({ desc }).then((res) => {
      if (res.data.status == 1) {
        ServerData._wxTost(res.data.msg);
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      } else if (res.data.status == -1) {
        ServerData.showModal('是否不修改信息').then((res) => {
          wx.navigateBack({
            delta: 1
          })
        }).catch((res) => {
          that.setData({
            disabled: false
          })
        })
      } else {
        ServerData._wxTost(res.data.msg);
        this.setData({
          disabled: false
        })
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