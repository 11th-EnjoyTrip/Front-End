<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
    <div class="row mt-4">
        <div class="col-5 text-end sub-menu"><RouterLink class="router" to="/auth/find">비밀번호 찾기</RouterLink></div>
        <div class="col text-center">|</div>
        <div class="col-5 text-start sub-menu"><RouterLink class="router" to="/auth/signup">회원가입</RouterLink></div>
    </div>
</template>

<style scoped>
.router {
    color: #374553;
    font-size: 14px;
}
</style>
