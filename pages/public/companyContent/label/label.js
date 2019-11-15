import serverData from "../../../../utils/serverData";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    label: [],
    value: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setCompanyInfo1();
  },
  setCompanyInfo1() {
    let that = this
    serverData.setCompanyInfo1({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          label: res.data.data
        })
      }
    })
  },
  setCompanyInfoOne() {
    let { label } = this.data;
    serverData.setCompanyInfoOne({ label }).then((res) => {
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
  inputBiaoqian(e) {
    this.setData({
      value: e.detail.value
    })
  },
  addBiaoqian() {
    let { value, label } = this.data
    if (value == '') {
      return serverData._wxTost('请输入行业标签')
    }
    if (label == null) {
      label = []
    }
    if (label.length <= 2) {
      label.push(value)
    } else {
      serverData._wxTost('最多添加三个')
    }
    value = ''
    this.setData({
      label,value

    })
  },
  deletBiaoqian(e) {
    let { index } = e.target.dataset;
    let { label } = this.data
    for (let i in label) {
      if (i == index) {
        label.splice(i, 1)
        this.setData({
          label
        })
      }
    }
  }
})