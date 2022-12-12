import { request, ApiPath } from '../../../utils/api'
import { EST_Single_Choice, EST_Multiple_Choice, EST_Judge } from '../const'
import { getAnswerType, toStringFun, curSelectList } from './util'
import Dialog from '@vant/weapp/dialog/dialog'

Page({
  data: {
    navigationData: {
      title: '查看考卷',
      back: true,
    },
    questionList: [],
    allQuestionLen: 0,
    currentIndex: 0,
    currentQuestion: {},
    EST_Single_Choice,
    EST_Multiple_Choice,
    EST_Judge,
    params: {},
    
    //答题卡
    show: false,
    unanswered: 0,
    answered: 0,
    showOverlay: false,

    examination_name: ''
  },
  onLoad: async function (options) {
    wx.showLoading({ title: '加载中' })
    this.setData({ params: { employee_id: +options.employee_id, examination_id: +options.examination_id || 40 }, examination_name: options.examination_name})
    const res = await request(ApiPath.getExamSubjectAndAnswer, this.data.params)
    let examSubjectList = res.exam_subject_list
    let employeeAnswerList = res.employee_answer_list
    examSubjectList = examSubjectList.map(item => {
      const employeeInfo = employeeAnswerList.find(employee => employee.subject_id === item.id)
      const selections =  JSON.parse(item.selections)
      const selectionList = Object.keys(selections).map(select => ({  key: select, content: selections[select], checked: employeeInfo?.employee_answer.includes(select) }))
      return {
        ...item,
        selectionList,
        employee_info: {
          ...employeeInfo,
          employee_answer_text: getAnswerType(employeeInfo?.employee_answer, item.type)
        },
        answer_text: getAnswerType(employeeInfo?.employee_answer, item.type),
        answerStr: employeeInfo?.employee_answer,
      }
    })
    this.setData({ 
      questionList: examSubjectList,
      currentQuestion: examSubjectList[this.data.currentIndex],
      allQuestionLen: examSubjectList.length,
      answered: examSubjectList.filter(item => item.answerStr).length,
      unanswered: examSubjectList.filter(item => !item.answerStr).length
    })
    wx.hideLoading()
  },
  // 上一题下一题
  next() { this.turnPage() },
  prev() { this.turnPage(false) },
  turnPage(flag = true) {
    const flagValue =  flag ? 1 : - 1
    const currentIndex = this.data.currentIndex + flagValue
    if (flag > 0 && currentIndex > this.data.allQuestionLen) return
    if (flag < 0 && currentIndex < 0) return
    this.setData({ currentQuestion: this.data.questionList[currentIndex], currentIndex })
  },
  jumpToQuestion(event) {
    const index = event.currentTarget.dataset.index
    this.setData({ currentQuestion: this.data.questionList[index], currentIndex: index, show: false  })
  },
  updateCurrentAnswer(event) {
    const currentSubjectId = this.data.currentQuestion.id
    const questionList = this.data.questionList.map(item => {
      return {
        ...item,
        selectionList: item.id === currentSubjectId ? curSelectList(event.detail, item.selectionList) : item.selectionList,
        answer_text: item.id === currentSubjectId ? event.detail : item.answer_text,
        answerStr: item.id === currentSubjectId ? toStringFun(event.detail, item.type) : item.answerStr
      }
    })
    this.setData({ 
      questionList,  
      answered: questionList.filter(item => item.answerStr).length, 
      unanswered: questionList.filter(item => !item.answerStr).length 
    })
  },
  async submitExam() {
    let objMap = {}
    this.data.questionList.forEach(item => objMap[item.id] = item.answerStr)
    let dialogParam = {
      confirmButtonColor: '#409eff', 
      cancelButtonText: '现在交卷', 
      confirmButtonText: '继续答题',
      title: this.data.unanswered ? `${this.data.unanswered}题未作答，是否提交？` : '确认提交!'
    }
    Dialog.confirm(dialogParam).then(() => {}).catch(async () => {
      await request(ApiPath.subExamAnswer, { ...this.data.params, answer_info: JSON.stringify(objMap) })
      this.setData({showOverlay: true})
    })
  },
  openAnswerCard() { this.setData({ show: true }) },
  onClose() { this.setData({ show: false, showOverlay: false }) },
  seeResult() {
    wx.navigateTo({ 
      url: `/pages/exam/result/index?employee_id=${this.data.params.employee_id}&examination_id=${this.data.params.examination_id}`
    })
  }
})