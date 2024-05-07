<script setup>
import { ref } from "vue";
import SideMenuItems from "@/components/MyPage/SideMenuItems.vue";

const menu = ref(0);
const changeMenu = (newMenu) => (menu.value = newMenu);
const titles = ["회원정보 관리", "비밀번호 변경", "여행 계획", "핫플레이스", "회원 탈퇴"];
</script>

<template>
    <div class="d-flex flex-column align-items-center w-100 h-auto rounded-4 side-menu">
        <div class="fw-bold fs-5 mt-4">메뉴</div>
        <SideMenuItems
            v-for="(title, index) in titles"
            :menu="menu"
            :idx="index"
            :title="title"
            :key="title"
            @click="changeMenu(index)"
        />
    </div>
</template>

<style scoped>
.side-menu {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}
</style>
