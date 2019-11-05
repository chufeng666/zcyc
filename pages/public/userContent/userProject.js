import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    project: [],
    isShow: true,
    index1: '',
    checked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.sameDay();
    this.initUserInfo4();// 请求数据
  },
  // 当天时间
  sameDay () {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    this.setData({
      sameDay: Y + '-' + M
    })
  },
  setSameDay (e) {
    this.setData({
      sameDay: e.detail.value
    })
  },
  setSameDay2 (e) {
    this.setData({
      sameDay2: e.detail.value
    })
  },
  // 请求数据
  initUserInfo4 () {
    let that = this
    ServerData.initUserInfo4({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          project: res.data.data
        })
      }
    })
  },
  onContentChange (e) {
    let { index } = e.target.dataset
    let { project } = this.data
    project[index].data5 = e.detail.value
    this.setData({
      project
    })
  },
  addOption (e) {
    let { project, isShow } = this.data;
    if (project.length > 3) {
      isShow = false
    }
    project.push({ data1: '', data2: '', data3: '', data4: '', data5: '' })
    this.setData({ project, isShow });
  },
  //上传数据
  initUserInfoFour () {
    let { project } = this.data
    ServerData.initUserInfoFour({ project }).then((res) => {
      if (res.data.status == 1) {
        ServerData._wxTost(res.data.msg);
        setTimeout(function () {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }, 1500)
      } else {
        ServerData._wxTost(res.data.msg);
      }
    })
  },
  inputCorporate (e) {
    this.setData({
      corporate: e.detail.value
    })
  },
  inputGangwei (e) {
    this.setData({
      gangwei: e.detail.value
    })
  },

  deleteitem (e) {
    let { index } = e.currentTarget.dataset;
    let { project } = this.data;
    for (let i = 0; i < project.length; i++) {
      if (i == index) {
        project.splice(i, 1);
      }
    }
    this.setData({
      project
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