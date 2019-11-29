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
    disanfang: [
      { id: 0, name: "全部", isShow: true },
      { id: 1, name: "服务商", isShow: false },
      { id: 2, name: "个人", isShow: false }
    ],
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
    name: '',
    require_cert: '',
    job_intention: '',
    school_type: '',
    work_age: '',
    salary: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      require_cert: options.require_cert,
      job_intention: options.job_intention,
      school_type: options.school_type,
      work_age: options.work_age,
      salary: options.salary,
    })
    // this.category();
    // 返回选定
    this.changRequireCert();
    this.changWorkAge();
    this.changSalary();
    // 招人页面返回参数选定
    this.changSchoolType();
    setTimeout(() => {
      this.changJobIntention();
    }, 300);

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.category();
  },
  //一级职位的请求
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
  // 证书
  changZhengshu(e) {
    let { index } = e.currentTarget.dataset;
    let { zhengshu } = this.data
    zhengshu.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ zhengshu, index2: index })
  },
  //证书返回选定
  changRequireCert(e) {
    let { zhengshu, require_cert } = this.data;
    this.forEach(zhengshu, require_cert)
    this.setData({ zhengshu })
  },
  // 一级职位
  changZhiwei(e) {
    let { index } = e.currentTarget.dataset;
    this.setData({ index3: index })
  },
  // 一级职位返回选定(招人页面)
  changJobIntention(e) {
    let index = 0;
    let { job_intention, jobArry } = this.data
    console.log(job_intention,jobArry);
    for (let i in jobArry) {
      console.log('111111111111111');
      if (jobArry[i].cat_name == job_intention) {
        console.log(jobArry[i].cat_name);
        console.log(job_intention);
        console.log(i);
        index = i;
      }
    }
    console.log(index);
    this.setData({ index3: index })
  },

  // 学历
  changXueli(e) {
    let { index } = e.currentTarget.dataset;
    let { xueli } = this.data
    xueli.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ xueli, index4: index })
  },
  // 学历返回选定(招人页面)
  changSchoolType() {
    let { xueli, school_type } = this.data;
    this.forEach(xueli, school_type)
    this.setData({ xueli })
  },
  //经验
  changJingyan(e) {
    let { index } = e.currentTarget.dataset;
    let { jingyan } = this.data;
    jingyan.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ jingyan, index5: index })
  },
  //经验返回选定
  changWorkAge(e) {
    let { jingyan, work_age } = this.data;
    this.forEach(jingyan, work_age)
    this.setData({ jingyan })
  },
  // 薪资
  changXinzi(e) {
    let { index } = e.currentTarget.dataset;
    let { xinzi } = this.data;
    xinzi.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
    this.setData({ xinzi, index6: index })
  },
  // 薪资返回选定
  changSalary(e) {
    let { xinzi, salary } = this.data;
    this.forEach(xinzi, salary)
    this.setData({ xinzi })
  },
  // 点击确定将数据返回给上一个页面
  editTel() {
    let { index1, index2, index3, index4, index5, index6, name } = this.data
    let pages = getCurrentPages(); //获取上一个页面信息栈(a页面)
    let prevPage = pages[pages.length - 2] //给上一页面的tel赋值
    if (name == '招人') {
      prevPage.setData({
        require_cert: this.data.zhengshu[index2].name,
        job_intention: this.data.jobArry[index3].cat_name,
        school_type: this.data.xueli[index4].name,
        work_age: this.data.jingyan[index5].name,
        salary: this.data.xinzi[index6].name,
      });
    } else {
      prevPage.setData({
        require_cert: this.data.zhengshu[index2].name,
        type: this.data.jobArry[index3].cat_name,
        education: this.data.xueli[index4].name,
        work_age: this.data.jingyan[index5].name,
        salary: this.data.xinzi[index6].name,
      });
    }
    wx.navigateBack({}); //关闭当前页面，返回上一个页面
  },
  fanhui() {
    wx.navigateBack({
      delta: 1
    }); //关闭当前页面，返回上一个页面
  },
  // 返回选定封装方法
  forEach(arr, type) {
    let index = 0
    for (let i in arr) {
      if (arr[i].name == type) {
        index = i;
      }
    }
    for (let i in arr) {
      if (index === i) {
        arr[i].isShow = true;
      } else if (index != i) {
        arr[i].isShow = false;
      }
    }
  }
})