<script setup>
import IconPerson from "@/components/icons/IconPerson.vue";
import IconLock from "@/components/icons/IconLock.vue";
import IconTag from "@/components/icons/IconTag.vue";
import IconMail from "@/components/icons/IconMail.vue";
import IconNickname from "@/components/icons/IconNickname.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import { ref, watch } from "vue";

const props = defineProps({
    height: Number,
    placeholder: String,
    title: String,
    type: String,
    withEdit: Boolean,
    page: String,
    modelValue: {
        type: String,
        required: true,
    },
});
const emit = defineEmits(["update:modelValue"]);
const newValue = ref(props.modelValue);
watch(newValue, () => {
    emit("update:modelValue", newValue.value);
});

const isEditing = ref(props.title == "비밀번호" || props.title == "기존 비밀번호" || props.title == "새로운 비밀번호");
const doEdit = () => {
    if (isEditing.value) {
        alert("변경?");
        isEditing.value = false;
    } else isEditing.value = true;
};
</script>

<template>
    <div class="row border-bottom input-border mx-0" :style="{ height: height + 'px' }">
        <div class="col-3 d-flex align-items-center fw-bold px-0 title">{{ title }}</div>
        <div class="col-3 title-icon">
            <IconPerson v-if="title == '아이디'" :width="28" :height="28" :color="'#374559'" />
            <IconLock
                v-if="title == '비밀번호' || title == '비밀번호 확인'"
                :width="32"
                :height="32"
                :color="'#374559'"
            />
            <IconTag v-if="title == '이름'" :width="28" :height="28" :color="'#374559'" />
            <IconNickname v-if="title == '닉네임'" :width="28" :height="28" :color="'#374559'" />
            <IconMail v-if="title == '이메일'" :width="28" :height="28" :color="'#374559'" />
        </div>
        <div class="col-7">
            <input
                :type="type"
                class="w-100 h-100 border-0"
                :placeholder="placeholder"
                :readonly="
                    page == 'edit' &&
                    (title != '닉네임' ||
                        title != '기존 비밀번호' ||
                        title != '새로운 비밀번호' ||
                        title != '비밀번호') &&
                    !isEditing
                "
                v-model="newValue"
            />
        </div>
        <div class="col-2 d-flex align-items-center px-0 edit" v-if="page == 'edit' && title == '닉네임' && !withEdit">
            <button
                class="d-flex align-items-center justify-content-center fw-medium rounded-5 border-0 w-100 h-50"
                :style="{
                    color: isEditing ? '#ffffff' : '#999999',
                    'background-color': isEditing ? '#1769ff' : '#ffffff',
                    'font-size': '12px',
                    'text-decoration': isEditing ? 'none' : 'underline',
                }"
                @click="doEdit"
            >
                수정
            </button>
        </div>
        <div v-if="page == 'edit' && title == '닉네임' && !withEdit" class="col-2 edit-icon">
            <IconEdit :width="24" :height="24" :color="isEditing ? '#1769ff' : '#999999'" @click="doEdit" />
        </div>
    </div>
</template>

<style scoped>
.input-border {
    border-color: #374553 !important;
}

.title {
    color: #374553;
}

.title-icon {
    display: none !important;
}

.edit-btn {
    font-size: 12px;
    color: #999999;
}

.edit-icon {
    display: none !important;
}

input::placeholder {
    color: #999999;
}

input:focus {
    outline: none;
}

@media (max-width: 575.98px) {
    .title {
        display: none !important;
    }

    .title-icon {
        display: flex !important;
        align-items: center;
    }

    .edit {
        display: none !important;
    }

    .edit-icon {
        display: flex !important;
        align-items: center;
    }
}
</style>
