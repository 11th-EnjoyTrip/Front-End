import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "@/assets/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { useKakao } from 'vue3-kakao-maps/@utils';

useKakao('467c6aedcee5e042222b042e9896462b');

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
