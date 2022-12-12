// components/navigation-bar/navigation-bar.js
const app = getApp()
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    navigationData: {
      type: Object,
      value: {
        title: '主动防控安全系统',
        search: {
          placeholder: '请输入',
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: app.globalData.navigationBarData.navBarHeight,
    menuRight: app.globalData.navigationBarData.menuRight,
    menuBotton: app.globalData.navigationBarData.menuBotton,
    menuHeight: app.globalData.navigationBarData.menuHeight,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindBack() {
      wx.navigateBack()
    },
    bindSearch({ detail }) {
      app.globalData.searchKey = detail.value
      this.triggerEvent('search', { key: detail.value })
    },
    onTouchMove() { }
  },
  lifetimes: {
    attached: function () {
      if (app.globalData.searchKey) {
        this.triggerEvent('search', { key: app.globalData.searchKey })
      }
    },
  },
})
