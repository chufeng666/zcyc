// pages/userInfo/myPurse.js
import ServerData from '../../../utils/serverData.js';
Page({

  /**
   * 页面的初始数据
   */
	data: {
		moneyData: {},
	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		this.myPurse()
	},

	myPurse() {
		ServerData.myPurse({}).then((res) => {
			if (res.data.status == 1) {
				this.setData({
					moneyData: res.data.data
				})
			}
		})
	},
	toPays: function (e) {
		wx.showLoading({
			title: '跳转中...',
		})

		setTimeout(function () {
			wx.hideLoading()
		}, 2000)
	},
	delta() {
		let regpyte = wx.getStorageSync('savePostion')
		console.log(regpyte);
		if (regpyte == 3) {
			wx.redirectTo({
				url: '/pages/userInfo2/userCenter/userCenter'
			});//返回上一页面
		} else if (regpyte == 2) {
			wx.redirectTo({
				url: '/pages/thirdParty/thirdInfo/thirdInfo'
			});//返回上一页面
		} else {
			wx.redirectTo({
				url: '/pages/company/cUserInfo/cUserInfo'
			});//返回上一页面
		}
	}
})

