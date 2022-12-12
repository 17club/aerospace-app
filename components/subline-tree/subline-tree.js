// components/subline-tree/subline-tree.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sublineTreeData: {
      type: Object,
      observer: function () {
        this.setData({ sublineIdSelected: 0 })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    sublineIdSelected: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLevel1Clicked({ detail }) {
      this.triggerEvent('department-level1-clicked', detail)
    },
    onLevel2Clicked({ detail }) {
      this.triggerEvent('department-level2-clicked', detail)
    },
    onSublineClicked({ detail }) {
      this.setData({ sublineIdSelected: detail })
    },
    onConfirm() {
      this.triggerEvent('subline-confirmed', this.data.sublineIdSelected)
    }
  }
})
