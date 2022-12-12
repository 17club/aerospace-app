import { request, ApiPath } from '../../../../utils/api'
Component({
  properties: {
    info: {
      type: Object,
      default: () => {}
    },
    curTime: {
      type: Number,
      default: null,
    }
  },
  methods: {
    toJump(e) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/train/course/index?id=${id}&edit=1`,
      })
    },
    toDetail(e) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: `/pages/train/course/index?id=${id}&edit=0`,
      })
    },
    toStudy(e) {
      const id = e.currentTarget.dataset.id
      const that = this
      wx.showModal({
        title: '是否开始学习',
        success (res) {
          if (res.confirm) {
            request(ApiPath.updateCourseEmployeeStatus, {
              course_employee_id: id,
              status: 2
            }).then(() => {
              that.triggerEvent('updatecourse')
              wx.navigateTo({
                url: `/pages/train/course/index?id=${id}`,
              })
            })
          }
        }
      })
    }
  }
})
