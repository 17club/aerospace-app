import { EST_Single_Choice, EST_Multiple_Choice, EST_Judge } from '../../const'
Component({
  properties: {
    info: {
      type: Object,
      default: () => {}
    },
    isLog: {
      type: Boolean,
      default: false,
    },
    currentQuestion: {
      type: String,
      default: ''
    }
  },
  data: {
    EST_Single_Choice, 
    EST_Multiple_Choice, 
    EST_Judge,
  },
  methods: {
    onChange(event) {
      this.triggerEvent('updateanswer', event.detail.value ? event.detail.value : event.detail);
    }
  }
})
