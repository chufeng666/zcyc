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
    userList: [],

  },
	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    
  },
  onShow: function (options) {
    this.getCompanyInfo()

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
    let regtype =wx.getStorageSync("savePostion")
    ServerData.getCompayInfo({ regtype }).then((res) => {
      if (res.data.status == 1) {
        var info = res.data.data
        var val = that.data.value
        that.setData({
          userList: res.data.data,
          companyName: info.company_name,
          companyType: info.type,
          companyScale: info.contacts_scale,
          achiInfo: info.achievement,
          personInfo: info.introduction,
          companyIntroduce: info.desc,
          value: val,
          logo: info.logo,
          status: info.status,
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
    let regtype = wx.getStorageSync("savePostion")
    ServerData.companyShenhe({regtype}).then((res) => {
      if (res.data.status == 1) {
        ServerData._wxTost(res.data.msg);
        setTimeout(() => {
          wx.navigateBack({
            url: '/thirdParty/cUserInfo/cUserInfo',
          })
        }, 1000);
      } else if(res.data.status == -1) {
        
      }
      ServerData._wxTost(res.data.msg);
    })
  }
})