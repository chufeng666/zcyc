import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [{ path: '', title: '' }],
    showAddBtn: 1,
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initUserInfo6()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  initUserInfo6() {
    let that = this
    ServerData.initUserInfo6({}).then((res) => {
      if (res.data.status == 1) {
        let images = res.data.data;
        that.setData({ images })
      }
    })
  },
  initUserInfoSix() {
    let that = this
    let { images } = that.data;
    ServerData.initUserInfoSix({ images }).then((res) => {
      if (res.data.status == 1) {
        ServerData._wxTost(res.data.msg)
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
        ServerData._wxTost(res.data.msg)
      }
    })

  },
  addIdCardPic(e) {                                    //头像上传
    var _this = this
    let path
    let { images } = _this.data;
    for (let i in images) {
      if (i == e.currentTarget.dataset.index) {
        wx.chooseImage({
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: function (res) {
            var imgSrc = res.tempFilePaths[0];
            path = imgSrc
            ServerData.uploadFile(path).then((res) => {
              var dat = JSON.parse(res.data)
              if (dat.status == 1) {
                path = dat.data
                images[i].path = path
                _this.setData({ images, index: e.currentTarget.dataset.index })
              }
            })
          }
        })
      }
    }

  },
  // 点击添加证件
  addOption: function (e) {
    let images = this.data.images;
    if (images == null) {
      images = []
    }
    images.push({ path: '', title: '' })
    this.setData({ images });

  },
  inpuTitle(e) {
    let title = e.detail.value
    let index = e.target.dataset.index
    // console.log(e);
    let images = this.data.images
    for (let i in images) {
      if (i == index) {
        images[i].title = title
      }
    }
    this.setData({
      images
    })
  },
  deletProfessional(e) {
    let that = this
    let { index } = e.currentTarget.dataset;
    let { images } = this.data;
    wx.showModal({
      title: '提示',
      content: '您确定要删除吗',
      success(res) {
        if (res.confirm) {
          for (let i in images) {
            if (i == index) {
              images.splice(i, 1)
            }
          }
          that.setData({
            images
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