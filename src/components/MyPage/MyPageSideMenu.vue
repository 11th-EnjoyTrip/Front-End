<script setup>
import { ref, watch } from "vue";
import SideMenuItems from "@/components/MyPage/SideMenuItems.vue";

const props = defineProps({
    modelValue: Number,
});

const curMenu = ref(props.modelValue);
const emit = defineEmits(["update:modelValue"]);
watch(curMenu, () => {
    emit("update:modelValue", curMenu.value);
});
const changeMenu = (newMenu) => (curMenu.value = newMenu);
const titles = ["회원정보 관리", "비밀번호 변경", "관광지", "여행 계획", "리뷰", "회원 탈퇴"];
</script>

<template>
    <div class="d-flex flex-column align-items-center w-100 h-auto rounded-4 side-menu">
        <div class="fw-bold fs-5 mt-4">메뉴</div>
        <SideMenuItems
            v-for="(title, index) in titles"
            :type="'desktop'"
            :menu="curMenu"
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
