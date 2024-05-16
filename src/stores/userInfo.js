import { ref } from "vue";
import { defineStore } from "pinia";
import { getUserInfo } from "@/apis/userApi";

export const useUserInfoStore = defineStore("userInfo", () => {
    /* states */
    const loginState = ref(false);
    const userInfo = ref(null);
    const isEditing = ref(false);
    const trueLogout = ref(false);

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
        resetInfo,
    };
});
