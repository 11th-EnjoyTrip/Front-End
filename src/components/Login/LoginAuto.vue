<script setup>
import { ref, watch } from "vue";
import IconCheck from "@/components/icons/IconCheck.vue";

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
});

const newValue = ref(props.modelValue);
const emit = defineEmits(["update:modelValue"]);
watch(newValue, () => {
    emit("update:modelValue", newValue.value);
});
</script>

<template>
    <div class="d-flex align-items-center mt-3">
        <input type="checkbox" id="isAuto" v-model="newValue" style="display: none" />
        <label for="isAuto" class="d-flex align-items-center column-gap-2 auto-ment">
            <IconCheck :width="24" :height="24" :color="newValue ? '#1769ff' : '#e1e1e1'" />
            자동 로그인
        </label>
    </div>
</template>

<style scoped>
.auto-ment {
    color: #374553;
}
</style>
