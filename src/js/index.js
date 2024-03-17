import "core-js";
import { createApp } from 'vue';
import store from './stores';
import MainApp from './components/MainApp.vue';
import '../css/app.css';

const app = createApp(MainApp);
app.use(store);
app.mount('#app');
