import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 公司名称
    corporate: '广州万宝有限公司',
    // 职位名称
    gangwei: '安全员',
    // 当天时间
    sameDay: '',
    sameDay2: '至今',
    jingli: '1.负责落实公司各项安全规章管理制度\n2.确保项目部顺利实行安全生产工作\n3.现场检查管理工作及内场资料。',
    experience: [{}],   // 工作经验上传  
    isShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initUserInfo2();
    this.sameDay();
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
      sameDay: Y + '.' + M
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
  initUserInfo2 () {
    ServerData.initUserInfo2({}).then((res) => {
      console.log(res);
    })
  },
  // 上传数据
  initUserInfoTwo () {
    let { experience } = this.data
    ServerData.initUserInfoTwo({ experience }).then((res) => {
      console.log(res);
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
  addOption (e) {
    let { project, isShow } = this.data;
    if (project.length > 3) {
      isShow = false
    }
    project.push({ data1: '', data2: '', data3: '', data4: '', data5: '' })
    this.setData({ project, isShow });
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