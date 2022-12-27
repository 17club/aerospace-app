const app = getApp()
Page({
  data: {
    menuHeight: app.globalData.navigationBarData.menuHeight,
  },

  onLoad(options) {

  },
  goBack() {
    wx.navigateTo({
      url: `/pages/result/index`,
    })
  }
})