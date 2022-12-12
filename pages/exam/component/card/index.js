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
      const info = e.currentTarget.dataset.info
      wx.navigateTo({
        url: `/pages/exam/question/index?employee_id=${info.exam_employee.employee_id}&examination_id=${info.examination.id}`,
      })
    },
    toStudy(e) {
      const info = e.currentTarget.dataset.info
      const that = this
      wx.showModal({
        title: '是否开始考试',
        success(res) {
          if (res.confirm) {
           that.startExam(info)
          }
        }
      })
    },
    async startExam(info) {
      const res = await request(ApiPath.startEmployeeExamination, { exam_employee_id: info.exam_employee.id })
      if (res?.errorCode || res?.rsp?.code == '1') {
        wx.showToast({ title: res.errorMsg || res?.rsp.msg, icon: 'none' });
        return 
      }
      wx.navigateTo({
        url: `/pages/exam/question/index?employee_id=${info.exam_employee.employee_id}&examination_id=${info.examination.id}&examination_name=${info.examination.name}`,
      })
    },
    toLog(e) {
      const info = e.currentTarget.dataset.info
      wx.navigateTo({ url: `/pages/exam/result/index?examination_id=${info.examination.id}&employee_id=${info.exam_employee.employee_id}` })
    },
    toExam(e) {
      const info = e.currentTarget.dataset.info
      wx.navigateTo({ url: `/pages/exam/question/index?examination_id=${info.examination.id}&employee_id=${info.exam_employee.employee_id}` })
    }
  }
})
