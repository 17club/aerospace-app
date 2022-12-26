import { request, ApiPath } from '../../utils/api'
import { jobAfterLogin } from './util'
import Toast from '@vant/weapp/toast/toast'
const phoneRegex = /^[1][3,4,5,7,8,9][0-9]{9}$/

Page({
  data: {
    form: {
      telephone: '',
      verification_code: '',
    },

    canSendMagCode: false,
    canSubmit: false,
    loading: false,

    timer: '',//定时器名字
    countDownNum: '60', //倒计时初始值,

    dialogMessage: ''
  },
  async toSubmit() {
    const params = {
      telephone: this.data.form.telephone,
      verification_code: this.data.form.verification_code,
    }
    this.setData({ loading: true})

    const res = await request(ApiPath.loginEmployeeUser, params)
    if (res.employee_id == '0') {
      const msg = res?.rsp?.msg || res?.resp?.msg
      this.dialogShow(msg)
      this.setData({ loading: false })
      return
    }
    if (res?.rsp?.code == '1') { Toast(res?.rsp.msg) }
    this.setData({ loading: false })
    jobAfterLogin(res.employee_id)
  },
  async sendCaptchaMsg() {
    const telephone = this.data.form.telephone
    if (!telephone) return
    if (!telephone.match(phoneRegex)) {
      this.dialogShow('手机号格式不正确')
      return
    }

    const params = {telephone: this.data.form.telephone}
    await request(ApiPath.getCaptcha, params)
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
    this.setData({ ['form.verification_code']: detail.value })
  },
  onLoad: async function () {
    const is_login = wx.getStorageSync('is_login')
    if (is_login == 'true') {
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }
  },
  dialogShow(msg) {
    this.setData({ dialogMessage: msg })
    setTimeout(() => {
      this.setData({
        dialogMessage: '',
      })
    }, 1000)
  },
})