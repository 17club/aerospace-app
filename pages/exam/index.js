import { request, ApiPath } from '../../utils/api'
import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    currentIndex: 1,
    currentSelect: true,
    currentQuestion: {},
    allQuestionList: [],

    username: '',
    answerTime: 0,
    answerEnum: {
      0: 'A',
      1: 'B',
      2: 'C',
      3: 'D'
    },

    saveLoading: false,
  },
  onLoad(options) {
    this.setData({ username: options.username })
    this.fetchData()
  },
  async fetchData() {
    wx.showLoading({
      title: '加载中',
    })
    const res = await request(ApiPath.questionList, {}, 'get')
    wx.hideLoading()
    if (res.code === 1) {
      Toast(res.msg)
      return
    }
    const allQuestionList = res.data.item_list.map((item, _index) => {
      return {
        _index: _index + 1,
        ...item,
        question_list: [item.answer_a, item.answer_b, item.answer_c, item.answer_d].map((ques, ques_index) => ({
          ques_index: ques_index + 1, 
          select: false,
          text: ques,
        })),
      }
    })
    this.setData({
      currentQuestion: allQuestionList.find((item) => item._index === this.data.currentIndex),
      answerTime: res.data.answer_times,
      allQuestionList,
    })
  },
  chooseQuestion(info) {
    const curInfo = info.currentTarget.dataset.info
    const currentData = this.data.currentQuestion
    let allQuestionList = this.data.allQuestionList

    const list = currentData.question_list.map((item) => {
      return {
        ...item,
        select: item.ques_index === curInfo.ques_index
      }
    })

    allQuestionList = allQuestionList.map(item => {
      if (item.id === currentData.id) {
        item.question_list = list
      }
      return { ...item }
    })

    this.setData({
      currentQuestion: {
        ...currentData,
        question_list: list,
      },
      allQuestionList 
    })
  },
  toPrev() {
    if (this.data.currentIndex == 1) return
    const currentIndex = --this.data.currentIndex
    this.setData({
      currentIndex,
      currentQuestion: this.data.allQuestionList.find((item) => item._index === currentIndex)
    })
  },
  toNext() {
    if (this.data.currentIndex == this.data.allQuestionList.length) return
    const currentIndex = ++this.data.currentIndex
    this.setData({
      currentIndex,
      currentQuestion: this.data.allQuestionList.find((item) => item._index === currentIndex)
    })
  },
  async toSubmit() {
    const data = this.data.allQuestionList
    const question_id_str = data.map(item => item.id).join(',')
    const answerList = data.filter(item => item.question_list.find(item => item.select)).map(item => item.question_list.find(ques => ques.select)?.ques_index).map(item => item - 1)
    const answer_str = answerList.join(',')
    if (answerList.length < data.length) {
      Toast('题目未全部答完！')
      return
    }
    this.setData({ saveLoading: true })
    const res = await request(ApiPath.questionAdd, {
      question_id_str,
      answer_str,
      name: 'zzzz'
    })
    this.setData({ saveLoading: false })
    wx.navigateTo({
      url: `/pages/result/index?username=${this.data.username}`,
    })
  }
})