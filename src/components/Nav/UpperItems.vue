<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const userState = ref(false);
</script>

<template>
    <div class="d-flex align-items-center column-gap-4 w-auto h-100">
        <!-- 사용자 로그인 전 -->
        <RouterLink to="/login" class="router" v-if="!userState">로그인</RouterLink>
        <RouterLink to="/signup" class="router" v-if="!userState">회원가입</RouterLink>
        <!-- 사용자 로그인 후 -->
        <RouterLink to="/login" class="router" v-if="userState">로그아웃</RouterLink>
        <RouterLink to="/signup" class="router" v-if="userState">마이페이지</RouterLink>
    </div>
</template>

<style scoped>
a {
    color: #646f7c;
}
</style>
