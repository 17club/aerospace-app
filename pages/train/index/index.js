import { request, ApiPath } from '../../../utils/api'
import { dateTimeFormat, getNowTimestampSecond } from '../../../utils/moment'
Page({
  data: {
    navigationData: {
      title: '课程培训',
      back: true,
    },
    tabList: [
      {  value: 0,
         label: '全部',
      },
      {  value: 1,
         label: '未学习',
      },
      {  value: 2,
         label: '学习中',
      },
      {  value: 3,
         label: '已完成',
      },
    ],
    tabIndex: 0,
    courseList: [],
    originList: [],
    curTime: getNowTimestampSecond() * 1000
  },
  onLoad: async function () {
    await this.fetchData()
  },
  async updateCourse() {
    await this.fetchData()
  },
  async fetchData() {
    wx.showLoading({ title: '加载中' })
    const res = await request(ApiPath.getUserRelatedCourse, {
      employee_id: getApp().globalData.userInfo.employeeId
    })
    const data = (res.item_list || []).map(_v => {
      const currentTime = new Date().getTime()
      return {
        ..._v,
        begin_time: +_v.begin_time,
        begin_time_text: dateTimeFormat(+_v.begin_time),
        end_time_text: dateTimeFormat(+_v.end_time),
        status: currentTime > _v.end_time ? 3 : _v.status
      }
    })
    this.setData({
      courseList: this.data.tabIndex === 0 ? data : data.filter(_v => _v.status === this.data.tabIndex),
      originList: data,
    })
    wx.hideLoading()
  },
  tabChange: function (e) {
    const courseList = this.data.originList
    this.setData({
      tabIndex: e.detail,
      courseList: e.detail == 0 ? courseList : courseList.filter(_v => _v.status == e.detail)
    })
    wx.pageScrollTo({ scrollTop: 0 })
  },
  onShow: async function () {
    await this.fetchData()
  },
})