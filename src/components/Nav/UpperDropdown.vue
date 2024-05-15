<script setup>
import { ref } from "vue";
import IconPerson from "@/components/icons/IconPerson.vue";
import { useUserInfoStore } from "@/stores/userInfo";

const displayState = ref("none");
const changeState = () =>
    displayState.value == "none" ? (displayState.value = "flex") : (displayState.value = "none");
const store = useUserInfoStore();
const { logoutUser } = store;
</script>

<template>
    <div class="position-relative d-block" @click="changeState">
        <div class="d-none dropdown-btn">
            <IconPerson :width="28" :height="28" :color="'#1769ff'" />
        </div>
        <div
            class="flex-column position-absolute mt-3 rounded-3 bg-white dropdown-items"
            :style="{ display: displayState }"
        >
            <!-- 사용자 로그인 전 -->
            <RouterLink to="/auth/login" class="router" v-if="!store.getLoginState">로그인</RouterLink>
            <RouterLink to="/auth/signup" class="router" v-if="!store.getLoginState">회원가입</RouterLink>
            <!-- 사용자 로그인 후 -->
            <button class="router" @click="logoutUser" v-if="store.getLoginState">로그아웃</button>
            <RouterLink to="/mypage" class="router" v-if="store.getLoginState">마이페이지</RouterLink>
        </div>
    </div>
</template>

<style scoped>
.dropdown-items {
    width: 130px;
    height: 100px;
    left: -90px;
    box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.05);
    animation: moveDown 0.3s ease forwards;
}

.router {
    color: #646f7c;
    font-size: 14px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.router:hover {
    background-color: #e1e1e1;
}

@keyframes moveDown {
    0% {
        top: 0px;
    }
    100% {
        top: 32px;
    }
}

@media (min-width: 576px) {
    .dropdown-items {
        display: none !important;
    }
}

@media (max-width: 575.98px) {
    .dropdown-btn {
        display: block !important;
        border-radius: 50%;
        padding: 4px;
        cursor: grab;
        box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.05);
    }
}
</style>
