<script setup>
import CommonInput2 from "@/components/common/CommonInput2.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
import CommonButton from "@/components/common/CommonButton.vue";
import { ref, computed, watch } from "vue";
import { useUserInfoStore } from "@/stores/userInfo.js";

const inputPwd = ref("");
const messages = ref({
    state: false,
    message: "",
});
const canQuit = computed(() => {
    return messages.value.state;
});
const store = useUserInfoStore();
watch(inputPwd, async () => {
    if (inputPwd.value.length == 0) {
        messages.value.state = false;
        messages.value.message = "비밀번호를 입력해주세요";
    } else {
        if (await store.checkPassword(store.getInfo.id, inputPwd.value)) {
            messages.value.state = true;
            messages.value.message = "탈퇴가 가능합니다";
        } else {
            messages.value.state = false;
            messages.value.message = "비밀번호가 일치하지 않습니다";
        }
    }
});
const doQuit = async () => {
    await store.quitUser(store.getInfo.id);
};
</script>

<template>
    <div class="col-7 mx-auto">
        <div class="fw-bold fs-5 text-center">회원 탈퇴</div>
        <div class="mt-5 d-flex flex-column row-gap-3">
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'8자 이상 소문자, 숫자'"
                    :title="'비밀번호'"
                    :type="'password'"
                    v-model="inputPwd"
                />
                <CommonMessage :isSuccess="messages.state" :message="messages.message" />
            </div>
        </div>
        <div class="mt-5 w-100 d-flex align-items-center">
            <CommonButton
                :height="50"
                :value="'회원 탈퇴'"
                :bgColors="['#ff2c51', '#e1e1e1']"
                :state="canQuit"
                :click="doQuit"
            />
        </div>
    </div>
</template>

<style scoped></style>
