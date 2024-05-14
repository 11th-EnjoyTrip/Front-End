<script setup>
defineProps({
    isSuccess: Boolean,
    message: String,
});
</script>

<template>
    <div class="mt-1" :style="{ color: isSuccess ? '#1769ff' : '#ff2c51', 'font-size': '13px' }">
        {{ message }}
    </div>
</template>

<style scoped></style>
