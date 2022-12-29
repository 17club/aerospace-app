const regex = /^[A-Za-z\d_\-\u4e00-\u9fa5]{1,20}$/
import Toast from '@vant/weapp/toast/toast'

Page({
  data: {
    username: ''
  },
  goBack() {
    wx.navigateTo({ url: `/pages/login/login` })
  },
  toConfirm() {
    if (!this.data.username) {
      Toast('请输入姓名!')
      return
    }
    wx.navigateTo({
      url: `/pages/exam/index?username=${this.data.username}`,
    })
  },
  onChanged({ detail }) {
    if (!regex.test(detail.value)) {
      Toast.fail('请输入20个字以内的中英文字符!')
      return
    }
    this.setData({ username: detail.value })
  }
})