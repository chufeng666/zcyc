// pages/company/editInfo.js
import ServerData from '../../../utils/serverData.js';

const date = new Date()
const years = []
const months = []
const days = []
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({
  data: {
    // 头像
    logo: '',
    companyScale: '', //公司规模
    companyIntroduce: '', //公司介绍
    isAchievement: false, //是否显示成就
    isPerson: false, //是否显示名人介绍
    achiInfo: '', //公司成就
    personInfo: '', //名人介绍,
    userList: []
  },
	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    // this.getCompanyInfo()
  },
  onShow: function (options) {
    this.getCompanyInfo()
  },
  detil() {
    wx.redirectTo({
      url: '/pages/company/cUserInfo/cUserInfo'
    })
  },
  returnIndex(flag, arry, isN) {
    for (var i in arry) {
      if (isN) {
        if (arry[i].cat_id == flag) {
          return i
        }
      } else {
        if (arry[i] == flag) {
          return i
        }
      }
    }
  },
  selectDay(arry, flag) {
    for (var i in arry) {
      if (arry[i] == flag) {
        return i
      }
    }
  },
  getCompanyInfo() {
    var that = this
    ServerData.getCompayInfo({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          userList: res.data.data,
        })
      } else if (res.data.status == -1) {
        wx.redirectTo({
          url: '../../login/login'
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })

  },
  // 头像
  openActionsheet() {
    var _this = this
    let { logo } = _this.data;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgSrc = res.tempFilePaths[0];
        ServerData.uploadFile(imgSrc).then((res) => {
          var dat = JSON.parse(res.data)
          if (dat.status == 1) {
            logo = dat.data
            _this.setData({
              logo, isShow2: false,
            })
          }
        })
      }
    })
  },
	/**
	 * 编辑公司名称
	 */
  getCompanyName: function (e) {
    this.setData({
      companyName: e.detail.value
    })
  },

	/**
	 * 编辑公司类型
	 */
  getCompanyType: function (e) {
    this.setData({
      companyType: e.detail.value
    })
  },

	/**
	 * 成立时间
	 */
  yearsChang: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },

	/**
	 * 公司规模
	 */
  getcompanyScale: function (e) {
    this.setData({
      companyScale: e.detail.value
    })
  },

	/**
	 * 
	 * 热招职位
	 */
  jobChange: function (e) {
    this.setData({
      jobIndex: e.detail.value
    })
  },

	/**
	 * 
	 * 平均薪资
	 */
  // paysChange: function (e) {
  // 	this.setData({
  // 		paysIndex: e.detail.value
  // 	})
  // },

	/**
	 * 编辑公司成就框显示与隐藏
	 */
  addAchievementBox: function (e) {
    var status = this.data.achievement;
    this.setData({
      isAchievement: !status,
      isPerson: false,
    })
  },

	/** 
	* 保存公司成就输入框的信息
	*/
  saveAchievement: function (e) {
    this.setData({
      achiInfo: e.detail.value
    })
  },

	/**
	 * 编辑名人介绍框显示与隐藏
	 */
  addFamousPersonBox: function (e) {
    var status = this.data.person;
    this.setData({
      isPerson: !status,
      isAchievement: false
    })
  },

	/**
	 * 保存名人介绍输入框的信息
	 */
  savePerson: function (e) {
    this.setData({
      personInfo: e.detail.value
    })
  },

	/**
	 * 公司介绍
	 */
  getcompanyIntroduce: function (e) {
    this.setData({
      companyIntroduce: e.detail.value
    })
  },


	/**
	 * 校验数据
	 */
  verifyData: function () {
    console.log(this.data.companyScale)
    if (this.data.companyName == "") {
      ServerData._wxTost('名称不能为空');
      return false
    }
    else if (this.data.companyType == "") {
      ServerData._wxTost('类型不能为空');
      return false
    }
    else if (this.data.companyScale === "") {
      ServerData._wxTost('请填写规模');
      return false
    }
    else if (this.data.achiInfo == "") {
      ServerData._wxTost('请填写成就');
      return false
    }
    else if (this.data.personInfo == "") {
      ServerData._wxTost('请填写名人介绍');
      return false
    }
    else if (this.data.companyIntroduce == "") {
      ServerData._wxTost('介绍不能空');
      return false
    }
    else {
      return true;
    }
  },


  saveEditInfo: function () {
    ServerData.companyShenhe({}).then((res) => {
      if (res.data.status == 1) {
        ServerData._wxTost(res.data.msg);
        setTimeout(() => {
          wx.redirectTo({
            url: '../cUserInfo/cUserInfo',
          })
        }, 1000);

      } else {
        ServerData._wxTost(res.data.msg);
      }
    })
  }
})