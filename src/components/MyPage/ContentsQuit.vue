<script setup>
import CommonInput2 from "@/components/common/CommonInput2.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
import CommonButton from "@/components/common/CommonButton.vue";
import { ref, computed, watch } from "vue";
import { passwordCheck, userQuit } from "@/apis/userApi.js";
import { useRouter } from "vue-router";
import { useUserInfoStore } from "@/stores/userInfo";

const store = useUserInfoStore();
const { resetInfo } = store;
const router = useRouter();
const inputPwd = ref("");
const messages = ref({
    state: false,
    message: "",
});
const canQuit = computed(() => {
    return messages.value.state;
});
watch(inputPwd, async () => {
    if (inputPwd.value.length == 0) {
        messages.value.state = false;
        messages.value.message = "비밀번호를 입력해주세요";
    } else {
        await passwordCheck(inputPwd.value)
            .then(() => {
                messages.value.state = true;
                messages.value.message = "탈퇴가 가능합니다";
            })
            .catch(() => {
                messages.value.state = false;
                messages.value.message = "비밀번호가 일치하지 않습니다";
            });
    }
});
const doQuit = async () => {
    if (canQuit.value) {
        await userQuit()
            .then(() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("userInfo");
                resetInfo();
                router.replace("/");
            })
            .catch((error) => {
                console.log(error);
            });
    }
};
</script>

<template>
    <div class="w-100 px-5">
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
        <div class="mt-5 w-75 mx-auto d-flex align-items-center">
            <CommonButton
                :height="40"
                :value="'회원 탈퇴'"
                :bgColors="['#ff2c51', '#e1e1e1']"
                :state="canQuit"
                :click="doQuit"
            />
        </div>
    </div>
</template>

<style scoped></style>
