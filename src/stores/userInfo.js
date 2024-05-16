import { ref } from "vue";
import { defineStore } from "pinia";
import { getUserInfo, regenerateAccess, logout } from "@/apis/userApi";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

export const useUserInfoStore = defineStore("userInfo", () => {
    /* states */
    const loginState = ref(false);
    const userInfo = ref(null);

    /* getters */

    /* actions */
    const logoutUser = async (trueLogout) => {
        const router = useRouter();

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
            .catch((error) => {
                console.log(error);
            });
    };
    const regenerateToken = async () => {
        await regenerateAccess()
            .then((response) => {
                localStorage.setItem("accessToken", response.data["access-token"]);
            })
            .catch(async () => {
                console.log("refresh token 만료");

                await logoutUser();
            });
    };
    const queryUserInfo = async () => {
        await getUserInfo()
            .then((response) => {
                loginState.value = true;
                userInfo.value = response.data.info;
            })
            .catch(async () => {
                console.log("access token 만료");
                await regenerateToken();
            });
    };

    return {
        loginState,
        userInfo,
        logoutUser,
        regenerateToken,
        queryUserInfo,
    };
});
