import serverData from "../../../../utils/serverData";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    c_img: '',
    isShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setCompanyInfo5();
  },
  setCompanyInfo5 () {
    let that = this
    serverData.setCompanyInfo5({}).then((res) => {
      console.log(res)
      if (res.data.status == 1) {
        that.setData({
          c_img: res.data.data.c_img
        })
      }
    })
  },
  setCompanyInfoFive () {
    let { c_img } = this.data
    serverData.setCompanyInfoFive({ c_img }).then((res) => {
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
  openActionsheet (e) {
    var _this = this
    let { c_img } = _this.data;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgSrc = res.tempFilePaths[0];
        serverData.uploadFile(imgSrc).then((res) => {
          var dat = JSON.parse(res.data)
          if (dat.status == 1) {
            c_img = dat.data
            _this.setData({ c_img })
          }
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