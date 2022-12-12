import { request, ApiPath } from '../../utils/api'
import { jobAfterLogin } from './util'
import Toast from '@vant/weapp/toast/toast'
const phoneRegex = /^[1][3,4,5,7,8,9][0-9]{9}$/

Page({
  data: {
    form: {
      phone: '',
      verification_code: '',
    },
    canSendMagCode: true,
    canSubmit: true,
    isValidatePhone: true,
    isValidateMsgCode: true,
    loading: false,

    timer: '',//定时器名字
    countDownNum: '60'//倒计时初始值,
  },
  async formSubmit() {
    const params = {
      phone: this.data.form.phone,
      verification_code: this.data.form.verification_code,
    }
    this.setData({ loading: true})
    if (!params.verification_code) {
      this.setData({
        isValidateMsgCode: false
      })
      return
    }
    const res = await request(ApiPath.loginEmployeeUser, params)
    if (res.employee_id == '0') {
      const msg = res?.rsp?.msg || res?.resp?.msg
      Toast(msg)
      this.setData({ loading: false })
      return
    }
    if (res?.rsp?.code == '1') { Toast(res?.rsp.msg) }
    this.setData({ loading: false })
    jobAfterLogin(res.employee_id)
  },
  async sendCaptchaMsg() {
    const phone = this.data.form.phone
    if (!phone) return
    if (!phone.match(phoneRegex)) {
      this.setData({
        isValidatePhone: false
      })
      return
    }
    const params = {phone: this.data.form.phone}
    await request(ApiPath.getVerificationCode, params)
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
    const phone = detail.value
    this.setData({ 
      ['form.phone']: phone,
      canSendMagCode: !phone,
      isValidatePhone: true
    })
  },
  onMsgCodeChanged({ detail }) {
    this.setData({ loading: false })
    if (!detail.value.match(/^\d{6}$/)) {
      this.setData({
        isValidateMsgCode: false
      })
      return
    }
    this.setData({ ['form.verification_code']: detail.value })
    this.setData({ isValidateMsgCode: true })
  },
  onLoad: async function () {
    const is_login = wx.getStorageSync('is_login')
    if (is_login == 'true') {
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }
  },
})