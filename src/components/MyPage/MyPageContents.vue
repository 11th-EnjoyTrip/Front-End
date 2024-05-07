<script setup>
import { ref } from "vue";
import ContentsUser from "@/components/MyPage/ContentsUser.vue";
import ContentsPassword from "@/components/MyPage/ContentsPassword.vue";
import ContentsPlan from "@/components/MyPage/ContentsPlan.vue";
import ContentsHotPlace from "@/components/MyPage/ContentsHotPlace.vue";
import ContentsQuit from "@/components/MyPage/ContentsQuit.vue";

const menu = ref(0);
</script>

<template>
    <ContentsUser v-if="menu == 0" />
    <ContentsPassword v-if="menu == 1" />
    <ContentsPlan v-if="menu == 2" />
    <ContentsHotPlace v-if="menu == 3" />
    <ContentsQuit v-if="menu == 4" />
</template>

<style scoped></style>
