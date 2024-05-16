import { createApp } from "vue";
import { createPinia } from "pinia";

import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";

import "@/assets/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { useKakao } from "vue3-kakao-maps/@utils";
import "ant-design-vue/dist/reset.css";

import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

useKakao("467c6aedcee5e042222b042e9896462b");

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Antd);

app.component("infinite-loading", InfiniteLoading);

app.mount("#app");
