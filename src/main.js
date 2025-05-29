import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { Popup, DatePicker, Pagination, ConfigProvider, Toast } from "vant";

const app = createApp(App);

// 注册 Vant 的 DatePicker 组件
app.use(Popup);
app.use(DatePicker);
app.use(Pagination);
app.use(ConfigProvider);
app.use(Toast);

// 挂载应用
app.mount("#app");
