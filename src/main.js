import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "./style.css";

import { Popup, DatePicker, Pagination, ConfigProvider, Toast } from "vant";

const app = createApp(App);

app.use(router);
app.use(Popup);
app.use(DatePicker);
app.use(Pagination);
app.use(ConfigProvider);
app.use(Toast);

app.mount("#app");
