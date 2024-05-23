import { createApp } from "vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";

import "@/assets/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { useKakao } from "vue3-kakao-maps/@utils";
import "ant-design-vue/dist/reset.css";
import "vue3-carousel/dist/carousel.css";

import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

import MasonryWall from "@yeger/vue-masonry-wall";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

useKakao("467c6aedcee5e042222b042e9896462b");

const app = createApp(App);
const pinia = createPinia();
pinia.use(
    createPersistedState({
        storage: localStorage,
        auto: true,
    })
);

const vuetify = createVuetify({
    components,
    directives,
});

app.use(router);
app.use(pinia);
app.use(Antd);
app.use(MasonryWall);
app.use(vuetify);

app.component("QuillEditor", QuillEditor);
app.component("infinite-loading", InfiniteLoading);

app.mount("#app");
