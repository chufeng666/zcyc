import ServerData from '../../utils/serverData.js';
const util = require('../../utils/util.js');  //通用方法
Page({
  data: {
    jobArray: [],                     //工种列表
    company_id: '',                    //发布人id
    id: '',                           //动态id 修改信息时才能获取到
    title: '',                         //职位名称
    type: '',                        //招聘岗位
    work_age: '',                     //经验要求
    salary: '',                       //薪资
    welfare: [],                      //福利待遇
    require_cert: 0,                  //证书要求
    education: '',                     //学历要求
    status: 0,                        //審核狀態
    province: '',                     //省
    city: '',                         //市
    district: '',                     //区
    //工作地点
    detail: '',                         //職位介绍
    certificate: [],
    experienceList: ["请选择经验要求", "在校生", "应届生", "1年以内", "1-3年", "3-5年", "5-10年", "10年以上"], //经验要求
    educationList: ['大专', '本科', '专科', '硕士'],  //学历要求
    salaryList: ['不限', '3k以下', '3 - 5k', '5 - 10k', '10 - 20k', '20 - 50k', '50k以上'], //薪资要求
    welfareList: ['五险一金', '零食', '下午茶'],   //福利待遇
    describeList: ['描述1', '描述2', '描述3'], //职位描述
    certificateList: ['无须证书', '需要证书'],//证书要求
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    /*********地址 */
    if (wx.hideHomeButton) wx.hideHomeButton()
    this.addressForm = this.selectComponent('#address');
    /*********地址 */
    /*********工种 */
    this.OccupationalForm = this.selectComponent('#Occupational');
    /*********工种 */
    this.setData({
      id: options.id,
      company_id: options.company_id
    })
    console.log(options.id);
    if (options.id != undefined || options.id != '') {
      return false
    } else {
      this.goEditRecruit()
    }
  },
  /**
  * 第一次发布职位保存数据
  */
  saveEditRecruit: function () {
    var that = this
    // 传参到后台
    var { company_id, type, title, work_age, salary, welfare, require_cert, education, province, city, district, detail } = this.data
    // return
    ServerData.editRecruit({ company_id, type, title, work_age, salary, welfare, require_cert, education, province, city, district, detail }).then((res) => {
      if (res.data.status == 1) {
        ServerData._wxTost('保存成功,信息需管理员审核');
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
      } else {
        ServerData._wxTost(res.data.msg);
      }
    })
  },
  // 修改发布职位数据的请求
  goEditRecruit: function () {
    var that = this
    // 传参到后台
    let _opt = {
      'id': that.data.id,
    }
    // return
    ServerData.goEditRecruit(_opt).then((res) => {
      console.log(res);
      let info = res.data.data
      if (res.data.status == 1) {
        that.setData({
          city: info.city,
          detail: info.detail,
          district: info.district,
          province: info.province,
          require_cert: info.require_cert,
          salary: info.salary,
          title: info.title,
          type: info.type,
          welfare: info.welfare,
          work_age: info.work_age,
          company_id: info.company_id,
          id: info.id,
          status: info.status,
        })
      } else {
        console.log('111111111111111111111111111111111111111');
        ServerData._wxTost(res.data.msg);
      }
    })
  },
  // 修改发布职位点击保存传递修改后的发布职位数据
  amendEditRecruit: function () {
    var that = this
    // 传参到后台
    let _opt = {
      'id': that.data.id,
      'company_id': that.data.company_id,
      'type': that.data.type,
      'title': that.data.title,
      'work_age': that.data.work_age,
      'salary': that.data.salary,
      'welfare': that.data.welfare,
      'require_cert': that.data.require_cert,
      'education': that.data.education,
      'province': that.data.province,
      'city': that.data.city,
      'district': that.data.district,
      'detail': that.data.detail,
    }
    ServerData.amendEditRecruit(_opt).then((res) => {
      if (res.data.status == 1) {
        ServerData._wxTost(res.data.msg);
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
      } else {
        ServerData._wxTost(res.data.msg);
      }
    })
  },

  //经验要求选择器
  changeExperience: function (e) {
    let { experienceList } = this.data
    this.setData({
      work_age: experienceList[e.detail.value]
    })
  },
  //学历要求选择器
  changeEducation: function (e) {
    let { educationList } = this.data
    this.setData({
      education: educationList[e.detail.value]
    })
  },
  //薪资范围选择器
  changeSalary: function (e) {
    let { salaryList } = this.data
    this.setData({
      salary: salaryList[e.detail.value]
    })
  },
  //福利待遇选择器
  changeWelfare: function (e) {
    this.setData({
      welfareText: e.detail.value
    })
  },
  // 证书要求选择器
  changCertificate(e) {
    this.setData({
      require_cert: e.detail.value
    })
  },
  //职位描述选择器
  changeDescribe: function (e) {
    this.setData({
      describeText: this.data.describeList[Number(e.detail.value)]
    })
  },
  /**
   * 获取工龄
   */
  getWorkAge: function (e) {
    this.setData({
      workAge: e.detail.value
    })
  },

  /**
   * 选择薪资范围
   */
  salaryChange: function (e) {
    this.setData({
      salaryIndex: e.detail.value,
      salaryIndex2: parseInt(e.detail.value) + 1,
      selectShow: true
    })
    if (this.data.salaryIndex == 0) {
      this.setData({
        selectShow: false,
      })
    }
    if (this.data.salaryIndex == this.data.salaryArray.length - 1) {
      this.setData({
        salaryIndex2: this.data.salaryArray.length - 1
      })
    }

  },

  /**
   * 是否需要证书
   */
  radioChange: function (e) {
    this.setData({
      isNeed: e.detail.value
    })
  },
  /**
   * 职位描述
   */
  getDetails: function (e) {
    this.setData({
      detail: e.detail.value
    })
  },
  /**
   * 校验数据
   */
  // verifyData: function () {
  //   if (!/^[\S\s]{2,50}$/.test(this.data.title)) {
  //     ServerData._wxTost('公司名称2-50');
  //     return false
  //   }
  //   else if (this.data.workAge == "") {
  //     ServerData._wxTost('请输入工作年限');
  //     return false
  //   }
  //   else if (!/^[\S\s]{10,200}$/.test(this.data.details)) {
  //     ServerData._wxTost('职位描述长度10-200');
  //     return false
  //   }
  //   else {
  //     return true;
  //   }
  // },
  /* 职位 */
  tabEvent1(data) {
    let info = data.detail
    this.setData({
      type: info.job_careers,
      title: info.job_intention,
    })
  },
  selectOccupational: function (e) {
    this.OccupationalForm.showPopup()
    this.OccupationalForm.startAddressAnimation(true)
    this.setData({
      occupationalBoxShow: false
    })
  },
  /***********地址开始**************** */
  tabEvent(data) {      //接收传过来的参数
    var info = data.detail
    this.setData({
      showTST: info.showTST,
      province: info.province,
      city: info.city,
      district: info.area,
    })
  },

  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    this.addressForm.showPopup()
    this.addressForm.startAddressAnimation(true)
  },
  /***********地址结束**************** */

})