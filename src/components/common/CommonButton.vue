<script setup>
defineProps({
    height: Number,
    value: String,
    bgColors: Array,
    state: Boolean,
    click: Function,
});
</script>

<template>
    <!-- 버튼 -->
    <input
        type="button"
        class="border-0 rounded-5 fw-bold mt-4 w-100"
        :style="{
            height: height + 'px',
            'background-color': state ? bgColors[0] : bgColors[1],
            color: state ? '#ffffff' : '#374553',
            'font-size': '14px',
        }"
        :value="value"
        @click="click"
    />
</template>

<style scoped></style>
