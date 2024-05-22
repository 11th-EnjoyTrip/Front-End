<script setup>
import IconPerson from "@/components/icons/IconPerson.vue";
import IconLock from "@/components/icons/IconLock.vue";
import IconTag from "@/components/icons/IconTag.vue";
import IconMail from "@/components/icons/IconMail.vue";
import IconNickname from "@/components/icons/IconNickname.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import { ref, watch } from "vue";
import { nicknameChange } from "@/apis/userApi.js";
import { useUserInfoStore } from "@/stores/userInfo.js";
import { storeToRefs } from "pinia";
import { message } from "ant-design-vue";

const store = useUserInfoStore();
const { isEditing, trueLogout } = storeToRefs(store);
const props = defineProps({
    height: Number,
    placeholder: String,
    title: String,
    type: String,
    page: String,
    canChange: Boolean,
    modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);
const newValue = ref(props.modelValue);
watch(newValue, () => {
    emit("update:modelValue", newValue.value);
});

const doEdit = async () => {
    if (!isEditing.value) {
        isEditing.value = true;
    } else {
        if (newValue.value.length == 0) {
            message.warn("닉네임을 입력해주세요");
        } else {
            trueLogout.value = false;
            await nicknameChange(newValue.value)
                .then(() => {
                    message.success("닉네임 변경에 성공했습니다");
                    isEditing.value = false;
                })
                .catch((error) => {
                    if (error.response.status == 409) message.error("중복된 닉네임입니다");
                    else if (error.response.status != 401) message.error("닉네임 변경에 실패했습니다");
                });
        }
    }
};
</script>

<template>
    <div class="row border-bottom input-border mx-0" :style="{ height: height + 'px' }">
        <div class="col-3 d-flex align-items-center fw-bold px-0 title">{{ title }}</div>
        <div class="col-3 title-icon">
            <IconPerson v-if="title == '아이디'" :width="24" :height="24" :color="'#374559'" />
            <IconLock
                v-if="
                    title == '비밀번호' ||
                    title == '비밀번호 확인' ||
                    title == '기존 비밀번호' ||
                    title == '새로운 비밀번호'
                "
                :width="24"
                :height="24"
                :color="'#374559'"
            />
            <IconTag v-if="title == '이름'" :width="24" :height="24" :color="'#374559'" />
            <IconNickname v-if="title == '닉네임'" :width="24" :height="24" :color="'#374559'" />
            <IconMail v-if="title == '이메일'" :width="24" :height="24" :color="'#374559'" />
        </div>
        <div class="col-8">
            <input
                :type="type"
                class="w-100 h-100 border-0 contents"
                :placeholder="placeholder"
                :readonly="
                    page == 'edit' &&
                    (title == '아이디' || title == '이메일' || title == '이름' || title == '닉네임') &&
                    !isEditing
                "
                v-model="newValue"
            />
        </div>
        <div
            v-if="page == 'edit' && title == '닉네임'"
            class="d-flex align-items-center justify-content-center col-1 px-0"
        >
            <a-tooltip :title="isEditing ? '변경하기' : '닉네임 변경'" :color="'#1769ff'">
                <IconEdit :width="24" :height="24" :color="isEditing ? '#1769ff' : '#999999'" @click="doEdit" />
            </a-tooltip>
        </div>
    </div>
</template>

<style scoped>
.input-border {
    border-color: #374553 !important;
}

.title {
    color: #646f7c;
    font-size: 14px;
}

.contents {
    color: #374553;
    font-size: 14px;
}

.title-icon {
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
}
</style>
