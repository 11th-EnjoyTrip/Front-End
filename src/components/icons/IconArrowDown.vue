<script setup>
defineProps({
    width: Number,
    height: Number,
    color: String,
    degree: Number,
});
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 24 24">
        <path v-if="degree == 90" :fill="color" d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z" />
        <path v-else-if="degree == 270" :fill="color" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z" />
        <path v-else :fill="color" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z" />
    </svg>
</template>

<style scoped></style>
