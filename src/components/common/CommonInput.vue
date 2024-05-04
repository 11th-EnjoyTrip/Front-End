<script setup>
import { ref } from "vue";
import IconPerson from "@/components/icons/IconPerson.vue";
import IconLock from "@/components/icons/IconLock.vue";
import IconSearch from "@/components/icons/IconSearch.vue";

defineProps({
    height: Number,
    placeholder: String,
    icon: Object,
});

const colors = ref("#999999");
const focusIn = () => (colors.value = "#646f7c");
const focusOut = () => (colors.value = "#999999");
</script>

<template>
    <!-- 입력 -->
    <div
        class="d-flex align-items-center rounded-5 overflow-hidden px-4 column-gap-2 w-100"
        :style="{ height: height + 'px', border: '1px solid' + colors }"
    >
        <!-- 아이콘(앞) -->
        <IconPerson v-if="icon.isStart && icon.name == 'id'" :width="32" :height="32" :color="colors" />
        <IconLock v-if="icon.isStart && icon.name == 'password'" :width="28" :height="28" :color="colors" />
        <!-- 입력 박스 -->
        <input
            class="w-100 h-100 border-0"
            type="text"
            :placeholder="placeholder"
            @focusin="focusIn"
            @focusout="focusOut"
        />
        <!-- 아이콘(뒤) -->
        <IconSearch v-if="!icon.isStart && icon.name == 'search'" :width="28" :height="28" :color="'#646f7c'" />
    </div>
</template>

<style scoped>
input::placeholder {
    color: #999999;
}

input:focus {
    outline: none;
}
</style>
