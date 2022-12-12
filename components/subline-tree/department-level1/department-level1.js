// components/subline-tree/department-level1/department-level1.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    departmentLevel1List: {
      type: Array,
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
      this.triggerEvent('department-level1-clicked', activeId)
      this.setData({
        activeId,
      })
    }
  },
})
