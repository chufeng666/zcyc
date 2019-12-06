import ServerData from '../../../utils/serverData.js';
Component({
  data: {
    animation: '',
    value: [0, 0],
    careerss: [],     // 岗位
    intention: [],   // 职位
    job_careers: '',
    job_intention: '',
    job_type: 0,     //职位id
    isShow: false,
    status: ''
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持  
  },
  properties: {
    addressMenuIsShow: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    showPopup() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    // 执行动画
    startAddressAnimation: function (isShow) {
      var that = this
      if (isShow) {
        that.data.animation.translateY(0 + 'vh').step()
      } else {
        that.data.animation.translateY(40 + 'vh').step()
      }
      that.setData({
        animationAddressMenu: that.data.animation.export(),
        addressMenuIsShow: isShow,
      })
    },
    // 点击职位选择取消按钮
    occupationalCancel: function (e) {
      this.startAddressAnimation(false)
      this.showPopup()
      var json = {
        job_careers: '',
        job_intention: '',
        isShow: true
      }
      this.triggerEvent('tabEvent1', json)
    },

    // 点击职位选择确定按钮
    occupationalSure: function (e) {
      var that = this
      that.startAddressAnimation(false)
      that.setData({
        job_careers: that.data.job_careers,
        job_intention: that.data.job_intention,
        job_type: that.data.job_intention.cat_id,
      })
      this.showPopup()
      var json = {
        job_careers: that.data.job_careers.cat_name,
        job_intention: that.data.job_intention.cat_name,
        job_type: that.data.job_intention.cat_id,
        intention: that.data.intention,
        money: that.data.job_careers.money,
        isShow: false
      }
      this.triggerEvent('tabEvent1', json)
    },

    // 处理职位联动逻辑
    occupationalChange: function (e) {
      var value = e.detail.value
      var provinceNum = value[0]
      var cityNum = value[1]
      if (this.data.value[0] != provinceNum) {
        this.intention(provinceNum, 0);
        this.setData({
          value: [provinceNum, 0]
        })
      } else {
        this.intention(provinceNum, cityNum);
        this.setData({
          value: [provinceNum, cityNum]
        })
      }
    },
    intention(code, index) {
      let that = this
      ServerData.categoryList({}).then((res) => {
        if (res.data.status == 1) {
          that.setData({
            intention: res.data.data,
            job_intention: res.data.data[that.data.value[0]]
          })
          that.careers(res.data.data[code].cat_id, index);
        } else {
          ServerData._wxTost(res.data.msg)
        }
      })
    },
    careers(code, index) {
      let that = this
      ServerData.categoryList({ pid: code }).then((res) => {
        if (res.data.status == 1) {
          that.setData({
            careerss: res.data.data,
            job_careers: res.data.data[that.data.value[1]]
          })
        } else if (res.data.status == -2) {
          that.setData({
            careerss: '',
          })
        }
      })
    }
  },
  attached() {
    this.setData({
      animation: wx.createAnimation({
        duration: 500,
        transformOrigin: "50% 50%",
        timingFunction: 'ease',
      })
    })
    this.intention(0, 0)
  }
})