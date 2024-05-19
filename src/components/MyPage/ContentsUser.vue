<script setup>
import CommonInput2 from "@/components/common/CommonInput2.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
import PreferContents from "@/components/MyPage/PreferContents.vue";
import { ref, watch } from "vue";
import { nicknameCheck } from "@/apis/userApi.js";
import { useUserInfoStore } from "@/stores/userInfo.js";
import { storeToRefs } from "pinia";

const store = useUserInfoStore();
const { userInfo, isEditing } = storeToRefs(store);
const newNickname = ref(userInfo.value.nickname);
const messages = ref({
    state: false,
    message: "",
});
const isFirst = ref(0);

watch(newNickname, async () => {
    if (isFirst.value == 0) {
        isFirst.value = 1;
        return;
    }

    if (isFirst.value > 0) {
        if (newNickname.value.length == 0) {
            messages.value.state = false;
            messages.value.message = "닉네임을 입력해주세요";
        } else {
            await nicknameCheck(newNickname.value)
                .then(() => {
                    messages.value.state = true;
                    messages.value.message = "사용 가능한 닉네임 입니다";
                })
                .catch(() => {
                    messages.value.state = false;
                    messages.value.message = "중복된 닉네임 입니다";
                });
        }
    }
});
</script>

<template>
    <div class="position-absolute w-100">
        <div class="text-center fw-bold fs-5">회원정보 관리</div>
        <div class="row-gap-3 mt-5 d-flex flex-column">
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'아이디'"
                    :title="'아이디'"
                    :page="'edit'"
                    v-model="userInfo.userid"
                />
            </div>
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'이름'"
                    :title="'이름'"
                    :page="'edit'"
                    v-model="userInfo.username"
                />
            </div>
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'닉네임'"
                    :title="'닉네임'"
                    :page="'edit'"
                    :canChange="messages.state"
                    v-model="newNickname"
                />
                <CommonMessage v-show="isEditing" :isSuccess="messages.state" :message="messages.message" />
            </div>
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'이메일'"
                    :title="'이메일'"
                    :page="'edit'"
                    v-model="userInfo.email"
                />
            </div>
            <div><PreferContents v-model="userInfo.location" /></div>
        </div>
    </div>
</template>

<style scoped>
input::placeholder {
    font-weight: 700;
}
</style>
