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
    <div class="d-flex align-items-center justify-content-around px-5 py-4 mb-5">
        <SideMenuItems
            v-for="(title, index) in titles"
            :type="'mobile'"
            :menu="curMenu"
            :idx="index"
            :title="title"
            :key="title"
            @click="changeMenu(index)"
        />
    </div>
</template>

<style scoped>
.icons {
    width: 50px;
    height: 50px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

.menu-item-title {
    font-size: 14px;
}
</style>
