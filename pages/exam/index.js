import { request, ApiPath } from '../../utils/api'
import Toast from '@vant/weapp/toast/toast';
const app = getApp()

Page({
  data: {
    currentIndex: 1,
    currentSelect: true,
    currentQuestion: {},
    allQuestionList: [],

    navBarHeight: app.globalData.navigationBarData.navBarHeight,

    username: '',
    answerTime: 0,
    answerEnum: {
      0: 'A',
      1: 'B',
      2: 'C',
      3: 'D'
    },

    saveLoading: false,
    tryAgain: false,
  },
  onLoad(options) {
    this.setData({ username: options.username, tryAgain: options.tryAgain || false })
    this.fetchData()
  },
  async fetchData() {
    wx.showLoading({
      title: '加载中',
    })
    if (!getApp().globalData?.userInfo?.token) {
      wx.redirectTo({ url: '/pages/login/login'})
      return
    }
    await this.getResult()
    const res = await request(ApiPath.questionList, {}, 'get')
    wx.hideLoading()
    if (res.code === 1 && res.msg != '登录失败') {
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
    await request(ApiPath.questionAdd, {
      question_id_str,
      answer_str,
      name: this.data.username
    })

    this.getResult()
  },
  async getResult() {
    const questionRes = await request(ApiPath.questionResult, {}, 'get')
    if (questionRes.msg === '登录失败') {
      wx.navigateTo({ url: `/pages/login/login` })
      return
    }
    if (questionRes.data.answer_times === 0)  return
    this.setData({ saveLoading: false })
    const questionData = questionRes.data
    const len = questionData.item_list.length
    const questionAnswserList = questionData.item_list.filter(item  => item.answer != item.correct_answer)
    const score = ((len - questionAnswserList.length) / len) * 100 
    if (score >= 60) {
      wx.navigateTo({
        url: `/pages/certificate/index?username=${questionData.user_name}&type=success`,
      })
    } else if (questionData.answer_times >= 2 && score < 60) {
      wx.navigateTo({
        url: `/pages/certificate/index?username=${questionData.user_name}&type=error`,
      })
    } else if (!this.data.tryAgain) {
      wx.navigateTo({
        url: `/pages/result/index?username=${this.data.username}`,
      })
    }
  }
})