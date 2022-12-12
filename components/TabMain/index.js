Component({
    options: {
        addGlobalClass: true
    },
    properties: {
        tabs: {
            type: Array,
            value: [],
        },
        tabIndex: {
            type: Number,
            value: 0,
        }
    },
    data: {},
    methods: {
        tabChange: function (e) {
            this.triggerEvent('tabChange', e.currentTarget.dataset.index);
        }
    }
});