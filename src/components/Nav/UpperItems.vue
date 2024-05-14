<script setup>
import { RouterLink } from "vue-router";
import { useUserInfoStore } from "@/stores/userInfo";

const store = useUserInfoStore();
</script>

<template>
    <div class="d-flex align-items-center column-gap-4 w-auto">
        <!-- 사용자 로그인 전 -->
        <RouterLink to="/auth/login" class="router" v-if="!store.getLoginState">로그인</RouterLink>
        <RouterLink to="/auth/signup" class="router" v-if="!store.getLoginState">회원가입</RouterLink>
        <!-- 사용자 로그인 후 -->
        <RouterLink to="/auth/logout" class="router" v-if="store.getLoginState">로그아웃</RouterLink>
        <RouterLink to="/mypage" class="router" v-if="store.getLoginState">마이페이지</RouterLink>
    </div>
</template>

<style scoped>
.router {
    color: #646f7c;
}
</style>
