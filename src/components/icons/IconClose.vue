<script setup>
defineProps({
    width: Number,
    height: Number,
    color: String,
});
</script>

<template>

<svg :width="width" :height="height" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 37.5L37.5 12.5M12.5 12.5L37.5 37.5" :stroke="color" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


</template>

<style scoped></style>
