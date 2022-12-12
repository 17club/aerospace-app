// pages/search/components/line/line.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sublineOnewayData: {
      type: Object,
      observer: function (newV) {
        this.initData(newV)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    subline_name: '',
    up: true,
    begin_station_name: '',
    end_station_name: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initData(sublineOnewayData) {
      this.setData({
        subline_name: sublineOnewayData.name,
        up: sublineOnewayData.name.includes('上行'),
        begin_station_name: sublineOnewayData.begin_station.name,
        end_station_name: sublineOnewayData.end_station.name,
      })
    },
    bindShowSublineOneway() {
      getApp().globalData.pageData = {
        sublineOnewayData: this.properties.sublineOnewayData
      }
      wx.redirectTo({
        url: `/pages/index/index?active=monitor`,
      })
    }
  }
})
