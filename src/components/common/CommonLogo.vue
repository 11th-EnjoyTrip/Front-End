<script setup>
import IconLogo from "@/components/icons/IconLogo.vue";

defineProps({
    length: Number,
    size: Number,
    title: String,
});
</script>

<template>
    <!-- 로고 -->
    <RouterLink class="d-flex align-items-center fw-bold router" to="/">
        <IconLogo :width="length" :height="length" :color="'#1769ff'" />
        <div class="ms-3 logo-text" :style="{ 'font-size': size + 'px' }">{{ title }}</div>
    </RouterLink>
</template>

<style scoped>
.logo-text {
    color: #374553;
}
</style>
