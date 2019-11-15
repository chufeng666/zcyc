import serverData from "../../../../utils/serverData";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seniority: [],
    isShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setCompanyInfo6();
  },
  setCompanyInfo6() {
    let that = this,
      { isShow } = that.data
    serverData.setCompanyInfo6({}).then((res) => {
      if (res.data.status == 1) {
        if (res.data.data.length === 3) {
          isShow = false
        } else {
          isShow = true
        }
        that.setData({
          seniority: res.data.data,
          isShow
        })
      }
    })
  },
  setCompanyInfoSix() {
    let { seniority } = this.data
    for(let i in  seniority ) {
      if(seniority[i] == '') {
        // seniority.splice(i,1)
        return serverData._wxTost('请输入公司资质')
      }
    }
    serverData.setCompanyInfoSix({ seniority }).then((res) => {
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
  inputSeniority(e) {
    let { index } = e.target.dataset;
    let { seniority } = this.data;
    let value = e.detail.value
    seniority[index] = value
    this.setData({
      seniority
    })
  },
  addSeniority(e) {
    let { seniority, isShow } = this.data;
    if (seniority == null) {
      seniority = []
    } else if (seniority.length === 2) {
      isShow = false
      serverData._wxTost("最多添加三个")
    }
    seniority.push('');
    this.setData({
      seniority,
      isShow
    })
  },
  deleteitem(e) {
    let that = this
    let { index } = e.currentTarget.dataset;
    let { seniority } = this.data;
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success(res) {
        if (res.confirm) {
          for (let i = 0; i < seniority.length; i++) {
            if (i == index) {
              seniority.splice(i, 1);
              that.setData({
                seniority,
                isShow: true
              })
            }
          }
        }
      }
    })
  },
})