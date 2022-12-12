import { request, ApiPath } from '../../../utils/api'
import { dateTimeFormat, getNowTimestampSecond } from '../../../utils/moment'
Page({
  data: {
    navigationData: {
      title: '考试列表',
      back: true,
    },
    tabList: [
      {  value: 0,
         label: '全部',
      },
      {  value: 1,
         label: '未开始',
      },
      {  value: 2,
         label: '进行中',
      },
      {  value: 3,
         label: '已完成',
      },
    ],
    tabIndex: 0,
    courseList: [],
    curTime: getNowTimestampSecond() * 1000
  },
  onLoad: async function () {
    await this.fetchData()
  },
  async updateCourse() {
    await this.fetchData()
  },
  async fetchData(status = 0) {
    wx.pageScrollTo({ scrollTop: 0 })
    wx.showLoading({ title: '加载中' })
    const res = await request(ApiPath.listEmployeeExamination, {
      employee_id: getApp().globalData.userInfo.employeeId,
      status,
    })
    const data = (res.examination_answer || []).map(_v => {
      return {
        ..._v,
        begin_time: +_v.examination.start_time,
        begin_time_text: dateTimeFormat(+_v.examination.start_time),
        end_time: +_v.examination.end_time,
        end_time_text: dateTimeFormat(+_v.examination.end_time),
        cur_status: status
      }
    })
    this.setData({
      courseList: data,
      tabIndex: status,
    })
    wx.hideLoading()
  },
  tabChange: function (e) {
    this.setData({ tabIndex: e.detail  })
    this.fetchData(e.detail)
  },
  onShow: async function () {
    await this.fetchData()
  },
})