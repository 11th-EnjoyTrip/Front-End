import { createRouter, createWebHistory } from "vue-router";
import { useUserInfoStore } from "@/stores/userInfo.js";
import { storeToRefs } from "pinia";
import { message } from "ant-design-vue";
import { useTripPlanStore } from "@/stores/tripPlan";

import AuthView from "@/views/AuthView.vue";
import LoginComp from "@/components/Auth/Login/LoginComp.vue";
import SignUpComp from "@/components/Auth/SignUp/SignUpComp.vue";
import PasswordFindComp from "@/components/Auth/PasswordFind/PasswordFindComp.vue";

import MyPageView from "@/views/MyPageView.vue";

import AttractionView from "@/views/AttractionView.vue";

import TripPlanView from "@/views/TripPlanView.vue";

import QnAView from "@/views/QnAView.vue";
import QnAList from "@/components/QnA/QnAList.vue";
import QnADetail from "@/components/QnA/QnADetail.vue";
import QnAEdit from "@/components/QnA/QnAEdit.vue";
import QnAAdd from "@/components/QnA/QnAAdd.vue";

import ChatGPTView from "@/views/ChatGPTView.vue";

const isValidUser = async (to, from, next) => {
    const store = useUserInfoStore();
    const accessToken = localStorage.getItem("accessToken");
    const { queryUserInfo } = store;
    const { loginState, userInfo, trueLogout } = storeToRefs(store);

    if (accessToken == undefined) {
        message.error("로그인 후에 이용 가능한 서비스입니다", 2);
        next("/auth/login");
    } else {
        trueLogout.value = false;
        await queryUserInfo();

        if (!loginState || userInfo.value == null) {
            message.error("재로그인이 필요합니다", 2);
            next("/auth/login");
        } else {
            next();
        }
    }
};

const getTPD = async (to, from, next) => {
    const store = useUserInfoStore();
    const accessToken = localStorage.getItem("accessToken");
    const { queryUserInfo } = store;
    const { loginState, userInfo, trueLogout } = storeToRefs(store);
    const tps = useTripPlanStore();
    const { getTripPlanDetail } = tps;

    if (accessToken == undefined) {
        message.error("로그인 후에 이용 가능한 서비스입니다", 2);
        next("/auth/login");
    } else {
        trueLogout.value = false;
        await queryUserInfo();

        if (!loginState || userInfo.value == null) {
            message.error("재로그인이 필요합니다", 2);
            next("/auth/login");
        } else {
            await getTripPlanDetail(to.params.id);
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
            component: () => import("@/views/HomeView.vue"),
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
            beforeEnter: async (to, from, next) => {
                localStorage.removeItem("userInfo");
                await isValidUser(to, from, next);
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
            component: () => import("@/views/AttractionDetailView.vue"),
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
        {
            path: "/plan",
            name: "plan",
            component: TripPlanView,
            children: [
                {
                    path: "list",
                    name: "plan-list",
                    component: () => import("@/components/TripPlan/List/TripPlanList.vue"),
                    beforeEnter: isValidUser,
                },
                {
                    path: "add",
                    name: "plan-add",
                    component: () => import("@/components/TripPlan/Write/TripPlanAdd.vue"),
                    beforeEnter: async (to, from, next) => {
                        localStorage.removeItem("editTripPlan");
                        await isValidUser(to, from, next);
                    },
                },
                {
                    path: ":id",
                    name: "plan-detail",
                    component: () => import("@/components/TripPlan/Detail/TripPlanDetail.vue"),
                    beforeEnter: getTPD,
                },
            ],
        },
        {
            path: "/chat",
            name: "chat",
            component: ChatGPTView
        }
    ],
});

export default router;
