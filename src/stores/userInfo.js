import { ref } from "vue";
import { defineStore } from "pinia";
import { login } from "@/apis/authApi";

export const useUserInfoStore = defineStore("userInfo", () => {
    /* states */
    const loginState = ref(false); // 로그인 상태
    const userInfo = ref({
        name: "",
        nickname: "",
    }); // 사용자 정보

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

    return { loginState, userInfo, doLogin };
});
