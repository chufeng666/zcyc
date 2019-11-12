import serverData from "../../../../utils/serverData";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seniority: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setCompanyInfo6();
  },
  setCompanyInfo6 () {
    let that = this
    serverData.setCompanyInfo6({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          seniority: res.data.data
        })
      }
    })
  },
  setCompanyInfoSix () {
    let { seniority } = this.data
    serverData.setCompanyInfoSix({ seniority }).then((res) => {
      if (res.data.status == 1) {
        serverData._wxTost(res.data.msg)
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
      serverData._wxTost(res.data.msg)
    })
  },
  inputSeniority (e) {
    let { index } = e.target.dataset;
    let { seniority } = this.data;
    let value = e.detail.value
    seniority[index] = value
    this.setData({
      seniority
    })
  },
  addSeniority (e) {
    let { seniority } = this.data;
    seniority.push('');
    this.setData({
      seniority
    })
  }

})