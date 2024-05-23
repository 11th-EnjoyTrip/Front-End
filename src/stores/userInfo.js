import { ref } from "vue";
import { defineStore } from "pinia";
import { getUserInfo, logout } from "@/apis/userApi";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

export const useUserInfoStore = defineStore("userInfo", () => {
    /* states */
    const loginState = ref(false);
    const userInfo = ref(null);
    const isEditing = ref(false);
    const trueLogout = ref(false);
    const router = useRouter();

    /* getters */

    /* actions */
    const queryUserInfo = async () => {
        await getUserInfo()
            .then((response) => {
                loginState.value = true;
                userInfo.value = response.data.info;
            })
            .catch(async () => {
                console.log("access token 만료");
            });
    };
    const logoutUser = async () => {
        await logout()
            .then(() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                loginState.value = false;
                userInfo.value = null;

                message.success("로그아웃 되었습니다", 3);
                router.replace("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const resetInfo = () => {
        loginState.value = false;
        userInfo.value = null;
        isEditing.value = false;
        trueLogout.value = false;
    };

    return {
        loginState,
        userInfo,
        isEditing,
        trueLogout,
        queryUserInfo,
        logoutUser,
        resetInfo,
    };
});
