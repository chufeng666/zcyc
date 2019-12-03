import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    isShow: true,
    index2: 0,
    zhengshu: [
      { id: 0, name: "全部", isShow: true },
      { id: 1, name: "需要证书", isShow: false },
      { id: 2, name: "无需证书", isShow: false }
    ],
    index3: 0,
    jobArry: [],
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
    require_cert: '',
    education: '',
    work_age: '',
    salary: '',
    type: '',
  },
  onLoad: function (options) {
    this.setData({
      name: options.name,
      require_cert: options.require_cert,
      education: options.education,
      work_age: options.work_age,
      salary: options.salary,
      type: options.type,
    })
    this.changRequireCert();
    this.changEducation();
    this.changWorkAge();
    this.changSalary();
    setTimeout(() => {
      this.changType();
    }, 300);
  },
  onShow:function () {
    this.category();
  },
  // 证书
  changZhengshu(e) {
    let { index } = e.currentTarget.dataset;
    let { zhengshu } = this.data
    zhengshu.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ zhengshu, index2: index })
  },
  // 返回选定
  changRequireCert(e) {
    let { zhengshu, require_cert } = this.data;
    let complete = ServerData.forEachMoreType(zhengshu, require_cert);
    let { arr, index } = complete
    this.setData({ zhengshu: arr, index2: index })
  },
  // 一级职位
  changZhiwei(e) {
    let { index } = e.currentTarget.dataset;
    this.setData({ index3: index })
  },
  // 一级职位返回选定
  changType(e) {
    let { jobArry, type } = this.data;
    let index = 0
    for (let i in jobArry) {
      if (jobArry[i].cat_name == type) {
        index = i
      }
    }
    this.setData({ index3: index })
  },
  // 学历
  changXueli(e) {
    let { index } = e.currentTarget.dataset;
    let { xueli } = this.data
    xueli.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ xueli, index4: index })
  },
  // 学历返回选定
  changEducation(e) {
    let { xueli, education } = this.data;
    let complete = ServerData.forEachMoreType(xueli, education);
    let { arr, index } = complete
    this.setData({ xueli: arr, index4: index })
  },
  // 经验
  changJingyan(e) {
    let { index } = e.currentTarget.dataset;
    let { jingyan } = this.data;
    jingyan.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ jingyan, index5: index })
  },
  changWorkAge(e) {
    let { work_age, jingyan } = this.data;
    let complete = ServerData.forEachMoreType(jingyan, work_age);
    let { arr, index } = complete
    this.setData({ jingyan: arr, index5: index })
  },
  changXinzi(e) {
    let { index } = e.currentTarget.dataset;
    let { xinzi } = this.data;
    xinzi.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ xinzi, index6: index })
  },
  changSalary(e) {
    let { xinzi, salary } = this.data;
    let complete = ServerData.forEachMoreType(xinzi, salary);
    let { arr, index } = complete
    this.setData({ xinzi: arr, index6: index })
  },
  editTel() {
    let { index2, index3, index4, index5, index6 } = this.data
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
})