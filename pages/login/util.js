import { StorageKey } from '../../utils/uniconst'
export async function jobAfterLogin(token) {
  const userInfo = getApp().globalData.userInfo
  userInfo.token = token
  wx.setStorageSync(StorageKey.UserInfo, userInfo)
  wx.hideLoading({})
  wx.navigateTo({url: `/pages/index/index`})
}