import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    desc: '1.负责落实公司各项安全规章管理制度\n2.确保项目部顺利实行安全生产工作\n3.现场检查管理工作及内场资料。',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initUserInfo8()
  },
  initUserInfo8 () {
    ServerData.initUserInfo8({}).then((res) => {
      console.log(res);
    })
  },
  initUserInfo8 () {
    let that = this
    let { desc } = that.data
    ServerData.initUserInfo8({ desc }).then((res) => {
      console.log(res);
    })
  },
  onContentChange (e) {
    this.setData({
      desc: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})