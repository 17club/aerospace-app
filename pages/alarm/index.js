import { request, ApiPath } from '../../utils/api'
import { dateTimeFormat, dateFormat, getTodayTimestampSecond } from '../../utils/moment'
Page({
  data: {
    navigationData: {
      title: '',
      back: true,
    },

    date: dateFormat(Date.now()),
    bus_id: '',
    alarmList: []
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
    this.fetchData(parseInt(new Date(e.detail.value).getTime()  / 1000))
  },
  async fetchData(date) {
    wx.showLoading({ title: '加载中' })
    // 测试数据
    // let data = await request(ApiPath.getBusAlarm, { bus_id: '925761341023715328', date: 1640736000}) 
    let data = await request(ApiPath.getBusAlarm, { bus_id: this.data.bus_id, date })
    data =  data.alarm_item_list.map(_v => ({
      ..._v,
      date: dateTimeFormat(_v.date * 1000)
    }))
    this.setData({
      alarmList: data,
    })
    wx.hideLoading()
  },
  onLoad: function (options) {
    this.setData({
      bus_id: options.busId,
      navigationData: {
        title: options.license_number,
        back: true,
      },
    })
    this.fetchData(getTodayTimestampSecond())
  },
  onReady: function () {

  },
  
  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },


  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})