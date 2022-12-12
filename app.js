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
    apiPath: '/CarManage/',
    domain: {
      develop: 'https://liying-test.zhcslyg.com',
      trial: 'https://liying-test.zhcslyg.com',
      release: 'https://liying.zhcslyg.com',
    },
    pageData: null,
  },
})