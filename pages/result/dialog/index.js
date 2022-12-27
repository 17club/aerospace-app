Component({
  properties: {

  },
  data: {

  },
  methods: {
    toCancel() {
      this.triggerEvent('dialogCancel');
    },
    toSubmit() {
      this.triggerEvent('dialogConfirm');
    }
  }
})
