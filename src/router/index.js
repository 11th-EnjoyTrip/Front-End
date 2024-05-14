import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import SignUpView from "@/views/SignUpView.vue";
import MyPageView from "@/views/MyPageView.vue";
import AttractionView from "@/views/AttractionView.vue";
import AttractionDetailView from "@/views/AttractionDetailView.vue";
import PasswordFindView from "@/views/PasswordFindView.vue";
import QnAView from "@/views/QnAView.vue";
import QnAList from "@/components/QnA/QnAList.vue";
import QnADetail from "@/components/QnA/QnADetail.vue";
import QnAEdit from "@/components/QnA/QnAEdit.vue";
import QnAAdd from "@/components/QnA/QnAAdd.vue";
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
        {
            path: "/attraction",
            name: "attraction",
            component: AttractionView,
        },
        {
            path: "/attraction/:id",
            name: "attractionDetail",
            component : ()=> import('@/views/AttractionDetailView.vue'),
        },
        {
            path: "/qna",
            name: "qna",
            component: QnAView,
            children: [
                {
                    path: "",
                    name: "list",
                    component: QnAList,
                },
                {
                    path: ":id",
                    name: "detail",
                    component: QnADetail,
                },
                {
                    path: ":id/edit",
                    name: "edit",
                    component: QnAEdit,
                },
                {
                    path: "add",
                    name: "add",
                    component: QnAAdd,
                },
            ],
        },
    ],
});

export default router;
