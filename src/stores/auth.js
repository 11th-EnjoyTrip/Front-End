import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
    /* states */
    const loginState = ref(localStorage.getItem("accessToken") ? true : false);
    const userInfo = ref({
        id: "kim",
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
