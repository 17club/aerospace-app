const regex = /^[A-Za-z\d_\-\u4e00-\u9fa5]{1,20}$/
import Toast from '@vant/weapp/toast/toast'

Page({
  data: {
    username: ''
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
  }
})