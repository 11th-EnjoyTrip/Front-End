<script setup>
defineProps({
    width: Number,
    height: Number,
    color: String,
});
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 24 24">
        <path :fill="color" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
</template>

<style scoped></style>
