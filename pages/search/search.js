// pages/search/search.js
import { request, ApiPath } from '../../utils/api'
import { dateTimeFormat } from '../../utils/moment'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationData: {
      search: {
        placeholder: '搜索',
      }
    },
    busList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  async onSearch({ detail }) {
    const busRes = await request(ApiPath.getBus, { name: detail.key })
    if ((!busRes.bus_item || !busRes.bus_item.length)) {
      wx.showToast({
        title: '无结果',
      })
      return
    }
    const busList = busRes.bus_item.map(bus => {
      return {
        bus_id: bus.id,
        license_number: bus.license_number,
        sys_number: bus.sys_number,
        terminal_id: bus.terminal_id,
        subline_name: bus.subline_name,
        longitude: bus?.location?.longitude ?? 0,
        latitude: bus?.location?.latitude ?? 0,
        driver_name: bus.driver_name,
        last_online_time_str: dateTimeFormat(bus.last_time * 1000),
        online: bus.is_online,
        location_name: bus.location_name,
      }
    })

    this.setData({
      busList,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})