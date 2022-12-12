import { request, ApiPath } from '../../../utils/api'
import { getAnswerType } from '../util'

Page({
  data: {
    navigationData: {
      title: '查看试卷',
      back: true,
    },
    params: {},

    show: false,
    isLog: true,
  },
  onLoad: async function (options) {
    this.setData({
      params: {
        employee_id: +options.employee_id,
        examination_id: +options.examination_id
      }
    })
    const examRes = await request(ApiPath.getExamAnswerResult, this.data.params)
    let employeeAnswerList = examRes.employee_answer_list
    let examSubjectList = examRes.exam_subject_list
    examSubjectList = examSubjectList.map(item => {
      const employeeInfo = employeeAnswerList.find(employee => employee.subject_id === item.id)
      const selections = JSON.parse(item.selections)
      const selectionList = Object.keys(selections).map(select => ({  key: select, content: selections[select], checked: employeeInfo?.employee_answer.includes(select) }))
      return { 
        ...item,
        employee_info: employeeInfo,
        selectionList,
        answerStr: employeeInfo?.employee_answer,
        answer_text: getAnswerType(employeeInfo?.employee_answer, item.type),
      }
    })
    const finishQuestion =  examSubjectList.filter(item => item.answerStr)
    const allLen = finishQuestion.length
    const successAnswser = finishQuestion.filter(item => item.answer == item.answerStr)
    this.setData({ 
      currentQuestion: examSubjectList[0],
      index: 1,
      examSubjectList,
      successAnswserCount: successAnswser.length,
      errorAnswserCount: allLen - successAnswser
    })
  },

  jumpToQuestion(event) {
    const index = event.currentTarget.dataset.index
    const currentQuestion = this.data.examSubjectList[index]
    this.setData({ currentQuestion, index: index + 1 })
    this.onClose()
  },

  openAnswerCard() { this.setData({ show: true }) },
  onClose() { this.setData({ show: false, showOverlay: false }) },
})