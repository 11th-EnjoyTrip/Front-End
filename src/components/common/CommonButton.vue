<script setup>
import { ref } from "vue";

defineProps({
    height: Number,
    value: String,
    bgColors: Array,
});

const btnState = ref(false);
</script>

<template>
    <!-- 버튼 -->
    <input
        type="button"
        class="border-0 rounded-5 fw-bold mt-4 w-100"
        :style="{
            height: height + 'px',
            'background-color': btnState ? bgColors[0] : bgColors[1],
            color: btnState ? '#ffffff' : '#374553',
        }"
        :value="value"
        @click="btnState = !btnState"
    />
</template>

<style scoped></style>
