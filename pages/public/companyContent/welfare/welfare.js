import ServerData from '../../../../utils/serverData.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    daiyu: [],
    isActive: false,
    daiyu1: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setCompanyDaiyu()
  },
  setCompanyDaiyu () {
    let that = this
    ServerData.setCompanyDaiyu({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          daiyu: res.data.data
        })
      }
    })
  },

  addDaiyu (e) {
    let { index } = e.currentTarget.dataset;
    let { daiyu } = this.data
    daiyu[index].checked = !daiyu[index].checked
    this.setData({ daiyu })
  },
  checkboxChange (e) {
    var daiyu1 = e.detail.value;
    if (daiyu1.length > 3) {
      return ServerData._wxTost('只能选三个')
    }
    this.setData({
      daiyu1
    });
  },
  editTel () { //选择或输入手机号给a页面
    let { daiyu1 } = this.data
    let pages = getCurrentPages(); //获取上一个页面信息栈(a页面)
    let prevPage = pages[pages.length - 2] //给上一页面的tel赋值
    prevPage.setData({
      welfare: daiyu1
    });
    wx.navigateBack({}); //关闭当前页面，返回上一个页面
  },
  onUnload: function () {
    wx.redirectTo({
      url: '../../../jobList/editJobList',//指定界面
    })
  }
})