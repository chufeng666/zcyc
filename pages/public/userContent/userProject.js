import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    project: [],
    isShow: true,
    index1: '',
    checked: false,
    sameDay2: '',
    sameDay: '1991.11',
    disabled: false // 点击一次的开关
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.sameDay();
    this.initUserInfo4();// 请求数据

  },
  onShow: function (option) {
    this.setData({
      disabled: false
    })
  },
  // 当天时间
  sameDay() {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    this.setData({
      sameDay2: Y + '-' + M
    })
  },
  setSameDay(e) {
    let { index } = e.currentTarget.dataset;
    let data3 = e.detail.value
    let { project } = this.data;
    for (let i in project) {
      if (i == index) {
        project[i].data3 = data3
      }
    }
    this.setData({
      sameDay: e.detail.value,
      project
    })
  },
  setSameDay2(e) {
    let { index } = e.currentTarget.dataset;
    let data4 = e.detail.value
    let { project } = this.data;
    for (let i in project) {
      if (i == index) {
        project[i].data4 = data4
      }
    }
    this.setData({
      sameDay2: e.detail.value,
      project
    })
  },
  // 请求数据
  initUserInfo4() {
    let that = this
    ServerData.initUserInfo4({}).then((res) => {
      if (res.data.status == 1) {

        that.setData({
          project: res.data.data
        })
      }
    })
  },
  onContentChange(e) {
    let { index } = e.target.dataset
    let { project } = this.data
    project[index].data5 = e.detail.value
    this.setData({
      project
    })
  },
  addOption(e) {
    let { project, isShow } = this.data;
    if (project == null) {
      project = []
    }
    if (project.length == 2) {
      isShow = false
    }
    project.push({ data1: '', data2: '', data3: '', data4: '', data5: '' })
    this.setData({ project, isShow });
  },
  //上传数据
  initUserInfoFour() {
    let that = this
    let { project } = this.data
    for (let i in project) {
      if (project[i].data1 == '' || project[i].data1 == '') {
        return ServerData._wxTost('请填写完整的项目经验信息');
      }
    }
    that.setData({
      disabled: true
    })
    ServerData.initUserInfoFour({ project }).then((res) => {
      if (res.data.status == 1) {
        ServerData._wxTost(res.data.msg);
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      } else if (res.data.status == -1) {
        that.setData({
          disabled: true
        })
        wx.showModal({
          title: '提示',
          content: '是否不修改信息',
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            } else if (res.cancel) {
              that.setData({
                disabled: false
              })
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
    let { project } = this.data;
    for (let i in project) {
      if (i == index) {
        project[i].data1 = data1
      }
    }
    this.setData({
      corporate: e.detail.value,
      project
    })
  },
  inputGangwei(e) {
    let { index } = e.currentTarget.dataset;
    let data2 = e.detail.value
    let { project } = this.data;
    for (let i in project) {
      if (i == index) {
        project[i].data2 = data2
      }
    }
    this.setData({
      gangwei: e.detail.value,
      project
    })
  },

  deleteitem(e) {
    let that = this
    let { index } = e.currentTarget.dataset;
    let { project } = this.data;
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success(res) {
        if (res.confirm) {
          for (let i = 0; i < project.length; i++) {
            if (i == index) {
              project.splice(i, 1);
              that.setData({
                project,
                isShow: true
              })
            }
          }
        }
      }
    })
  },
  detil() {
    wx.navigateBack({
      delta: 1,
    });
  }
})