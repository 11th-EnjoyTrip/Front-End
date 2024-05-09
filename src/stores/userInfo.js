import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { passwordCheck, passwordChange, userQuit, passwordFind } from "@/apis/authApi";

export const useUserInfoStore = defineStore("userInfo", () => {
    /* states */
    const loginState = ref(true);
    const userInfo = ref({
        id: "bluewhaleyh",
        name: "최요하",
        nickname: "흰수염고래",
        email: "bluewhaleyh@gmail.com",
    });

    /* getters */
    const getLoginState = computed(() => {
        return loginState.value;
    });
    const getUserInfo = computed(() => {
        return userInfo.value;
    });

    /* actions */
    const changeLoginState = (newState) => {
        loginState.value = newState;
    };
    const changeUserInfo = (userId) => {
        userInfo.value.id = userId;
    };

    const checkPassword = async (id, password) => {
        let res = false;
        await passwordCheck(id, password)
            .then(() => {
                res = true;
            })
            .catch(() => {
                res = false;
            });
        return res;
    };

    const changePassword = async (id, password) => {
        let res = false;
        await passwordChange(id, password)
            .then(() => {
                res = true;
            })
            .catch(() => {
                res = false;
            });
        return res;
    };

    const quitUser = async (id) => {
        let res = false;
        await userQuit(id)
            .then(() => {
                res = true;
            })
            .catch(() => {
                res = false;
            });
        return res;
    };

    return {
        loginState,
        userInfo,
        getLoginState,
        getUserInfo,
        changeLoginState,
        changeUserInfo,

        checkPassword,
        changePassword,
        quitUser,
    };
});
