// components/calendar/calendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show: true,
    defaultDate: [Date.now() - 6 * 24 * 60 * 60 * 1000, Date.now()],
    minDate: Date.now() - 90 * 24 * 60 * 60 * 1000,
    maxDate: Date.now(),
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onConfirm(event) {
      const [from, to] = event.detail
      this.setData({
        show: false,
      })
      this.triggerEvent('time-range-confirmed', { from: new Date(from).getTime(), to: new Date(to).getTime() })
      this.triggerEvent('close')
    },
  }
})
