import { ref } from "vue";
import { defineStore } from "pinia";
import { login, signup } from "@/apis/authApi";

export const useUserInfoStore = defineStore("userInfo", () => {
    /* states */
    const loginState = ref(false);
    const userInfo = ref({
        name: "",
        nickname: "",
    });

    /* getters */

    /* actions */
    const doLogin = (loginInfo) => {
        login(loginInfo)
            .then((response) => {
                userInfo.value = { ...response };
                return true;
            })
            .catch(() => {
                return false;
            });
    };

    const doSignup = (signupInfo) => {
        signup(signupInfo);
    };

    return { loginState, userInfo, doLogin, doSignup };
});
