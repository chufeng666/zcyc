import ServerData from '../../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 头像
    logo: '',
    icCardPic: { src: '', hiddenName: true, newSrc: '' },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 头像
  openActionsheet () {
    var _this = this,
      data = _this.data.icCardPic
    wx.showActionSheet({
      itemList: ['拍照', '从相册选择'],
      itemColor: '#007aff',
      success (res) {
        if (res.tapIndex === 0) {
          wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
              var imgSrc = res.tempFilePaths[0];
              data.src = imgSrc;
              data.hiddenName = false;
              _this.setData({
                icCardPic: data
              })
              ServerData.uploadFile(imgSrc).then((res) => {
                var dat = JSON.parse(res.data)
                if (dat.status == 1) {
                  data.newSrc = dat.data
                  _this.setData({
                    icCardPic: data
                  })
                }
              })
            }

          })
        } else if (res.tapIndex === 1) {
          wx.chooseImage({
            count: 1, // 设置最多三张
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success (res) {
              var tempFilePaths = res.tempFilePaths;
              // 图片预览
              wx.previewImage({
                current: res.tempFilePaths[0],
                urls: res.tempFilePaths
              })
            }
          })
        }
      }
    })
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