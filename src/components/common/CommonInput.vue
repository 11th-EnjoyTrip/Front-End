<script setup>
import { ref, watch } from "vue";
import IconPerson from "@/components/icons/IconPerson.vue";
import IconLock from "@/components/icons/IconLock.vue";
import IconSearch from "@/components/icons/IconSearch.vue";

const props = defineProps({
    height: Number,
    placeholder: String,
    icon: Object,
    modelValue: {
        type: String,
        required: true,
    },
});
const emit = defineEmits(["update:modelValue", "searchQnA"]);

const newValue = ref(props.modelValue);
watch(newValue, () => {
    emit("update:modelValue", newValue.value);
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
        <IconPerson v-if="icon.isStart && icon.name == 'id'" :width="28" :height="28" :color="colors" />
        <IconLock v-if="icon.isStart && icon.name == 'password'" :width="28" :height="28" :color="colors" />
        <IconSearch v-if="icon.isStart && icon.name == 'search'" :width="28" :height="28" :color="colors" />
        <!-- 입력 박스 -->
        <input
            class="w-100 h-100 border-0"
            :placeholder="placeholder"
            @focusin="focusIn"
            @focusout="focusOut"
            v-model="newValue"
        />
        <!-- 아이콘(뒤) -->
        <IconSearch
            v-if="!icon.isStart && icon.name == 'search'"
            :width="28"
            :height="28"
            :color="'#646f7c'"
            @click="emit('searchQnA')"
        />
    </div>
</template>

<style scoped>
input::placeholder {
    color: #cccccc;
    font-weight: semibold;
    font-size: 14px;
}

input:focus {
    outline: none;
}

@media (max-width: 575.98px) {
    input {
        font-size: 14px;
    }

    input::placeholder {
        font-size: 14px;
    }
}
</style>
