import Vue from 'vue';

const vm = new Vue({
    el: '#user',
    data: {a:'Smith'},
    created: function () {
    // `this` points to the vm instance
    console.log('Hello, ' + this.a)
    },
    template: '<div id="login-status> {{ a }} </div>'

  });