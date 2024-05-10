<script setup>
import CommonInput2 from "@/components/common/CommonInput2.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
import { ref, watch } from "vue";
import { useUserInfoStore } from "@/stores/userInfo.js";
import { nicknameCheck } from "@/apis/authApi.js";

const store = useUserInfoStore();
const nickname = ref(store.getUserInfo.nickname);
const messages = ref({
    state: false,
    message: "",
});

watch(nickname, async () => {
    if (nickname.value.length == 0) {
        messages.value.state = false;
        messages.value.message = "닉네임을 입력해주세요";
    } else {
        await nicknameCheck(nickname.value)
            .then(() => {
                messages.value.state = true;
                messages.value.message = "사용 가능한 닉네임 입니다";
            })
            .catch(() => {
                messages.value.state = false;
                messages.value.message = "중복된 닉네임 입니다";
            });
    }
});
</script>

<template>
    <div class="col-9 col-lg-9 mx-auto">
        <div class="fw-bold fs-5 text-center">회원정보 관리</div>
        <div class="mt-5 d-flex flex-column row-gap-3">
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'아이디'"
                    :title="'아이디'"
                    :page="'edit'"
                    v-model="store.getUserInfo.id"
                />
            </div>
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'이름'"
                    :title="'이름'"
                    :page="'edit'"
                    v-model="store.getUserInfo.name"
                />
            </div>
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'닉네임'"
                    :title="'닉네임'"
                    :page="'edit'"
                    :canChange="messages.state"
                    v-model="nickname"
                />
                <CommonMessage :isSuccess="messages.state" :message="messages.message" />
            </div>
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'이메일'"
                    :title="'이메일'"
                    :page="'edit'"
                    v-model="store.getUserInfo.email"
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
