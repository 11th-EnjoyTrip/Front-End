import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserInfoStore = defineStore("userInfo", () => {
    const loginState = ref(false);
    const userInfo = ref({
        name: "최요하",
        nickname: "흰수염고래",
    });

    return { loginState, userInfo };
});
