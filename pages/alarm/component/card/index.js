Component({
  properties: {
    info: {
      type: Object,
      default: () => {}
    },
  },
  observers: {
    'info': function (val) {
      if (!val) return
      if (val.urls[0].match(/\.(png|jpe?g|gif|svg)(\?.*)?$/)) {
        this.setData({
          image:true
        })
      } else {
        this.setData({
          image:false
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    image:true
  },

  methods: {
    onCardClicked(e) {
      const data = JSON.stringify(e.currentTarget.dataset.info)
      wx.navigateTo({
        url: `/pages/alarm-detail/index?info=${data}`,
      })
    }
  }
})
