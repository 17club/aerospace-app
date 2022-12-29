const app = getApp()
import Toast from '@vant/weapp/toast/toast'
import { request, ApiPath } from '../../utils/api'
Page({
  data: {
    menuHeight: app.globalData.navigationBarData.menuHeight,
    username: '',
    answerList: [],
    answerTimes: '',

    answerEnum: {
      0: 'A',
      1: 'B',
      2: 'C',
      3: 'D'
    },

    dialog: false,
    loading: false,
  },

  onLoad(options) {
    this.setData({ username: options.username })
    this.fetchData()
  },
  async fetchData() {
    this.setData({ loading:true})
    const res = await request(ApiPath.questionResult, {}, 'get')
    this.setData({ loading: false})
    if (res.code === 1) {
      Toast.fail(res.msg)
      return
    }
    const data = res.data
    const len = data.item_list.length
    const answerList = data.item_list.filter(item  => item.answer != item.correct_answer)
    const score = ((len - answerList.length) / len) * 100 
    if (score >= 60) {
      wx.navigateTo({
        url: `/pages/certificate/index?username=${data.user_name}&type=success`,
      })
    }

    if (data.answer_times >= 2 && score < 60) {
      wx.navigateTo({
        url: `/pages/certificate/index?username=${data.user_name}&type=error`,
      })
    }

    this.setData({
      answerList: answerList.map(item => ({
        ...item,
        answer_list: [item.answer_a, item.answer_b, item.answer_c, item.answer_d]
      })),
      answerTimes: data.answer_times
    })

  },
  goBack() {
    wx.navigateTo({
      url: `/pages/exam/index?username=${this.data.username}`,
    })
  },
  tryAgain() {
    this.setData({ dialog: true })
  },
  dialogCancel() {
    this.setData({ dialog: false })
  },
  dialogConfirm() {
    this.setData({ dialog: false })
    wx.navigateTo({
      url: `/pages/exam/index?username=${this.data.username}`,
    })
  },
})