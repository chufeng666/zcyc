import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 学历
    educationList: ['初中及以下', '高中', '中专', '大专', '本科', '硕士', '博士'],
    // 当天时间
    sameDay: '1991.11',
    sameDay2: '',
    // 上传数据
    graduate_time: '', // 毕业时间
    major: '', // 专业
    school: '', // 学校名称
    school_type: '', // 学历
    start_time: '', // 就读时间
    disabled: false // 点击一次的开关
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.sameDay();
    this.initUserInfo3();
  },
  onShow() {
    this.setData({
      disabled: false
    })
  },
  // 请求
  initUserInfo3() {
    let that = this;
    ServerData.initUserInfo3({}).then((res) => {
      console.log(res);
      if (res.data.status == 1) {
        that.setData({
          graduate_time: res.data.data.graduate_time,
          major: res.data.data.major,
          school: res.data.data.school,
          school_type: res.data.data.school_type,
          start_time: res.data.data.start_time,
        })
      }
    })
  },
  initUserInfoThree() {
    let that = this
    that.setData({
      disabled: true
    })
    let { graduate_time, major, school, school_type, start_time } = this.data;
    ServerData.initUserInfoThree({ graduate_time, major, school, school_type, start_time }).then((res) => {
      if (res.data.status == 1) {
        ServerData._wxTost(res.data.msg);
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      } else if (res.data.status == -1) {
        that.setData({
          disabled: true
        })
        wx.showModal({
          title: '提示',
          content: '是否不修改信息',
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            } else if (res.cancel) {
              that.setData({
                disabled: false
              })
            }
          }
        })
      } else {
        ServerData._wxTost(res.data.msg);
      }
    })
  },
  // 当天时间
  sameDay() {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    this.setData({
      sameDay2: Y + '-' + M,

    })
  },
  setSameDay(e) {
    let t = this;
    let date_1 = e.detail.value
    this.setData({
      start_time: date_1
    })
  },
  setSameDay2(e) {
    let t = this;
    let date_1 = e.detail.value
    this.setData({
      graduate_time: date_1
    })
  },
  // 设置学历
  bindPickerChange(e) {
    this.setData({
      school_type: e.detail.value
    })
  },
  // 学校
  inputSchool(e) {
    this.setData({
      school: e.detail.value
    })
  },
  // 专业
  inputMajor(e) {
    this.setData({
      major: e.detail.value
    })
  },
  // 学历
  bindPickerChange(e) {
    let { educationList } = this.data
    let index = e.detail.value
    this.setData({
      school_type: educationList[index]
    })
  },
  detil() {
    wx.navigateBack({
      delta: 1,
    });
  }



})