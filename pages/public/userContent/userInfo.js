import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 头像
    icCardPic: { src: '', hiddenName: true, newSrc: '' },
    // 姓名
    name: '',
    // 性别
    gender: ["男", "女"],
    tapIndex: '',
    // 年龄
    age: '28',
    // 民族
    nation: '汉',
    // 学历
    index: 0,
    education: '',
    educationList: ['初中及以下', '高中', '中专', '大专', '本科', '硕士', '博士'],
    //工作年限
    index1: 0,
    workYear: '',
    workYearList: ['在校生', '应届生', '一年以内', '1-3年', '3-5年', '5-10年', '10年以上'],
    // 现居住地址
    areaInfo: '广州-黄埔区',
    addressBoxShow: true,


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*********地址 */
    this.addressForm = this.selectComponent('#address');
    /*********地址 */
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
  // 设置性别
  setgender () {
    let temp = this.data.gender;
    let that = this
    wx.showActionSheet({
      itemList: that.data.gender,
      success: function (res) {
        that.setData({
          tapIndex: temp[res.tapIndex]
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  // 设置学历
  bindPickerChange (e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 设置工作年限
  setWorkYear (e) {
    this.setData({
      index: e.detail.value
    })
  },

  /***********地址开始**************** */
  tabEvent (data) {      //接收传过来的参数
    var info = data.detail
    console.log(info.areaInfo)
    this.setData({
      areaInfo: info.areaInfo,
      pCode: info.pCode,
      cCode: info.cCode,
      aCode: info.aCode,
      showTST: info.showTST,
      addressBoxShow: info.isShow,
    })
    // this.hiring()             //主页信息
  },

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    this.addressForm.showPopup()
    this.addressForm.startAddressAnimation(true)
    this.setData({
      addressBoxShow: false
    })
  },
  /***********地址结束**************** */

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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