Page({
  data: {
    navigationData: {
      title: '',
      back: true,
    },
    info: {}
  },
  onLoad: function (options) {
    let data = JSON.parse(options.info)
    let urls = data.urls.map(_img => ({
      url: _img,
      is_image: _img.match(/\.(png|jpe?g|gif|svg)(\?.*)?$/) ? true : false
    }))
    data = {
      ...data,
      urls
    }
    this.setData({
      info: data,
      markers: [{
        latitude:  data.location.latitude,
        longitude: data.location.longitude,
        iconPath: '/assets/tip.svg',
        width: 30,
        height: 30,
        callout: {
          content: data.alarm_name,
          color: '#333',
          fontSize: 12,
          borderWidth: 0,
          borderRadius: 8,
          borderColor: '#000000',
          bgColor: '#fff',
          padding: 8,
          display: 'ALWAYS',
          textAlign: 'center'
        },
        polyline: [{
          points: [
            {
              longitude: data.location.longitude,
              latitude: data.location.latitude,
            }
          ],
          color: "#0066FF",
          width: 2,
          dottedLine: false,
        }]
      }],
      navigationData: {
        title: data.license_number,
        back: true,
      },
    })
  },
  imagePreview(e) {
    let currentUrl = e.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, 
      urls: this.data.info.urls.map(_v => _v.url)
    })
  }
})