// pages/thirdParty/ScreeningConditions/ScreeningConditions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    isShow: true,
    disanfang: [
      { id: 0, name: "全部", isShow: true },
      { id: 1, name: "企业", isShow: false },
      { id: 2, name: "服务商", isShow: false }
    ],
    zhengshu: [
      { id: 0, name: "全部", isShow: true },
      { id: 1, name: "需要证书", isShow: false },
      { id: 2, name: "无须证书", isShow: false }
    ],
    zhiwei: [
      { id: 0, name: "全部", isShow: true },
      { id: 1, name: "一级建造师", isShow: false },
      { id: 2, name: "二级建造师", isShow: false },
      { id: 3, name: "造价评审师", isShow: false },
      { id: 4, name: "电器", isShow: false },
      { id: 5, name: "土木工程", isShow: false },
      { id: 6, name: "建筑工程", isShow: false },
    ],
    xueli: [
      { id: 0, name: "全部", isShow: true },
      { id: 1, name: "初中及以下", isShow: false },
      { id: 2, name: "高中", isShow: false },
      { id: 3, name: "中专", isShow: false },
      { id: 4, name: "大专", isShow: false },
      { id: 5, name: "本科", isShow: false },
      { id: 6, name: "硕士", isShow: false },
      { id: 7, name: "博士", isShow: false }
    ],
    jingyan: [
      { id: 0, name: "全部", isShow: true },
      { id: 1, name: "在校生", isShow: false },
      { id: 2, name: "应届生", isShow: false },
      { id: 3, name: "1年以内", isShow: false },
      { id: 4, name: "1-3年", isShow: false },
      { id: 5, name: "3-5年", isShow: false },
      { id: 6, name: "5-10年", isShow: false },
      { id: 7, name: "10年以上", isShow: false }
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

  },
  slider4change (e) {
    let value = e.detail.value
    this.setData({
      value
    })
  },
  changIsActive (e) {
    let { index } = e.currentTarget.dataset;
    let { disanfang } = this.data
    disanfang.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ disanfang })
  },
  changZhengshu (e) {
    let { index } = e.currentTarget.dataset;
    let { zhengshu } = this.data
    zhengshu.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ zhengshu })
  },
  changZhiwei (e) {
    let { index } = e.currentTarget.dataset;
    let { zhiwei } = this.data
    zhiwei.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ zhiwei })
  },
  changXueli (e) {
    let { index } = e.currentTarget.dataset;
    let { xueli } = this.data
    xueli.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ xueli })
  },
  changJingyan (e) {
    let { index } = e.currentTarget.dataset;
    let { jingyan } = this.data;
    jingyan.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ jingyan })
  }
})