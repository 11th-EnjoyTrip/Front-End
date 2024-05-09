import { ref, computed } from "vue";
import { defineStore } from "pinia";
import {
    login,
    signup,
    duplicateNickname,
    passwordCheck,
    passwordChange,
    userQuit,
    passwordFind,
} from "@/apis/authApi";

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
    const getState = computed(() => {
        return loginState.value;
    });
    const getInfo = computed(() => {
        return userInfo.value;
    });

    /* actions */
    const doLogin = async (loginInfo) => {
        let res = false;
        await login(loginInfo)
            .then((response) => {
                userInfo.value = { ...response };
                res = true;
            })
            .catch(() => {
                res = false;
            });
        return res;
    };

    const doSignup = async (signupInfo) => {
        let res = false;
        await signup(signupInfo)
            .then(() => {
                res = true;
            })
            .catch(() => {
                res = false;
            });
        return res;
    };

    const duplicateCheck = async (nickname) => {
        let res = false;
        await duplicateNickname(nickname)
            .then(() => {
                res = true;
            })
            .catch(() => {
                res = false;
            });
        return res;
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

    const findPassword = async (id, name, email) => {
        let res = false;
        await passwordFind(id, name, email)
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
        getState,
        getInfo,
        doLogin,
        doSignup,
        duplicateCheck,
        checkPassword,
        changePassword,
        quitUser,
        findPassword,
    };
});
