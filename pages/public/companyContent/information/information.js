import serverData from "../../../../utils/serverData";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 公司成立时间
    sameDay: '',
    // 公司规模
    index: 0,
    guimo: ["请选择公司规模", "0-20人", "20-99人", "100-499人", "500-999人", "1000-9999人", "10000人以上"],
    // 公司性质
    index2: 0,
    xingzhi: ['请选择公司性质', '国企', '民营', '私企'],
    company_name: '', // 公司名称
    contacts_scale: '', // 公司规模
    desc: '',          // 公司简介
    open_time: '',   //成立时间
    telephone: '',   //固定电话
    type: '',         // 公司性质
    province: '',         //省
    city: '',         //市
    district: '',         //区
    head: '',            //公司环境
    showTST: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setCompanyInfo3();
    /*********地址 */
    if (wx.hideHomeButton) wx.hideHomeButton()
    this.addressForm = this.selectComponent('#address');
    /*********地址 */
  },

  setCompanyInfo3() {
    let that = this
    serverData.setCompanyInfo3({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          company_name: res.data.data.company_name,
          contacts_scale: res.data.data.contacts_scale,
          desc: res.data.data.desc,
          open_time: res.data.data.open_time,
          telephone: res.data.data.telephone,
          type: res.data.data.type,
          province: res.data.data.province,
          city: res.data.data.city,
          district: res.data.data.district,
          head: res.data.data.head,

        })
      }
    })
  },
  setCompanyInfoThree() {
    let {head, province, city, district, company_name, contacts_scale, desc, open_time, telephone, type } = this.data
    let regtype =wx.getStorageSync("savePostion")
    serverData.setCompanyInfoThree({regtype,head, province, city, district, company_name, contacts_scale, desc, open_time, telephone, type }).then((res) => {
      if (res.data.status == 1) {
        serverData._wxTost(res.data.msg);
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      } else if (res.data.status == -1) {
        wx.showModal({
          title: '提示',
          content: '是否不修改信息',
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            } else if (res.cancel) {
            }
          }
        })
      } else {
        serverData._wxTost(res.data.msg);
      }
    })
  },
  inputCompany_name(e) {
    this.setData({
      company_name: e.detail.value
    })
  },
  inputTelephone(e) {
    this.setData({
      telephone: e.detail.value
    })
  },
  setXingzhi(e) {
    let { xingzhi } = this.data;
    this.setData({
      type: xingzhi[e.detail.value]
    })
  },
  setGuimo(e) {
    let { guimo } = this.data;
    this.setData({
      contacts_scale: guimo[e.detail.value]
    })
  },
  setSameDay(e) {
    this.setData({
      open_time: e.detail.value
    })
  },
  inputDesc(e) {
    this.setData({
      desc: e.detail.value
    })
  },
  addIdCardPic2() {                                    //头像上传1
    var _this = this
    let { head } = _this.data;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgSrc = res.tempFilePaths[0];
        serverData.uploadFile(imgSrc).then((res) => {
          var dat = JSON.parse(res.data)
          if (dat.status == 1) {
            head = dat.data
            _this.setData({
              head, isShow2: false,
            })
          }
        })
      }
    })
  },
  /***********地址开始**************** */
  tabEvent(data) {      //接收传过来的参数
    var info = data.detail
    console.log(info);
    this.setData({
      areaInfo: info.areaInfo,
      pCode: info.pCode,
      cCode: info.cCode,
      aCode: info.aCode,
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
  detil() {
    wx.navigateBack({
      delta: 1,
    });
  }
})