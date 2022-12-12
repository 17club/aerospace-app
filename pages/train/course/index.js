import { request, ApiPath } from '../../../utils/api'
import { toZh_cn } from './util'
import { statusEnum } from './const'
Page({
  data: {
    navigationData: {
      title: '课程',
      back: true,
    },
    list: [],
    course_employee_id: '',
    edit: true
  },
  onLoad: function (options) {
    this.setData({
      course_employee_id: options.id,
      edit: options.edit
    })
    this.fetchData()
  },
  async updateMaterial() {
    await this.fetchData()
  },
  onShow: async function () {
    await this.fetchData()
  },
  async fetchData() {
    wx.showLoading({ title: '加载中' })
    const res = await request(ApiPath.getUserRelatedMaterial, { course_employee_id: this.data.course_employee_id })
    const data = res.item_list.map((_v, index) => {
      return {
        ..._v,
        index_text: toZh_cn(index + 1),
        status_text: statusEnum[_v.status],
        edit: this.data.edit
      }
    })
    this.setData({ list: data })
    wx.hideLoading()
  },
})