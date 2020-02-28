var app = new Vue({
    el: '#lista',
    data: {
        atletas: []
    },
    methods: {

    },
    ready: function () {
        var self = this;
        self.$http.get('baseTriathlon.json').then(function (response) {
            console.log('response');
            self.atletas = response.data;
        });
    }
});