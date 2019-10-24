// pages/userInfo/search.js
const util = require('../../../utils/util.js');  //通用方法
import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cStatus: 0,
    kw: '阳',
    rows: 200,
    page: 1,
    list: [],
    isShowInfo: false,
    pColor: '',                            //动态获字体颜色     
    pBgC: '',                            //动态获背景颜色                 
    pBC1: '',                            //动态获边框颜色 
    //地址三级开始
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    areaInfo: '',
    provinces: [],                //获取所有省数组
    citys: [],                    //获取所有城市数组
    areas: [],                    //获取所有区数组
    province: '',                 //获取选中的省
    city: '',                     //获取选中的市
    area: '',                     //获取选中的区
    pCode: '',                    //获取选中的省ID
    cCode: '',                    //获取选中的市ID
    aCode: '',                    //获取选中的区ID
    site_show: false,             //是否选择人才
    showTST: true,         //是否选择地址
    hiddenhistory: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*********地址 */
    this.provinces(0, 0);
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    this.animation = animation;

    this.reqIndex(); //请求数据
    this.getCategoryList();
    /*********地址 */
    this.setData({
      pColor: util.loginIdentity().pColor,
      pBC1: util.loginIdentity().pBC1,
      pBgC: util.loginIdentity().pBgC
    })
  },

  searchInfp () {
    var that = this,
      _opt = {
        kw: that.data.kw,
        rows: that.data.rows,
        page: that.data.page
      }
    ServerData.searchInfp(_opt).then((res) => {
      console.log(res.data.data)
      if (res.data.status == 1) {
        var status = false
        if (res.data.data.recruit.length < 1 && res.data.data.person.length < 1) {
          status = true
        }
        that.setData({
          list: res.data.data,
          isShowInfo: status
        })
      }
      else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
      console.log(res)
    });
  },
  changStatus: function (e) {
    console.log(e);
    this.setData({
      cStatus: e.currentTarget.dataset.status
    })
  },
  selecKeyWord (e) {
    console.log(e)
    this.setData({
      kw: e.detail.value,
      hiddenhistory: false
    })
    this.searchInfp()
  },
  reqIndex () {
    var that = this,
      _opt = {
        'job_type': that.data.job_type,
        'province': that.data.pCode,
        'city': that.data.cCode,
        'district': that.data.aCode,
      }
    ServerData.userVisit(_opt).then((res) => {
      if (res.data.status == 1) {
        this.setData({
          indexData: res.data.data,
        })
      }
      else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      }
      else {
        ServerData._wxTost(res.data.msg)
      }
    }).catch((error) => {
      ServerData._wxTost("数据请求失败!")
    })
    ServerData.recruitHot(_opt).then((res) => {
      console.log(res);
      if (res.data.status == 1) {
        this.setData({
          popular: res.data.data,
        })
      }
      else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      }
      else {
        ServerData._wxTost(res.data.msg)
      }
    }).catch((error) => {
      ServerData._wxTost("数据请求失败!")
    })

  },

  jobChange: function (e) {
    var t = e.detail.value == 0 ? false : true
    this.setData({
      jobIndex: e.detail.value,
      job_type: this.data.jobArray[e.detail.value].cat_id,
      site_show: t
    })
    console.log(job_type);
    this.reqIndex()             //主页信息
  },
  getCategoryList () {
    var that = this
    ServerData.categoryList({}).then((res) => {
      if (res.data.status == 1) {
        var newArry = []
        newArry.push({ cat_id: '', cat_name: "人才" })
        var recl = [...newArry, ...res.data.data]
        this.setData({ jobArray: recl })
      }
      else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      }
      else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  /********************其他资料结束 */
  /***********地址开始**************** */
  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this
    if (that.data.addressMenuIsShow) {
      return
    }
    that.startAddressAnimation(true)
  },

  // 执行动画
  startAddressAnimation: function (isShow) {
    var that = this
    if (isShow) {
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(40 + 'vh').step()
    }
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },

  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },

  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var value = that.data.value
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    let areaInfo = that.data.province.area_name
    that.setData({
      areaInfo: areaInfo,
      pCode: that.data.province.code,
      cCode: that.data.city.code,
      aCode: that.data.area.code,
      showTST: false
    })
    this.reqIndex()
  },

  // 处理省市县联动逻辑
  cityChange: function (e) {
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    if (this.data.value[0] != provinceNum) {
      this.provinces(provinceNum, 0);
      this.setData({
        value: [provinceNum, 0, 0]
      })
    } else if (this.data.value[1] != cityNum) {
      this.provinces(provinceNum, cityNum);
      this.setData({
        value: [provinceNum, cityNum, 0]
      })
    } else {
      this.provinces(provinceNum, cityNum);
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
  },
  provinces: function (code, index) {
    let that = this
    ServerData.getAddress({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          provinces: res.data.data,
          province: res.data.data[that.data.value[0]]
        })
        that.citys(res.data.data[code].code, index);
      } else {
        ServerData._wxTost(res.data.msg)
      }

    })
  },
  citys: function (code, index) {
    let that = this
    ServerData.getAddress({ parent_id: code }).then((res) => {
      if (res.data.status == 1) {
        if (res.data.data.length == 0) {
          that.setData({
            areas: '',
            citys: ''
          })
          return
        }
        that.setData({
          citys: res.data.data,
          city: res.data.data[that.data.value[1]]
        })
        that.areas(res.data.data[index].code);
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  areas: function (code) {
    let that = this
    ServerData.getAddress({ parent_id: code }).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          areas: res.data.data,
          area: res.data.data[that.data.value[2]]
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  },
  /***********地址结束**************** */
})