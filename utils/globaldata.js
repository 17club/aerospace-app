import { request, ApiPath } from './api'

export function getNavigationBarData(app) {
  const systemInfo = wx.getSystemInfoSync()
  const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
  const navigationBarData = app.globalData.navigationBarData
  navigationBarData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight
  navigationBarData.menuRight = systemInfo.screenWidth - menuButtonInfo.right
  navigationBarData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight
  navigationBarData.menuHeight = menuButtonInfo.height
  navigationBarData.indexScrollViewHeight = systemInfo.screenHeight - navigationBarData.navBarHeight - 84
}

export async function getUserInfo(app) {
  await request(ApiPath.userInfo, '', 'POST', app)
}
