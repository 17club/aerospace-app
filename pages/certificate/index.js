const app = getApp()
Page({
  data: {
    menuHeight: app.globalData.navigationBarData.menuHeight,
    currentType: '',
  },

  onLoad(options) {
    this.setData({
      currentType: options.type
    })
    // wx.getImageInfo({
    //   src: '../../assets/back.png',
    //   success:function(res){
    //     console.log(res.path)
    //     const ctx = wx.createCanvasContext('haibao', this)
    //     ctx.drawImage(res.path, 0, 0, 100, 100)
    //     ctx.draw()
    //   }
    // })
  },
  goBack() {
    wx.navigateTo({
      url: `/pages/result/index`,
    })
  },
  copyCode() {
    wx.setClipboardData({
      data: 'vx6548213',
      success (res) {
        wx.getClipboardData({
          success (res) {}
        })
      }
    })
  },
  saveToPhone() {
    wx.downloadFile({
      url: '',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (res) => {
            wx.showToast({
              title: '保存成功，请到相册中查看'
            });
          },
          fail: (err) => {
            wx.showToast({
              icon: 'none',
              title: '保存失败，请稍后重试'
            });
          }
        })
      }
    })
  }
})