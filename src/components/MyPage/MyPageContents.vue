<script setup>
import ContentsUser from "@/components/MyPage/ContentsUser.vue";
import ContentsPassword from "@/components/MyPage/ContentsPassword.vue";
import ContentsPlan from "@/components/MyPage/ContentsPlan.vue";
import ContentsHotPlace from "@/components/MyPage/ContentsHotPlace.vue";
import ContentsQuit from "@/components/MyPage/ContentsQuit.vue";

defineProps({
    menu: Number,
});
</script>

<template>
    <ContentsUser v-show="menu == 0" />
    <ContentsPassword v-show="menu == 1" />
    <ContentsPlan v-show="menu == 2" />
    <ContentsHotPlace v-show="menu == 3" />
    <ContentsQuit v-show="menu == 4" />
</template>

<style scoped></style>
