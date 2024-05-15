<script setup>
import { RouterLink } from "vue-router";
import { useUserInfoStore } from "@/stores/userInfo";
import { storeToRefs } from "pinia";

const store = useUserInfoStore();
const { logoutUser } = store;
const { loginState } = storeToRefs(store);
</script>

<template>
    <div class="d-flex align-items-center column-gap-4 w-auto">
        <!-- 사용자 로그인 전 -->
        <RouterLink to="/auth/login" class="router" v-if="!loginState">로그인</RouterLink>
        <RouterLink to="/auth/signup" class="router" v-if="!loginState">회원가입</RouterLink>
        <!-- 사용자 로그인 후 -->
        <button class="router" @click="logoutUser" v-if="loginState">로그아웃</button>
        <RouterLink to="/mypage" class="router" v-if="loginState">마이페이지</RouterLink>
    </div>
</template>

<style scoped></style>
