<script setup>
import { ref, watch } from "vue";
import IconCheck from "@/components/icons/IconCheck.vue";

const colors = ref("#e1e1e1");
const checkState = ref(false);
watch(checkState, () => (colors.value = checkState.value ? "#1769ff" : "#e1e1e1"));
</script>

<template>
    <div class="d-flex align-items-center mt-3">
        <!-- 자동 로그인 -->
        <input type="checkbox" id="isAuto" v-model="checkState" style="display: none" />
        <label for="isAuto" class="d-flex align-items-center column-gap-2 auto-ment">
            <IconCheck :width="24" :height="24" :color="colors" />
            자동 로그인
        </label>
    </div>
</template>

<style scoped>
.auto-ment {
    color: #374553;
}
</style>
