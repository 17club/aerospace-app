import { StorageKey } from '../../utils/uniconst'
export async function jobAfterLogin(employee_id) {
  const userInfo = getApp().globalData.userInfo
  userInfo.employeeId = employee_id
  wx.setStorageSync(StorageKey.UserInfo, userInfo)
  wx.hideLoading({})
  wx.switchTab({ url: '/pages/index/index'  })
}