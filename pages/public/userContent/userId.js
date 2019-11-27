import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow1: true,
    idcard_back: [''],
    isShow2: true,
    idcard_front: [],
    idcard: '',  // 省份证号码
    status: 0, //审核
    disabled: false // 点击一次的开关
  },
  onShow() {
    this.setData({
      disabled: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initUserInfo5()
  },
  // 获取身份证
  initUserInfo5() {
    let that = this;
    ServerData.initUserInfo5({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          idcard: res.data.data.idcard,
          idcard_back: res.data.data.idcard_back,
          idcard_front: res.data.data.idcard_front,
          status: res.data.data.status,
        })
      }
    })
  },
  TimeId: -1,
  initUserInfoFiveOut() {
    let that = this
    that.setData({
      disabled: true
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.initUserInfoFive()
    }, 350);
  },
  // 上传身份证
  initUserInfoFive() {
    let that = this;
    let { idcard, idcard_back, idcard_front } = that.data
    ServerData.initUserInfoFive({ idcard, idcard_back, idcard_front }).then((res) => {
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
        ServerData._wxTost(res.data.msg);
        this.setData({
          disabled: false
        })
      }
    })
  },
  addIdCardPic1() {                                    //头像上传1
    var _this = this
    let { idcard_back, status } = _this.data;
    if (status == 1) {
      ServerData._wxTost('审核已完成,不可更改')
    } else {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          var imgSrc = res.tempFilePaths[0];
          idcard_back = imgSrc
          ServerData.uploadFile(idcard_back).then((res) => {
            console.log(res);
            var dat = JSON.parse(res.data)
            if (dat.status == 1) {
              idcard_back = dat.data
              _this.setData({
                idcard_back, isShow1: false,
              })
            }
          })
        }
      })
    }
  },
  addIdCardPic2() {                                    //头像上传1
    var _this = this
    let { idcard_front, status } = _this.data;
    if (status == 1) {
      ServerData._wxTost('审核已完成,不可更改')
    } else {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          var imgSrc = res.tempFilePaths[0];
          idcard_front = imgSrc
          ServerData.uploadFile(idcard_front).then((res) => {
            var dat = JSON.parse(res.data)
            if (dat.status == 1) {
              idcard_front = dat.data
              _this.setData({
                idcard_front, isShow2: false,
              })
            }
          })
        }
      })
    }
  },
  // 身份证号码
  inputIdcard(e) {
    let that = this
    let { status } = this.data;
    if (status == 1) {
      that.setData({
        disabled: true
      })
      return ServerData._wxTost('审核已完成,不可更改')
    } else {
      this.setData({
        idcard: e.detail.value
      })
    }
  },
  detil() {
    wx.navigateBack({
      delta: 1,
    });
  }
})