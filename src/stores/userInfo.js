import { ref } from "vue";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import { getUserInfo, regenerateAccess, logout } from "@/apis/userApi";

export const useUserInfoStore = defineStore("userInfo", () => {
    /* states */
    const loginState = ref(false);
    const userInfo = ref(null);

    /* getters */

    /* actions */
    const resetUserInfo = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        loginState.value = false;
        userInfo.value = null;
    };
    const regenerateToken = async (id) => {
        await regenerateAccess(id)
            .then((response) => {
                localStorage.setItem("accessToken", response.data["access-token"]);
            })
            .catch(async () => {
                console.log("refresh token 만료");

                await logout(id)
                    .then(() => {
                        resetUserInfo();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
    };
    const queryUserInfo = async (accessToken) => {
        const access = jwtDecode(accessToken);

        await getUserInfo(access.Id)
            .then((response) => {
                loginState.value = true;
                userInfo.value = response.data.info;
            })
            .catch(async () => {
                console.log("access token 만료");
                await regenerateToken(access.Id);
            });
    };

    return {
        loginState,
        userInfo,
        resetUserInfo,
        regenerateToken,
        queryUserInfo,
    };
});
