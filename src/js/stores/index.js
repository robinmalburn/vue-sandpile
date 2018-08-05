import Vue from 'vue';
import Vuex from 'vuex';
import heatmap from './heatmap';
import canvas from './canvas';
import sand from './sand';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        canvas,
        heatmap,
        sand
    }
});

export default store;