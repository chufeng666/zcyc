import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    isShow: true,
    index1: 0,
    index2: 0,
    index3: 0,
    index4: 0,
    index5: 0,
    index6: 0,
    // disanfang: [
    //   { id: 0, name: "全部", isShow: true },
    //   { id: 1, name: "企业", isShow: false },
    //   { id: 2, name: "人才", isShow: false }
    // ],
    zhengshu: [
      { id: 0, name: "全部", isShow: true },
      { id: 1, name: "有证书", isShow: false },
      { id: 2, name: "无证书", isShow: false }
    ],
    jobArry: [],
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
    xinzi: [
      { id: 0, name: "不限", isShow: true },
      { id: 1, name: "3k以下", isShow: false },
      { id: 2, name: "3 - 5k", isShow: false },
      { id: 3, name: "5 - 10k", isShow: false },
      { id: 4, name: "10 - 20k", isShow: false },
      { id: 5, name: "20 - 50k", isShow: false },
      { id: 6, name: "50k以上", isShow: false },
    ],
    // 接受传递的数据
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name
    })
    this.category();
  },
  category() {
    let arr = [];
    ServerData.category({}).then((res) => {
      if (res.data.msg == '获取成功') {
        arr.push({ cat_id: '', cat_name: "全部" })
        let jobArry = [...arr, ...res.data.data]
        this.setData({
          jobArry,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  slider4change(e) {
    let value = e.detail.value
    this.setData({
      value
    })
  },
  changIsActive(e) {
    let { index } = e.currentTarget.dataset;
    let { disanfang } = this.data
    disanfang.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ disanfang })
  },
  changZhengshu(e) {
    let { index } = e.currentTarget.dataset;
    let { zhengshu } = this.data
    zhengshu.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ zhengshu, index2: index })
  },
  changZhiwei(e) {
    let { index } = e.currentTarget.dataset;
    this.setData({ index3: index })
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
      type: this.data.jobArry[index3].cat_name,
      education: this.data.xueli[index4].name,
      work_age: this.data.jingyan[index5].name,
      salary: this.data.xinzi[index6].name,
    });
    wx.navigateBack({}); //关闭当前页面，返回上一个页面
  },
  detil() {
    wx.navigateBack({
      delta: 1
    }); //关闭当前页面，返回上一个页面
  }
})