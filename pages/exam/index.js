Page({
  data: {
    currentIndex: 10,
    currentSelect: true
  },
  toPrev() {
    if (this.data.currentIndex == 1) return
    this.setData({
      currentIndex: --this.data.currentIndex
    })
  },
  toNext() {
    if (this.data.currentIndex == 20) return
    this.setData({
      currentIndex: ++this.data.currentIndex
    })
  }
})