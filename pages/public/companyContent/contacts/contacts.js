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
  setCompanyInfo2() {
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
  setCompanyInfoTwo() {
    let { contacts, mobile } = this.data;
    serverData.setCompanyInfoTwo({ contacts, mobile }).then((res) => {
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
  inputContactsName(e) {
    this.setData({
      contacts: e.detail.value
    })
  },
  inputContactsMobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  detil() {
    wx.navigateBack({
      delta: 1,
    });
  }
})