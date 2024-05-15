import { createRouter, createWebHistory } from "vue-router";
import { useUserInfoStore } from "@/stores/userInfo.js";
import { storeToRefs } from "pinia";
import HomeView from "@/views/HomeView.vue";
import AuthView from "@/views/AuthView.vue";
import LoginComp from "@/components/Auth/Login/LoginComp.vue";
import SignUpComp from "@/components/Auth/SignUp/SignUpComp.vue";
import PasswordFindComp from "@/components/Auth/PasswordFind/PasswordFindComp.vue";
import MyPageView from "@/views/MyPageView.vue";
import AttractionView from "@/views/AttractionView.vue";
import AttractionDetailView from "@/views/AttractionDetailView.vue";
import QnAView from "@/views/QnAView.vue";
import QnAList from "@/components/QnA/QnAList.vue";
import QnADetail from "@/components/QnA/QnADetail.vue";
import QnAEdit from "@/components/QnA/QnAEdit.vue";
import QnAAdd from "@/components/QnA/QnAAdd.vue";

const isValidUser = async (to, from, next) => {
    const store = useUserInfoStore();
    const accessToken = localStorage.getItem("accessToken");
    const { queryUserInfo } = store;
    const { loginState, userInfo } = storeToRefs(store);

    if (accessToken == undefined) {
        next("/auth/login");
    } else {
        await queryUserInfo(accessToken);

        if (!loginState || userInfo.value == null) {
            next("/auth/login");
        } else {
            next();
        }
    }
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/auth",
            name: "auth",
            component: AuthView,
            children: [
                {
                    path: "login",
                    name: "auth-login",
                    component: LoginComp,
                },
                {
                    path: "signup",
                    name: "auth-signup",
                    component: SignUpComp,
                },
                {
                    path: "find",
                    name: "auth-find",
                    component: PasswordFindComp,
                },
            ],
        },
        {
            path: "/mypage",
            name: "mypage",
            component: MyPageView,
            beforeEnter: isValidUser,
        },
        {
            path: "/attraction",
            name: "attraction",
            component: AttractionView,
        },
        {
            path: "/attraction/:id",
            name: "attractionDetail",
            component: AttractionDetailView,
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
                    beforeEnter: isValidUser,
                },
                {
                    path: "add",
                    name: "add",
                    component: QnAAdd,
                    beforeEnter: isValidUser,
                },
            ],
        },
    ],
});

export default router;
