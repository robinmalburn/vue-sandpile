import { createApp } from "vue";
import { createPinia } from "./stores";
import MainApp from "./components/MainApp.vue";
import "../css/app.css";
import "vue-color/style.css";

const app = createApp(MainApp);
app.use(createPinia());
app.mount("#app");
