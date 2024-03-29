// pages/company/editInfo.js
import ServerData from '../../utils/serverData.js';
const util = require('../../utils/util.js');  //通用方法

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
		companyName: '', //公司名称
		companyType: '', //公司类型
		years: years, //年份数组
		year:date.getFullYear(),
		months: months, //月份数组
		month:2,
		days: days, // 天数组
		day:2,
		value: [9999, 0, 0],
		companyScale:'',              //公司规模
		companyIntroduce:'',          //公司介绍
		isAchievement:false,          //是否显示成就
		isPerson:false,               //是否显示名人介绍
		achiInfo:'',                  //公司成就
  	personInfo:'',                //名人介绍,
    userList:[],
    pBgC: '',                     //动态获背景颜色  

    //地址三级开始
    animationAddressMenu: {},
    addressMenuIsShow: false,
    addrdsValue: [0, 0, 0],
    areaInfo:'',
    provinces: [],                //获取所有省数组
    citys: [],                    //获取所有城市数组
    areas: [],                    //获取所有区数组
    province: '',                 //获取选中的省
    city: '',                     //获取选中的市
    area: '',                     //获取选中的区
    pCode: '',                    //获取选中的省ID
    cCode: '',                    //获取选中的市ID
    aCode: '',                    //获取选中的区ID
    site_show: true, 
    showTST:true,

    pickerDate: '',
    endTime: '',
    rangeList: ['10万','百万','千万'],
    rangeText:'',
    typeList: ['民营','私企','上市'],
    typeText:'',
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    this.setData({
      pBgC: util.loginIdentity().pBgC
    })
    this.getCompanyInfo()

    /*********地址 */
    this.provinces(0, 0);
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    this.animation = animation;

    this.setData({
      endTime: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    })
    /*********地址 */
  },
  // returnIndex(flag, arry, isN) {
  //   for (var i in arry) {
  //     if (isN) {
  //       if (arry[i].cat_id == flag) {
  //         return i
  //       }
  //     } else {
  //       if (arry[i] == flag) {
  //         return i
  //       }
  //     }
  //   }
  // },
  //成立时间 选择器
  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pickerDate: e.detail.value
    })
  },
  //营业范围选择器
  bindPickerRange: function (e) {
    // console.log('picker发送选择改变，携带值为', e)
    this.setData({
      rangeText: this.data.rangeList[Number(e.detail.value)]
    })
  },
  //公司类型选择器
  bindPickerType: function (e) {
    // console.log('picker发送选择改变，携带值为', e)
    this.setData({
      typeText: this.data.typeList[Number(e.detail.value)]
    })
  },
  selectDay(arry,flag){
      for (var i in arry) {
        if (arry[i] == flag) {
          return i
        }
      }
  },
  getCompanyInfo(){
    var that =this
    ServerData.getCompayInfo({}).then((res) => {
      if (res.data.status==1){
            var info = res.data.data
            var val = that.data.value
            var isShow =false
            val[0] = that.selectDay(years,info.open_year)
            val[1] = that.selectDay(months, info.open_month)
            val[2] = that.selectDay(days, info.open_day)
          var salary =ServerData.returnIndex(info.salary, that.data.payArray, false)
          if(!(info.province_str=="" && info.city_str=="" &&  info.district_str=="")){
              var areaInfo =info.province_str+  ',' + info.city_str+  ',' +info.district_str
          }else{
            isShow=true
          }
            that.setData({
                userList:res.data.data,
                companyName: info.company_name,
                companyType: info.type,
                companyScale:info.contacts_scale,
                achiInfo: info.achievement,
                personInfo: info.introduction,
                companyIntroduce:info.desc,
                value:val,
                showTST:isShow,
                areaInfo: areaInfo,
                pCode: info.province,                   
                cCode: info.city,                  
                aCode: info.district,  
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
	getcompanyScale:function(e){
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
	 * 编辑公司成就框显示与隐藏
	 */
	addAchievementBox: function (e) {  
		var status = this.data.isAchievement;
		this.setData({
			isAchievement: !status,
			isPerson: false,
		})
	},

	/** 
	* 保存公司成就输入框的信息
	*/
	saveAchievement:function(e){    
		this.setData({
			achiInfo: e.detail.value
		})
	},

	/**
	 * 编辑名人介绍框显示与隐藏
	 */
	addFamousPersonBox: function (e) {
		var status = this.data.isPerson;
		this.setData({
			isPerson: !status,
			isAchievement: false
		})
	},

	/**
	 * 保存名人介绍输入框的信息
	 */
	savePerson:function(e){
		this.setData({ 
			personInfo: e.detail.value 
		})  
	},

	/**
	 * 介绍
	 */
	getcompanyIntroduce:function(e){
		this.setData({
			companyIntroduce: e.detail.value
		})
	},
	
	/**
	 * 校验数据
	 */
	verifyData: function () {
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

	/**
	 * 保存数据
	 */
	saveEditInfo: function () {
    var that =this
		if (!that.verifyData()) {
			return false
		}
		// 传参到后台
		var _opt = {
			company_name: that.data.companyName,
			type: that.data.companyType,
			open_year: that.data.year,
			open_month: that.data.month,
			open_day: that.data.day,
			contacts_scale: that.data.companyScale,
			introduction:that.data.personInfo,
			achievement:that.data.achiInfo,
      desc:that.data.companyIntroduce,
      province: that.data.pCode,
      city: that.data.cCode,
      district: that.data.aCode,
		}
		
		ServerData.editCompany(_opt).then((res) => {
        if (res.data.status == 1) {
          ServerData._wxTost(res.data.msg);
        } else {
          ServerData._wxTost(res.data.msg);
        }
        setTimeout(() => {
            wx.navigateBack({
              delta:1
          })
        }, 1100)
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
    var value = that.data.addrdsValue
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    let areaInfo = that.data.province.area_name + ',' + that.data.city.area_name + ',' + that.data.area.area_name
    that.setData({
      areaInfo: areaInfo,
      pCode: that.data.province.code,
      cCode: that.data.city.code,
      aCode: that.data.area.code,
      showTST:false
    })
  },

  // 处理省市县联动逻辑
  cityChange: function (e) {
    var value = e.detail.value
    // console.log(value)
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    if (this.data.addrdsValue[0] != provinceNum) {
      this.provinces(provinceNum, 0);
      this.setData({
        addrdsValue: [provinceNum, 0, 0]
      })
    } else if (this.data.addrdsValue[1] != cityNum) {
      this.provinces(provinceNum, cityNum);
      this.setData({
        addrdsValue: [provinceNum, cityNum, 0]
      })
    } else {
      this.provinces(provinceNum, cityNum);
      this.setData({
        addrdsValue: [provinceNum, cityNum, countyNum]
      })
    }
  },
  provinces: function (code, index) {
    let that = this
    ServerData.getAddress({}).then((res) => {
      if (res.data.status == 1){
        that.setData({
          provinces: res.data.data,
          province: res.data.data[that.data.addrdsValue[0]]
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
          city: res.data.data[that.data.addrdsValue[1]]
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
          area: res.data.data[that.data.addrdsValue[2]]
        })
      } else {
        ServerData._wxTost(res.data.msg)
      }
    })
  }
  /***********地址结束**************** */

})