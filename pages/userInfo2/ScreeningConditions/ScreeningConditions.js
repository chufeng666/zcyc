// pages/userInfo2/ScreeningConditions/ScreeningConditions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    isShow: true,
    index1: 0,
    disanfang: [
      { id: 0, name: "全部", isShow: true },
      { id: 1, name: "企业", isShow: false },
      { id: 2, name: "服务商", isShow: false }
    ],
    index2: 0,
    zhengshu: [
      { id: 0, name: "全部", isShow: true },
      { id: 1, name: "需要证书", isShow: false },
      { id: 2, name: "无需证书", isShow: false }
    ],
    index3: 0,
    zhiwei: [
      { id: 0, name: "全部", isShow: true },
      { id: 1, name: "一级建造师", isShow: false },
      { id: 2, name: "二级建造师", isShow: false },
      { id: 3, name: "造价评审师", isShow: false },
      { id: 4, name: "电器", isShow: false },
      { id: 5, name: "土木工程", isShow: false },
      { id: 6, name: "建筑工程", isShow: false },
    ],
    index4: 0,
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
    index5: 0,
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
    index6: 0,
    xinzi: [
      { id: 0, name: "不限", isShow: true },
      { id: 1, name: "3k以下", isShow: false },
      { id: 2, name: "3 - 5k", isShow: false },
      { id: 3, name: "5 - 10k", isShow: false },
      { id: 4, name: "10 - 20k", isShow: false },
      { id: 5, name: "20 - 50k", isShow: false },
      { id: 6, name: "50k以上", isShow: false },
    ],
  },
  changIsActive(e) {
    let { index } = e.currentTarget.dataset;
    let { disanfang } = this.data
    disanfang.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ disanfang, index1: index })
  },
  changZhengshu(e) {
    let { index } = e.currentTarget.dataset;
    let { zhengshu } = this.data
    zhengshu.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ zhengshu, index2: index })
  },
  changZhiwei(e) {
    let { index } = e.currentTarget.dataset;
    let { zhiwei } = this.data
    zhiwei.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ zhiwei, index3: index })
  },
  changXueli(e) {
    let { index } = e.currentTarget.dataset;
    let { xueli } = this.data
    xueli.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ xueli, index4: index })
  },
  changJingyan(e) {
    let { index } = e.currentTarget.dataset;
    let { jingyan } = this.data;
    jingyan.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ jingyan, index5: index })
  },
  changXinzi(e) {
    let { index } = e.currentTarget.dataset;
    let { xinzi } = this.data;
    xinzi.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ xinzi, index6: index })
  },
  editTel() {
    let { index1, index2, index3, index4, index5, index6 } = this.data
    let pages = getCurrentPages(); //获取上一个页面信息栈(a页面)
    let prevPage = pages[pages.length - 2] //给上一页面的tel赋值
    prevPage.setData({
      require_cert: this.data.zhengshu[index2].name,
      type: this.data.zhiwei[index3].name,
      education: this.data.xueli[index4].name,
      work_age: this.data.jingyan[index5].name,
      salary: this.data.xinzi[index6].name,
    });
    wx.navigateBack({}); //关闭当前页面，返回上一个页面
  },
})