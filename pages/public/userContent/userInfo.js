import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getUData: {},
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
    this.initUserInfo1();
    /*********地址 */
    this.addressForm = this.selectComponent('#address');
    /*********地址 */
  },
  // 设置民族
  bindKeyInputNation(e) {
    this.setData({
      nation: e.detail.value
    })
  },
  // 设置年龄
  bindKeyInputAge(e) {
    this.setData({
      age: e.detail.value
    })
  },
  // 设置姓名
  bindKeyInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  // 设置性别
  setgender() {
    let { gender1 } = this.data;
    let that = this
    wx.showActionSheet({
      itemList: gender1,
      success: function (res) {
        that.setData({
          gender: gender1[res.tapIndex],
          tapIndex: gender1[res.tapIndex]
        })
      },
    })
  },
  // 设置学历
  bindPickerChange(e) {
    let { educationList } = this.data
    let index = e.detail.value
    this.setData({
      education: e.detail.value,
      school_type: educationList[index]
    })
  },
  // 设置工作年限
  setWorkYear(e) {
    let { workYearList } = this.data
    let index = e.detail.value
    this.setData({
      workYear: e.detail.value,
      work_age: workYearList[index]
    })
  },

  // 接收基本信息
  initUserInfo1() {
    let that = this;
    let { tapIndex } = that.data
    ServerData.initUserInfo1({}).then(res => {
      if (res.data.status == 1) {
        tapIndex = res.data.data.gender
        if (tapIndex == 0) {
          tapIndex = '男'
        } else {
          tapIndex = '女'
        }
        that.setData({
          getUData: res.data.data,
          name: res.data.data.name,
          tapIndex,
          school_type: res.data.data.school_type,
          age: res.data.data.age,
          nation: res.data.data.nation,
          work_age: res.data.data.work_age,
          province: res.data.data.province,
          city: res.data.data.city,
          district: res.data.data.district,
          avatar: res.data.data.avatar
        })
      }
    })
  },
  TimeId: -1,
  initUserInfoOneOut() {
    let that = this
    that.setData({
      disabled: true
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.initUserInfoOne()
    }, 350);
  },
  // 上传基本信息
  initUserInfoOne() {
    let that = this
    // if (!that._verifyInfo()) { return }
    let { tapIndex } = that.data
    if (tapIndex == '男') {
      tapIndex = 0
    } else {
      tapIndex = 1
    }
    let _opt = {
      "name": that.data.name,
      "age": that.data.age,
      "nation": that.data.nation,
      "province": that.data.province,
      "avatar": that.data.avatar,
      "city": that.data.city,
      "district": that.data.district,
      "school_type": that.data.school_type,
      "work_age": that.data.work_age,
      "gender": tapIndex,
    }
    ServerData.initUserInfoOne(_opt).then(res => {
      if (res.data.status == 1) {
        ServerData._wxTost(res.data.msg);
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
        that.setData({
          disabled: false
        })
      }
    })
  },
  // saveHeaderPic() {
  //   var that = this,
  //     avatar = that.data.avatar
  //   ServerData.uploadHeadpic({ avatar }).then((res) => {
  //     if (res.data.status == 1) {
  //       ServerData._wxTost(res.data.msg)
  //     }
  //     ServerData._wxTost(res.data.msg)
  //   })
  // },
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
  _verifyInfo() {
    var that = this
    if (that.data.name == "") {
      ServerData._wxTost('请输入姓名');
      return false
    }
    if (that.data.age == "") {
      ServerData._wxTost('请输入年龄');
      return false
    }
    if (that.data.nation == "") {
      ServerData._wxTost('请输入民族');
      return false
    }
    if (that.data.gender == "") {
      ServerData._wxTost('请选择性别');
      return false
    }
    if (that.data.province == "") {
      ServerData._wxTost('请选择居住地址');
      return false
    }
    if (that.data.school_type == "") {
      ServerData._wxTost('请选择学历');
      return false
    }
    if (that.data.work_age == "") {
      ServerData._wxTost('请选择工作年限');
      return false
    }
    return true
  },
  /***********地址开始**************** */
  tabEvent(data) {      //接收传过来的参数
    var info = data.detail
    this.setData({
      areaInfo: info.areaInfo,
      showTST: info.showTST,
      addressBoxShow: info.isShow,
      province: info.province,
      city: info.city,
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
  detil() {
    wx.navigateBack({
      delta: 1,
    });
  }

})