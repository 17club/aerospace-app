import { request, ApiPath } from '../../utils/api'
import { jobAfterLogin } from './util'
import Toast from '@vant/weapp/toast/toast'
const phoneRegex = /^[1][3,4,5,7,8,9][0-9]{9}$/

Page({
  data: {
    form: {
      telephone: '',
      captcha: '',
    },

    canSendMagCode: false,
    canSubmit: false,
    loading: false,

    timer: '',//定时器名字
    countDownNum: '60', //倒计时初始值,

    dialog: false
  },
  async toSubmit() {
    const params = {
      telephone: this.data.form.telephone,
      captcha: this.data.form.captcha,
    }
    this.setData({ loading: true})

    const res = await request(ApiPath.login, params)
    this.setData({ loading: false })
    if (res.code == 1) {
      const msg = res.msg
      Toast.fail(msg);
      return
    }
    jobAfterLogin(res.data.token)
  },
  async sendCaptchaMsg() {
    const telephone = this.data.form.telephone
    if (!telephone) return
    if (!telephone.match(phoneRegex)) {
      Toast.fail('请输入正确的手机号')
      return
    }
    const params = { telephone: this.data.form.telephone}
    const res = await request(ApiPath.getCaptcha, params)
    if (res.code === 1) {
      const msg = res.msg
      if(msg === '用户未找到') {
        this.setData({ dialog: true })
      } else {
        Toast.fail(msg);
      }
      return
    }
    this.countDown()
  },
  countDown() {
    let that = this
    let countDownNum = that.data.countDownNum
    that.setData({
      timer: setInterval(function () {
        countDownNum--
        that.setData({
          countDownNum: countDownNum
        })
        if (countDownNum == 0) {
          that.setData({
            countDownNum: 60
          })
          clearInterval(that.data.timer)
        }
      }, 1000)
    })
  },
  onPhoneChanged({ detail }) {
    const telephone = detail.value
    this.setData({ 
      ['form.telephone']: telephone,
      canSendMagCode: !!telephone,
    })
  },
  onMsgCodeChanged({ detail }) {
    this.setData({ loading: false })
    if (detail.value.match(/^\d{6}$/)) {
      this.setData({ canSubmit: true })
    }
    this.setData({ ['form.captcha']: detail.value })
  },
  onLoad: async function () {
    const is_login = wx.getStorageSync('is_login')
    if (is_login == 'true') {
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }
  },
  dialogCancel() {
    this.setData({ dialog: false })
  },
  dialogConfirm() {
    this.setData({ dialog: false })
    wx.setClipboardData({
      data: 'vx6548213',
      success () {
        wx.getClipboardData({
          success (res) {}
        })
      }
    })
  },
})