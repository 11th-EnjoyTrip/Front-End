<script setup>
defineProps({
    isSuccess: Boolean,
    message: String,
});
</script>

<template>
    <div class="mt-2" :style="{ color: isSuccess ? '#1769ff' : '#ff2c51' }">{{ message }}</div>
</template>

<style scoped></style>
