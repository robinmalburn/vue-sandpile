import { createStore } from 'vuex';
import heatmap from './heatmap';
import canvas from './canvas';
import sand from './sand';

const store = createStore({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        canvas,
        heatmap,
        sand
    }
});

export default store;
