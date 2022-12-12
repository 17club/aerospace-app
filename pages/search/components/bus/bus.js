// pages/search/components/bus/bus.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    busData: {
      type: Object,
      observer: function (newV) {
        this.setData({
          license_number: newV.license_number,
          online: newV?.online ?? newV.is_online,
          subline_name: newV.subline_name,
          location_name: newV.location_name,
          driver_name: newV.driver_name,
          last_online_time_str: newV.last_online_time_str,
          show_third: !!newV.show_third,
        })
      }
    },
    showButton: {
      type: Boolean,
    },
    preventClick: {
      type: Boolean,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    license_number: '',
    online: true,
    subline_name: '',
    location_name: '',
    driver_name: '',
    last_online_time_str: '',
    show_third: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindShowBus() {
      if (this.properties.preventClick) return
      const bus = encodeURIComponent(JSON.stringify(this.properties.busData))
      wx.redirectTo({
        url: `/pages/index/index?active=monitor&bus=${bus}`,
      })
    },
    onAlarmClicked() {
      const busId = this.properties.busData.bus_id
      const license_number = this.properties.busData.license_number
      wx.navigateTo({
        url: `/pages/alarm/index?busId=${busId}&license_number=${license_number}`,
      })
    },
    onLiveClicked() {
      return
      if (!this.checkBusOnlineStatus()) {
        return
      }
      const bus = encodeURIComponent(JSON.stringify(this.properties.busData))
      wx.navigateTo({
        url: `/pages/index/index?active=monitor&bus=${bus}&preventBusClick=true&showTopLeftPannel=false&showLivePannel=true&bottomPannelPosition=top`,
      })
    },
    onMessageClicked() {
      if (!this.checkBusOnlineStatus()) {
        return
      }
      const bus = encodeURIComponent(JSON.stringify(this.properties.busData))
      wx.navigateTo({
        url: `/pages/index/index?active=monitor&bus=${bus}&preventBusClick=true&showTopLeftPannel=false&showMessagePannel=true&bottomPannelPosition=top`,
      })
    },
    checkBusOnlineStatus() {
      if (!this.data.online) {
        // wx.showToast({
        //   title: '车辆不在线',
        // })
        return false
      }
      return true
    }
  }
})
