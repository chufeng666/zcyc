import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arry: [],
    occupationalBoxShow: true,
    addressBoxShow: true,
    // 薪资
    xinzi: ['不限', '3k以下', '3 - 5k', '5 - 10k', '10 - 20k', '20 - 50k', '50k以上'],
    workJob: ['离职-随时到岗', '在职-月内到岗', '在职-考虑机会', '在职-暂不考虑',],
    // 上传数据
    careers: '',  // 岗位名称
    city: '',    // 市
    district: '',    // 区
    job_type: 0, // 工作类型
    job_intention: '', // 工种名称
    province: '',   // 省
    salary: '',    // 期望薪资
    daogang_time: '', // 工作状态
    // 职业证书
    images: [{ path: '', title: '' }],
    showAddBtn: true,
    index: 0,

    disabled: false,// 点击一次的开关
    intention: [],
    money: '' // 职位价格
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
    this.categoryList();
    this.initUserInfo7();
    /*********地址 */
    this.addressForm = this.selectComponent('#address');
    /*********地址 */
    /* 职位 */
    this.OccupationalForm = this.selectComponent('#Occupational');
    /* 职位 */

  },
  // 请求
  initUserInfo7() {
    let that = this;
    ServerData.initUserInfo7({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          careers: res.data.data.careers,
          city: res.data.data.city,
          district: res.data.data.district,
          job_type: res.data.data.job_type,
          job_intention: res.data.data.job_intention,
          province: res.data.data.province,
          salary: res.data.data.salary,
          daogang_time: res.data.data.daogang_time,
          images: res.data.data.images,
          arry: res.data.data,
        })
      }
    })
  },
  TimeId: -1,
  initUserInfoSevenOut() {
    let { job_intention, intention, images, careers, city, salary, daogang_time, money } = this.data;
    let title = '',
      path = ''
    if (careers == '' || city == '' || job_intention == '' || salary == '' || daogang_time == '') {
      return ServerData._wxTost('请填写资料');
    }
    for (let i in images) {
      title = images[i].title
      path = images[i].path
    }
    if (money > 0) {
      if (title == '' || path == null || images == '' || images == null) {
        return ServerData._wxTost('请填写职业类型和上传职业证书');
      } else {
        clearTimeout(this.TimeId);
        this.TimeId = setTimeout(() => {
          this.initUserInfoSeven();
        }, 350);
      }
    } else {
      clearTimeout(this.TimeId);
      this.TimeId = setTimeout(() => {
        this.initUserInfoSeven();
      }, 350);
    }
    // intention.forEach((v, i) => {
    //   if (v.cat_name == job_intention) {

    //   }
    // })
  },
  // 上传
  initUserInfoSeven() {
    let that = this
    let { images, job_intention } = this.data
    for (let i in images) {
      if (images[i].path == '' || images[i].title == '') {
        return ServerData._wxTost('请填写职业类型和上传职业证书');
      }
    }
    if (images == '') {
      images = [{ path: '', title: '' }]
    }
    let _opt = {
      'daogang_time': that.data.daogang_time,
      'city': that.data.city,
      'province': that.data.province,
      'district': that.data.district,
      'salary': that.data.salary,
      'careers': that.data.careers,
      'job_intention': job_intention,
      'images': images,
    }
    ServerData.initUserInfoSeven(_opt).then((res) => {
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
        this.setData({
          disabled: false
        })
      }

    })
  },
  // 获取职业证书开始
  tabEvent1(data) {
    let info = data.detail
    console.log(data.detail);
    this.setData({
      careers: info.job_careers,
      job_intention: info.job_intention,
      intention: info.intention,
      job_type: info.job_type,
      money: info.money
    })
  },
  selectOccupational: function (e) {
    this.OccupationalForm.showPopup()
    this.OccupationalForm.startAddressAnimation(true)
    this.setData({
      occupationalBoxShow: false
    })
  },
  // 获取职业证书结束
  /***********地址开始**************** */
  tabEvent(data) {      //接收传过来的参数
    var info = data.detail

    this.setData({
      areaInfo: info.areaInfo,
      pCode: info.pCode,
      cCode: info.cCode,
      aCode: info.aCode,
      showTST: info.showTST,
      addressBoxShow: info.isShow,
      province: info.province,
      city: info.city,
      district: info.area,
    })
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
    let { images } = this.data;
    if (images == null || images == '') {
      images = []
    }
    if (images.length == 3) {
      return ServerData._wxTost('最多只能上传3份证书')
    }
    images.push({ path: '', title: '' })
    this.setData({ images });
  },
  inpuTitle(e) {
    let title = e.detail.value
    let index = e.target.dataset.index
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
              images.splice(i, 1);
            }
          }
          that.setData({
            images
          })
        }
      }
    })
  },
  // 职业证书展示结束
  // 薪资
  setiXinzi(e) {
    let index = e.detail.value
    let { xinzi } = this.data
    this.setData({
      salary: xinzi[index]
    })
  },
  // 期望职位
  inputGangwei(e) {
    let careers = e.detail.value;
    this.setData({
      careers
    })
  },
  setiworkJob(e) {
    let { workJob } = this.data;
    this.setData({
      daogang_time: workJob[e.detail.value]
    })
  },
  detil() {
    wx.navigateBack({
      delta: 1,
    });
  },
  // 职业证书一级数据请求
  categoryList() {
    let that = this;
    ServerData.categoryList({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          intention: res.data.data
        })
      }
    })
  }
})