import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserInfoStore = defineStore("userInfo", () => {
    /* states */
    const loginState = ref(false); // 로그인 상태
    const loginInfo = ref({
        id: "",
        password: "",
    }); // 로그인 정보
    const userInfo = ref({
        name: "최요하",
        nickname: "흰수염고래",
    }); // 사용자 정보

    /* getters */

    /* actions */
    function inputId(newId) {
        loginInfo.value = { ...loginInfo.value, id: newId };
    }
    function inputPwd(newPwd) {
        loginInfo.value = { ...loginInfo.value, password: newPwd };
    }

    return { loginState, loginInfo, userInfo, inputId, inputPwd };
});
