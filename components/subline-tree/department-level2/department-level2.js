// components/subline-tree/department-level2/department-level2.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    departmentLevel2List: {
      type: Array,
      observer: function () {
        this.setData({ activeId: 0 })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeId: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onItemClicked(e) {
      const activeId = e.target?.dataset?.id ?? 0
      this.triggerEvent('department-level2-clicked', activeId)
      this.setData({
        activeId,
      })
    }
  },
})
