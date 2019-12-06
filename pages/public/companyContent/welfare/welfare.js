import ServerData from '../../../../utils/serverData.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    daiyu: [],
    isActive: false,
    daiyu1: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setCompanyDaiyu()
  },
  setCompanyDaiyu() {
    let that = this
    ServerData.setCompanyDaiyu({}).then((res) => {
      if (res.data.status == 1) {
        that.setData({
          daiyu: res.data.data
        })
      }
    })
  },
  addDaiyu: function (e) {
    var index = e.currentTarget.dataset.index;
    let { daiyu } = this.data
    var item = daiyu[index];
    let arr = []; // 申明的变量
    let gg = [];
    // 样式取反
    item.checd = !item.checd;
    // 把daiyu数组里面取反的值赋值到新的数组里面
    for (let i in daiyu) {
      if (daiyu[i].checd == true) {
        if (arr.length < 3) { // 数组长度大于3不执行 小于等于三执行
          arr.push(daiyu[i].name); // 循环点击将选中的参数保存在数组
        } else {
          for (let i in arr) {
            if (daiyu[i].name != arr[i]) {
              daiyu[i].checd = false;
            }
          }
          return ServerData._wxTost('最多只能选择3个')
        }
      }
    }
    this.setData({
      daiyu,
      daiyu1: arr
    });
  },
  editTel() {
    let { daiyu1 } = this.data
    let pages = getCurrentPages(); //获取上一个页面信息栈(a页面)
    let prevPage = pages[pages.length - 2] //给上一页面的tel赋值
    prevPage.setData({
      welfare: daiyu1
    });
    wx.navigateBack({}); //关闭当前页面，返回上一个页面
  },
  onUnload: function () {
    wx.redirectTo({
      url: '../../../jobList/editJobList',//指定界面
    })
  },
  detil() {
    wx.navigateBack({
      delta: 1,
    });
  }
})