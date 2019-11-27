import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    showAddBtn: 1,
    index: 0,
    disabled: false // 点击一次的开关
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
  onShow: function () {
    this.setData({
      disabled: false
    })
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
  TimeId: -1,
  initUserInfoSixOut() {
    let that = this
    let { images } = that.data;
    that.setData({
      disabled: true
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.initUserInfoSix(images)
    }, 350);
  },
  initUserInfoSix(images) {
    let that = this
    ServerData.initUserInfoSix({ images }).then((res) => {
      if (res.data.status == 1) {
        ServerData._wxTost(res.data.msg)
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      } else if (res.data.status == -1) {
        ServerData.showModal('是否不修改信息').then((res) => {
          wx.navigateBack({
            delta: 1
          })
        }).catch((res) => {
          that.setData({
            disabled: false
          })
        })
      } else {
        ServerData._wxTost(res.data.msg)
        this.setData({
          disabled: false
        })
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
    setTimeout(() => {
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
    }, 350);
  },
  detil() {
    wx.navigateBack({
      delta: 1,
    });
  }
})