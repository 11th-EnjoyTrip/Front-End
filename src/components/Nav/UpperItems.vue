<script setup>
import { RouterLink } from "vue-router";
import { useUserInfoStore } from "@/stores/userInfo";
import { useRouter } from "vue-router";

const store = useUserInfoStore();
const router = useRouter();
const logout = () => {
    store.changeLoginState(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.replace("/");
};
</script>

<template>
    <div class="d-flex align-items-center column-gap-4 w-auto">
        <!-- 사용자 로그인 전 -->
        <RouterLink to="/auth/login" class="router" v-if="!store.getLoginState">로그인</RouterLink>
        <RouterLink to="/auth/signup" class="router" v-if="!store.getLoginState">회원가입</RouterLink>
        <!-- 사용자 로그인 후 -->
        <button class="router" @click="logout" v-if="store.getLoginState">로그아웃</button>
        <RouterLink to="/mypage" class="router" v-if="store.getLoginState">마이페이지</RouterLink>
    </div>
</template>

<style scoped></style>
