import serverData from "../../../../utils/serverData";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contacts: '',
    mobile: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setCompanyInfo2()
  },
  setCompanyInfo2 () {
    let that = this
    serverData.setCompanyInfo2({}).then((res) => {
      console.log(res);
      if (res.data.status == 1) {
        that.setData({
          contacts: res.data.data.contacts,
          mobile: res.data.data.mobile
        })
      }
    })
  },
  setCompanyInfoTwo () {
    let { contacts, mobile } = this.data;
    serverData.setCompanyInfoTwo({ contacts, mobile }).then((res) => {
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
  inputContactsName (e) {
    this.setData({
      contacts: e.detail.value
    })
  },
  inputContactsMobile (e) {
    this.setData({
      mobile: e.detail.value
    })
  }
})