import ServerData from '../../../utils/serverData.js';
const payArray = [];
for (let i = 1; i <= 20; i++) {
  // i=i+1000-1;
  payArray.push(i);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 初始化个人数据
    getUData: [],
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initUserInfo();
  },

  initUserInfo () {
    var that = this,
      areaInfo = ''
    ServerData.initUserInfo({}).then((res) => {
      if (res.data.status == 1) {
        var info = res.data.data
        var isShow = true
        var job_type = ServerData.returnIndex(info.job_type, that.data.jobArray, true)
        var salary = ServerData.returnIndex(info.salary, that.data.payArray, false)
        if ('undefined' == typeof (salary)) {
          salary = 0
        }
        var daogang_time = ServerData.returnIndex(info.daogang_time, that.data.array, false)
        if ('undefined' == typeof (daogang_time)) {
          daogang_time = 0
        }
        var work_age = ServerData.returnIndex(info.work_age, that.data.payArray, false)
        if ('undefined' == typeof (work_age)) {
          work_age = 0
        }
        if (!(info.province_str == "" && info.city_str == "" && info.district_str == "")) {
          areaInfo = info.province_str + ',' + info.city_str + ',' + info.district_str
          isShow = false
        }
        var item = that.data.items
        var t = ''
        for (var i in item) {
          item[i].checked = false
          if (item[i].name == info.gender) {
            t = i
          }
        }
        item[t].checked = true
        this.setData({
          getUData: info,
          name: info.name,
          gender: info.gender,
          wordIndex: work_age,
          old: info.age,
          mz: info.nation,
          workInfo: info.experience,
          aducationalInfo: info.education,
          explain: info.desc,
          jobIndex: job_type,
          paysIndex: salary,
          index: daogang_time,
          xLInfo: info.school_type,
          showTST: isShow,
          areaInfo: areaInfo,
          pCode: info.province,
          cCode: info.city,
          aCode: info.district,
        })
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      }
      else if (res.data.status == -3) {
        ServerData._wxTost(res.data.msg)
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 1500)
      }
      else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  /**
   * 
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