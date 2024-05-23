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
const emit = defineEmits(["update:modelValue", "searchQnA", "search"]);

const newValue = ref(props.modelValue);
watch(newValue, () => {
    emit("update:modelValue", newValue.value);
});

const colors = ref("#e1e1e1");
const focusIn = () => (colors.value = "#646f7c");
const focusOut = () => (colors.value = "#e1e1e1");
</script>

<template>
    <div
        class="px-4 overflow-hidden d-flex align-items-center rounded-5 column-gap-2 w-100"
        :style="{ height: height + 'px', border: '1px solid' + colors }"
    >
        <IconPerson v-if="icon.isStart && icon.name == 'id'" :width="28" :height="28" :color="colors" />
        <IconLock v-if="icon.isStart && icon.name == 'password'" :width="28" :height="28" :color="colors" />
        <IconSearch v-if="icon.isStart && icon.name == 'search'" :width="28" :height="28" :color="colors" />
        <input
            class="border-0 w-100 h-100"
            :type="placeholder == '비밀번호' ? 'password' : 'text'"
            :placeholder="placeholder"
            @focusin="focusIn"
            @focusout="focusOut"
            v-model="newValue"
            autofocus
        />
        <IconSearch
            v-if="!icon.isStart && icon.name == 'search'"
            :width="28"
            :height="28"
            :color="'#646f7c'"
            @click="emit('search')"
        />
    </div>
</template>

<style scoped>
input {
    font-size: 14px;
}

input::placeholder {
    color: #cccccc;
    font-weight: semibold;
}

input:focus {
    outline: none;
}
</style>
