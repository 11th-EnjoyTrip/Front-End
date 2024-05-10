import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import SignUpView from "@/views/SignUpView.vue";
import MyPageView from "@/views/MyPageView.vue";
import PasswordFindView from "@/views/PasswordFindView.vue";
import { useUserInfoStore } from "@/stores/userInfo.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/login",
            name: "login",
            component: LoginView,
            beforeEnter: (to, from) => {
                const store = useUserInfoStore();
                if (store.getLoginState) {
                    return { name: "mypage" };
                }
            },
        },
        {
            path: "/signup",
            name: "signup",
            component: SignUpView,
            beforeEnter: (to, from) => {
                const store = useUserInfoStore();
                if (store.getLoginState) {
                    return { name: "mypage" };
                }
            },
        },
        {
            path: "/mypage",
            name: "mypage",
            component: MyPageView,
            beforeEnter: (to, from) => {
                const store = useUserInfoStore();
                if (!store.getLoginState) {
                    return { name: "login" };
                }
            },
        },
        {
            path: "/find",
            name: "passwordFind",
            component: PasswordFindView,
            beforeEnter: (to, from) => {
                const store = useUserInfoStore();
                if (store.getLoginState) {
                    return { name: "mypage" };
                }
            },
        },
        /*{
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/AboutView.vue"),
        },*/
    ],
});

export default router;
