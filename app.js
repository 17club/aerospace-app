import { StorageKey } from './utils/uniconst'
import { getNavigationBarData } from './utils/globaldata'

const accountInfo = wx.getAccountInfoSync()

App({
  onLaunch() {
    getNavigationBarData(this)
  },
  globalData: {
    userInfo: wx.getStorageSync(StorageKey.UserInfo) || {},
    navigationBarData: {
      navBarHeight: 0,
      menuRight: 0,
      menuBotton: 0,
      menuHeight: 0,
      indexScrollViewHeight: 0,
    },
    globalData: {
      searchKey: '',
    },
    env: accountInfo.miniProgram.envVersion,
    appId: accountInfo.miniProgram.appId,
    apiPath: '/examd',
    domain: {
      develop: 'https://question.wexing.net',
      trial: 'https://question.wexing.net',
      release: 'https://question.wexing.net',
    },
    pageData: null,
  },
})