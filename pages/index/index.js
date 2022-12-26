// pages/index/index.js
Page({
  data: {

  },
  goBack() {
    wx.navigateTo({
      url: `/pages/login/login`,
    })
  },
  toConfirm() {
    wx.navigateTo({
      url: `/pages/exam/index`,
    })
  }
})