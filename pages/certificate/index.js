const app = getApp()
Page({
  data: {
    navBarHeight: app.globalData.navigationBarData.navBarHeight,
    currentType: '',

    canvas: '',

    username: '',
  },

  onLoad(options) {
    console.log(options, 222)
    this.setData({
      currentType: options.type || 'success',
      username: options.username
    })
    
    wx.createSelectorQuery()
    .select('#myCanvas')
    .fields({ node: true, size: true })
    .exec((res) => {
        // Canvas 对象
        const canvas = res[0].node
        this.canvas = canvas
        // 渲染上下文
        const ctx = canvas.getContext('2d')

        // Canvas 画布的实际绘制宽高
        const width = res[0].width
        const height = res[0].height
        
        // 初始化画布大小
        const dpr = wx.getWindowInfo().pixelRatio
        canvas.width = width * dpr
        canvas.height = height * dpr
        ctx.scale(dpr, dpr)
        
        const image = canvas.createImage()
        image.onload = () => { 
          ctx.drawImage(image, -7, 0, 310, 310)
          ctx.strokeStyle = "#000"
          ctx.font = '10px';
          const username = this.data.username
          const isAllLetter = username.match(/^[a-zA-Z]+$/)
          if ((isAllLetter && username.length > 13) || (!isAllLetter && username.length > 7)) {
            ctx.strokeText(username, 90, 130)
          } else {
            ctx.strokeText(username, 90, 145)
          }
       }
        image.src = '../../assets/book.png'
        
    })
  },

  goBack() {
    wx.navigateTo({
      url: `/pages/result/index`,
    })
  },
  copyCode() {
    wx.setClipboardData({
      data: 'hangtiansn',
      success () {
        wx.getClipboardData({
          success (res) {}
        })
      }
    })
  },
  saveToPhone() {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 300,
      height: 310,
      canvas: this.canvas,
      success:function(res) {
        let img = res.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: img,
          success() {
            wx.showToast({
              title:'保存成功',
              icon: 'none',
              duration: 1000
            });
          },
          fail() {
            wx.showToast({
              title: '相册未授权',
              icon: 'none',
              duration: 2000
            })
          }
        })
      },
      fail: function(e) {
        console.log(3, e)
      }
    })
  }
})