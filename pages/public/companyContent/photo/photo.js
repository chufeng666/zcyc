import ServerData from '../../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 照片
    head: '',
    isShow2: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setCompanyInfo4()
  },
  setCompanyInfo4 () {
    let that = this;
    ServerData.setCompanyInfo4({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          head: res.data.data.head
        })
      }
    })
  },
  setCompanyInfoFour () {
    let { head } = this.data
    ServerData.setCompanyInfoFour({ head }).then((res) => {
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
  // 照片
  addIdCardPic2 () {                                    //头像上传1
    var _this = this
    let { head } = _this.data;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgSrc = res.tempFilePaths[0];
        ServerData.uploadFile(imgSrc).then((res) => {
          var dat = JSON.parse(res.data)
          if (dat.status == 1) {
            head = dat.data
            _this.setData({
              head, isShow2: false,
            })
          }
        })
      }
    })
  },

})