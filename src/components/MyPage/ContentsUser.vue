<script setup>
import CommonInput2 from "@/components/common/CommonInput2.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
import { ref, watch } from "vue";
import { useUserInfoStore } from "@/stores/userInfo.js";

const store = useUserInfoStore();
const userInfo = store.getInfo;
const nickname = ref(userInfo.nickname);
const messages = ref({
    state: false,
    message: "",
});
watch(nickname, () => {
    if (nickname.value.length == 0) {
        messages.value.state = false;
        messages.value.message = "닉네임을 입력해주세요";
    } else {
        if (store.duplicateCheck(nickname.value)) {
            messages.value.state = true;
            messages.value.message = "사용 가능한 닉네임 입니다";
        } else {
            messages.value.state = false;
            messages.value.message = "중복된 닉네임 입니다";
        }
    }
});
</script>

<template>
    <div class="col-7 mx-auto">
        <div class="fw-bold fs-5 text-center">회원정보 관리</div>
        <div class="mt-5 d-flex flex-column row-gap-3">
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'아이디'"
                    :title="'아이디'"
                    :type="'text'"
                    v-model="userInfo.id"
                />
            </div>
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'이름'"
                    :title="'이름'"
                    :type="'text'"
                    v-model="userInfo.name"
                />
            </div>
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'닉네임'"
                    :title="'닉네임'"
                    :type="'text'"
                    v-model="nickname"
                />
                <CommonMessage :isSuccess="messages.state" :message="messages.message" />
            </div>
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'이메일'"
                    :title="'이메일'"
                    :type="'text'"
                    v-model="userInfo.email"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
input::placeholder {
    font-weight: 700;
}
</style>
