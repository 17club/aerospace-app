const regex = /^[A-Za-z\d_\-\u4e00-\u9fa5]{1,20}$/
import Toast from '@vant/weapp/toast/toast'
import { request, ApiPath } from '../../utils/api'

Page({
  data: {
    username: ''
  },
  onLoad() {
    if (!getApp().globalData?.userInfo?.token) {
      wx.redirectTo({ url: '/pages/login/login'})
      return
    }
    this.getResult()
  },
  async goBack() {
    await request(ApiPath.login, {})
    jobAfterLogin('')
    wx.navigateTo({ url: `/pages/login/login` })
  },
  toConfirm() {
    if (!regex.test(this.data.username)) {
      Toast.fail('请输入20个字以内的中英文字符、数字!')
      return
    }
    wx.navigateTo({
      url: `/pages/exam/index?username=${this.data.username}`,
    })
  },
  onChanged({ detail }) {
    this.setData({ username: detail.value })
  },
  async getResult() {
    const questionRes = await request(ApiPath.questionResult, {}, 'get')
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
    } else {
      wx.navigateTo({
        url: `/pages/result/index?username=${this.data.username}`,
      })

    }
  }
})