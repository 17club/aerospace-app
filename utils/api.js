import { getCurrentPageUrl } from "./wx"
import Toast from '@vant/weapp/toast/toast'

export function request(url, data, method = 'POST', app = null) {
  const globalData = (app || getApp()).globalData
  const apiPath = globalData.apiPath
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${globalData.domain[globalData.env]}${apiPath}${url}`,
      data,
      header: {
        'Authorization': globalData?.userInfo?.token,
      },
      method,
      success: res => {
        const data = res.data
          if (![ '/pages/login/login'].includes(getCurrentPageUrl()) && !globalData?.userInfo?.token ) {
            wx.redirectTo({ url: '/pages/login/login'})
            const msg = data?.resp?.msg
            if (msg) {
              Toast(msg)
            }
            return
          }
        resolve(res.data)
      },
      fail: res => {
        console.log('fail')
        reject(res)
      }
    })
  })
}

export const ApiPath = {
  logout: '/sys/logout',
  login: '/sys/login',
  getCaptcha: '/sys/getCaptcha',
  
  questionList: '/question/list',
  questionAdd: '/question/add',
  questionResult: '/question/getresult',
}