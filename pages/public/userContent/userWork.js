import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 公司名称
    corporate: '广州万宝有限公司',
    // 职位名称
    gangwei: '安全员',
    // 当天时间
    sameDay: '请选择在职时间',
    sameDay2: '请选择在职时间',
    jingli: '1.负责落实公司各项安全规章管理制度\n2.确保项目部顺利实行安全生产工作\n3.现场检查管理工作及内场资料。',
    experience: [],   // 工作经验上传  
    isShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initUserInfo2();
    this.sameDay();
  },
  // 当天时间
  // sameDay() {
  //   var timestamp = Date.parse(new Date());
  //   var date = new Date(timestamp);
  //   //获取年份  
  //   var Y = date.getFullYear();
  //   //获取月份  
  //   var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  //   this.setData({
  //     sameDay2: Y + '.' + M
  //   })
  // },
  setSameDay(e) {
    let { index } = e.currentTarget.dataset;
    let data3 = e.detail.value
    let { experience } = this.data;
    for (let i in experience) {
      if (i == index) {
        experience[i].data3 = data3
      }
    }
    this.setData({
      sameDay: e.detail.value,
      experience
    })
  },
  setSameDay2(e) {
    let { index } = e.currentTarget.dataset;
    let data4 = e.detail.value
    let { experience } = this.data;
    for (let i in experience) {
      if (i == index) {
        experience[i].data4 = data4
      }
    }
    this.setData({
      sameDay2: e.detail.value,
      experience
    })
  },
  // 请求数据
  initUserInfo2() {
    let that = this;
    ServerData.initUserInfo2({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          experience: res.data.data
        })
      }
    })
  },
  // 上传数据
  initUserInfoTwo() {
    let { experience } = this.data
    for (let i in experience) {
      if (experience[i].data1 == '' || experience[i].data2 == '') {
        return ServerData._wxTost('请填写完整的工作经验')
      }
    }
    ServerData.initUserInfoTwo({ experience }).then((res) => {
      if (res.data.status == 1) {
        ServerData._wxTost(res.data.msg);
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
        ServerData._wxTost(res.data.msg);
      }
    })
  },
  inputCorporate(e) {
    let { index } = e.currentTarget.dataset;
    let data1 = e.detail.value
    let { experience } = this.data;
    for (let i in experience) {
      if (i == index) {
        experience[i].data1 = data1
      }
    }
    this.setData({
      corporate: e.detail.value,
      experience
    })
  },
  inputGangwei(e) {
    let { index } = e.currentTarget.dataset;
    let data2 = e.detail.value
    let { experience } = this.data;
    for (let i in experience) {
      if (i == index) {
        experience[i].data2 = data2
      }
    }
    this.setData({
      gangwei: e.detail.value,
      experience
    })
  },
  deleteitem(e) {
    let that = this
    let { index } = e.currentTarget.dataset;
    let { experience } = this.data;
    wx.showModal({
      title: '提示',
      content: '您确定要删除吗',
      success(res) {
        if (res.confirm) {
          for (let i = 0; i < experience.length; i++) {
            if (i == index) {
              experience.splice(i, 1);
              that.setData({
                experience,
                isShow: true
              })
            }
          }
        }
      }
    })
  },
  addOption(e) {
    let { experience, isShow } = this.data;
    if (experience == null) {
      experience = []
    }
    if (experience.length == 2) {
      isShow = false
    }
    experience.push({ data1: '', data2: '', data3: '', data4: '', data5: '' })
    this.setData({ experience, isShow });
  },
  onContentChange(e) {
    let { index } = e.target.dataset
    let { experience } = this.data
    experience[index].data5 = e.detail.value
    this.setData({
      experience
    })
  },
  detil() {
    wx.navigateBack({
      delta: 1,
    });
  }
})