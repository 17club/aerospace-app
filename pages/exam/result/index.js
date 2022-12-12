import { request, ApiPath } from '../../../utils/api'
Page({
  data: {
    navigationData: {
      title: '考试结果',
      back: true,
    },
    params: {},
    questionList: [],
    correct: 0,
    unanswered: 0,
    wrong: 0,
    totalScore: 0,
  },
  onLoad: async function (options) {
    this.setData({
      params: {  employee_id: +options.employee_id,  examination_id: +options.examination_id }
    })
    const res = await request(ApiPath.getExamAnswerResult, this.data.params)
    const employeeExamResult = res.employee_exam_result
    const examSubjectList = res.exam_subject_list
    const employeeAnswerList = res.employee_answer_list

    const allLen = examSubjectList.length
    const answerLen = employeeAnswerList.length
    let totalScore = 0
    let resultList = examSubjectList.map(item => {
      const currentEmployeeInfo = employeeAnswerList.find(employee => employee.subject_id === item.id)
      console.log(currentEmployeeInfo, 'currentEmployeeInfo')
      
      totalScore += (item.answer === currentEmployeeInfo?.employee_answer ? item.score : 0)
      return {
        ...item,
        currentEmployeeInfo,
        employee_result: employeeExamResult,
        isCorrect: currentEmployeeInfo ?.employee_answer ? (item.answer === currentEmployeeInfo?.employee_answer ? 'true' : 'false') : ''
      }
    })
    const correct = resultList.filter(item => item.isCorrect === 'true').length
    const wrong = resultList.filter(item => item.isCorrect === 'false').length
    this.setData({
      unanswered: allLen - answerLen,
      correct,
      wrong,
      totalScore,
      resultList
    })
  },
  tryAgain() {
    wx.navigateTo({ url: `/pages/exam/question/index?employee_id=${this.data.params.employee_id}&examination_id=${this.data.params.examination_id}` })
  },
  seeLog() {
    wx.navigateTo({ url: `/pages/exam/log/index?employee_id=${this.data.params.employee_id}&examination_id=${this.data.params.examination_id}` })
  }
})