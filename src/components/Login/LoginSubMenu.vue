<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
    <!-- 로그인 서브 메뉴 -->
    <div class="row mt-4">
        <div class="col-5 text-end sub-menu"><RouterLink class="router" to="/find">비밀번호 찾기</RouterLink></div>
        <div class="col text-center">|</div>
        <div class="col-5 text-start"><RouterLink class="router" to="/signup">회원가입</RouterLink></div>
    </div>
</template>

<style scoped>
.router {
    color: #374553;
}
</style>
