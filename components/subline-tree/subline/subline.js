// components/subline-tree/subline/subline.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sublineMap: {
      type: Object,
      observer: function (newV) {
        if (newV) {
          this.setData({
            sublineList: Object.values(newV),
            activeId: 0,
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    sublineList: [],
    activeId: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onItemClicked(e) {
      const activeId = e.target?.dataset?.id ?? 0
      this.triggerEvent('subline-clicked', activeId)
      this.setData({
        activeId,
      })
    }
  },
})
