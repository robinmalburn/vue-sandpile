import "core-js";
import Vue from 'vue';
import store from './stores';
import MainApp from './components/MainApp.vue';
import '../css/app.css';

new Vue({
    el: '#app',
    store,
    render: h => h(MainApp)
});
