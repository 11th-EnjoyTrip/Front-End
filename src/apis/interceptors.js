import axios from "axios";
import { regenerateAccess, logout } from "@/apis/userApi";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserInfoStore } from "@/stores/userInfo";

let alreadyTry = false;

export const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.defaults.headers.common["Authorization"] = "";
api.defaults.headers.common["refreshToken"] = "";
api.defaults.headers.post["Content-Type"] = "application/json";
api.defaults.headers.get["Content-Type"] = "application/json";

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status == 401) {
            const router = useRouter();
            const store = useUserInfoStore();
            const { loginState, userInfo, trueLogout } = storeToRefs(store);

            if (!alreadyTry) {
                alreadyTry = true;
                await regenerateAccess()
                    .then(async (response) => {
                        localStorage.setItem("accessToken", response.data["access-token"]);
                        alreadyTry = false;
                        console.log(error.config);
                    })
                    .catch(async (error) => {
                        if (error.status)
                            await logout()
                                .then(() => {
                                    localStorage.removeItem("accessToken");
                                    localStorage.removeItem("refreshToken");
                                    loginState.value = false;
                                    userInfo.value = null;

                                    if (!trueLogout) {
                                        message.error("로그인이 만료되었습니다", 5);
                                        router.replace("/auth/login");
                                    } else {
                                        message.success("로그아웃에 성공했습니다", 3);
                                        router.replace("/");
                                    }
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                    });
            }
        }
        return Promise.reject(error);
    }
);
