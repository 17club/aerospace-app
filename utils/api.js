import { getCurrentPageUrl } from "./wx"
import Toast from '@vant/weapp/toast/toast'

export function request(url, data, method = 'POST', app = null) {
  const globalData = (app || getApp()).globalData
  const apiPath = globalData.apiPath
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${globalData.domain[globalData.env]}${apiPath}${url}`,
      data,
      dataType: 'json',
      method,
      success: res => {
        const data = res.data
          if (![ '/pages/login/login'].includes(getCurrentPageUrl()) && !globalData?.userInfo?.employeeId ) {
            wx.redirectTo({
              url: '/pages/login/login',
            })
            const msg = data?.resp?.msg
            if (msg) {
              Toast(msg)
            }
            return
          }
        resolve(res.data)
      },
      fail: res => {
        console.log('fail')
        reject(res)
      }
    })
  })
}

export const ApiPath = {
  logout: '/sys/logout',
  login: '/sys/login',
  getCaptcha: '/sys/getCaptcha',
  
  //train
  getUserRelatedCourse: 'training/get_user_related_course',
  getUserRelatedMaterial: 'training/get_user_related_material',
  updateUserRelatedMaterial: 'training/update_user_related_material',
  updateCourseEmployeeStatus: 'training/update_course_employee_status',

  //exam
  listEmployeeExamination: 'examination_wechat/list_employee_examination',
  getExamSubjectAndAnswer: 'examination_wechat/get_exam_subject_and_answer',
  subExamAnswer: 'examination_wechat/sub_exam_answer',
  getExamAnswerResult: 'examination_wechat/get_exam_answer_result',
  getSubjectAnswerDetail: 'examination_wechat/get_subject_answer_detail',
  startEmployeeExamination: 'examination_wechat/start_employee_examination',
}