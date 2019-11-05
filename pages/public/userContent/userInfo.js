import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getUData: [],
    // // 上传参数          
    name: '',                 // 姓名
    gender: '',               // 性别
    avatar: '',               // 头像
    school_type: '',          // 学历
    age: '',                  // 年龄
    nation: '',             // 民族
    work_age: '',                // 工作经验
    province: '',       // 省
    city: '',             // 市
    district: '',       // 区
    // 
    // 筛选部分                     
    education: 0,          // 学历
    educationList: ['初中及以下', '高中', '中专', '大专', '本科', '硕士', '博士'],
    workYear: 0,             //工作年限
    workYearList: ['在校生', '应届生', '一年以内', '1-3年', '3-5年', '5-10年', '10年以上'],
    gender1: ['男', '女'],     // 性别
    // 现居住地址
    addressBoxShow: true,
    tapIndex: '',
  },
  onShow () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initUserInfo1();
    /*********地址 */
    this.addressForm = this.selectComponent('#address');
    /*********地址 */
  },
  // 设置民族
  bindKeyInputNation (e) {
    this.setData({
      nation: e.detail.value
    })
  },
  // 设置年龄
  bindKeyInputAge (e) {
    this.setData({
      age: e.detail.value
    })
  },
  // 设置姓名
  bindKeyInput (e) {
    this.setData({
      name: e.detail.value
    })
  },
  // 设置性别
  setgender () {
    let { gender1 } = this.data;
    let that = this
    wx.showActionSheet({
      itemList: gender1,
      success: function (res) {
        that.setData({
          tapIndex: gender1[res.tapIndex],
          gender: res.tapIndex
        })
      },
    })
  },
  // 设置学历
  bindPickerChange (e) {
    let { educationList } = this.data
    let index = e.detail.value
    this.setData({
      education: e.detail.value,
      school_type: educationList[index]
    })
  },
  // 设置工作年限
  setWorkYear (e) {
    let { workYearList } = this.data
    let index = e.detail.value
    this.setData({
      workYear: e.detail.value,
      work_age: workYearList[index]
    })
  },

  // 接收基本信息
  initUserInfo1 () {
    let that = this;
    let { getUData } = that.data
    ServerData.initUserInfo1({}).then(res => {
      if (res.data.status == 1) {
        getUData = res.data.data
        that.setData({
          name: getUData.name,
          gender: getUData.gender,
          school_type: getUData.school_type,
          age: getUData.age,
          nation: getUData.nation,
          work_age: getUData.work_age,
          province: getUData.province,
          city: getUData.city,
          district: getUData.district,
          avatar: getUData.avatar
        })
      }
    })
  },
  // 上传基本信息
  initUserInfoOne () {
    let { name, gender, age, nation, province, city, district, school_type, work_age } = this.data
    ServerData.initUserInfoOne({ name, gender, age, nation, province, city, district, school_type, work_age }).then(res => {
      if (res.data.status == 1) {
        ServerData._wxTost(res.data.msg);
        setTimeout(function () {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }, 1500)
      } else if (res.data.status == -1) {
        ServerData._wxTost('请随机修改一个信息');
      } else {
        ServerData._wxTost(res.data.msg);
      }
    })
  },
  saveHeaderPic () {
    var that = this,
      avatar = that.data.avatar
    ServerData.uploadHeadpic({ avatar }).then((res) => {
      if (res.data.status == 1) {
        ServerData._wxTost(res.data.msg)
      }
      ServerData._wxTost(res.data.msg)
    })
  },
  addIdCardPic: function (e) {                                    //头像上传
    var _this = this,
      avatar = _this.data.getUData.avatar
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        var imgSrc = res.tempFilePaths[0];
        avatar = imgSrc;
        _this.setData({
          avatar
        })
        ServerData.uploadFile(imgSrc).then((res) => {
          var dat = JSON.parse(res.data)
          if (dat.status == 1) {
            avatar = dat.data
            _this.setData({
              avatar
            })
          }
        })
      }
      //
    })
  },

  /***********地址开始**************** */
  tabEvent (data) {      //接收传过来的参数
    var info = data.detail
    this.setData({
      areaInfo: info.areaInfo,
      pCode: info.pCode,
      cCode: info.cCode,
      aCode: info.aCode,
      showTST: info.showTST,
      addressBoxShow: info.isShow,
      province: info.province,
      city: info.city + '-',
      district: info.area,
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


})