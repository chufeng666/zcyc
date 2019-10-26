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
    getUData: [],
    array: ['离职-随时到岗', '在职-月内到岗', '在职-考虑机会', '在职-暂不考虑'],
    payArray: payArray,
    index: 0,                              //到岗时间
    gender: 2,                            //性别
    paysIndex: 5,                           //薪资
    jobArray: [],
    // job_type:'',
    showDialog: false,                                      //学历弹框
    jobIndex: 0,
    work: false,
    aducational: false,
    workInfo: "",                           //工作经验
    aducationalInfo: "",                    //教育经历
    old: "",                                //年龄
    mz: "",                                 //民族
    wordOld: "",                            //工龄
    wordIndex: 1,
    explain: "",                            //说明
    areaInfo: '',
    pCode: '',                    //获取选中的省ID
    cCode: '',                    //获取选中的市ID
    aCode: '',                    //获取选中的区ID
    site_show: true,
    showTST: true,
    isShow: false,
    addressBoxShow: true,
    name: "",                               //姓名
    rangeList: ['男', '女'],                 //性别
    rangeText: '',
    endTime: '',                         //时间选择器 当前时间
    birthDate: '',                       //出生年月
    educationText: '',
    workYearText: '',
    stateText: '',
    typeText: '',
    isShowPost: false,     //显示期望岗位
    postList: [],    //选中的期望岗位
    monthlyText: '',
    phone: '',   //联系方式
    xLInfo: '请选择学历',
    xLItem: [                                                // 学校类型
      { name: '硕士', value: '硕士' },
      { name: '博士', value: '博士' },
      { name: '本科', value: '本科' },
      { name: '大专', value: '大专' },
      { name: '高中以下', value: '高中以下' }
    ],
    items: [
      { name: '2', value: '女', checked: true },    //性别选择
      { name: '1', value: '男', checked: false }
    ],
    educationList: ['初中', '高中', '大专', '本科'],  //学历
    workYearList: ['三年及以下', '3-5年', '5-10年', '10年以上'], //工作年限
    stateList: ['离职-随时到岗', '在职-月内到岗', '在职-考虑机会', '在职-暂不考虑'],  //当前状态
    typeList: ['土木工程', '建筑工程', '电气', '其他'],  //求职类型
    monthlyList: ['不限', '3k-4k', '5k-6k', '8k-9k'],  //期望月薪
    pics: [                                                 // 职业证书
      { src: '', hiddenName: true, newSrc: '', name: '' }
    ],
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