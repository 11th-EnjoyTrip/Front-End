import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { login, signup, duplicateNickname } from "@/apis/authApi";

export const useUserInfoStore = defineStore("userInfo", () => {
    /* states */
    const loginState = ref(false);
    const userInfo = ref({
        id: "bluewhaleyh",
        name: "최요하",
        nickname: "흰수염고래",
        email: "bluewhaleyh@gmail.com",
    });

    /* getters */
    const getInfo = computed(() => {
        return userInfo.value;
    });

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

    const duplicateCheck = (nickname) => {
        duplicateNickname(nickname)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    };

    return { loginState, userInfo, getInfo, doLogin, doSignup, duplicateCheck };
});
