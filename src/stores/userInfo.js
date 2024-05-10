import { ref, computed } from "vue";
import { defineStore } from "pinia";

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

    return {
        loginState,
        userInfo,
        getLoginState,
        getUserInfo,
        changeLoginState,
        changeUserInfo,
    };
});
