<script setup>
import CommonInput2 from "@/components/common/CommonInput2.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
import PreferContents from "@/components/MyPage/PreferContents.vue";
import { ref, watch, onMounted } from "vue";
import { getUserInfo, nicknameCheck } from "@/apis/userApi.js";
import { jwtDecode } from "jwt-decode";

const userInfo = {
    id: ref(""),
    name: ref(""),
    email: ref(""),
    nickname: ref(""),
    location: "대구",
};
const messages = ref({
    state: false,
    message: "",
});
const isFirst = ref(0);

onMounted(async () => {
    await getUserInfo(jwtDecode(localStorage.getItem("Authorization")).Id)
        .then((response) => {
            userInfo.id.value = response.data.info.id;
            userInfo.name.value = response.data.info.name;
            userInfo.nickname.value = response.data.info.nickname;
            userInfo.email.value = response.data.info.email;
        })
        .catch((error) => {
            console.log(error);
        });
});

watch(userInfo.nickname, async () => {
    if (isFirst.value == 0) {
        isFirst.value = 1;
        return;
    }

    if (isFirst.value > 0) {
        if (userInfo.nickname.length == 0) {
            messages.value.state = false;
            messages.value.message = "닉네임을 입력해주세요";
        } else {
            await nicknameCheck(userInfo.nickname.value)
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
                    v-model="userInfo.id"
                />
            </div>
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'이름'"
                    :title="'이름'"
                    :page="'edit'"
                    v-model="userInfo.name"
                />
            </div>
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'닉네임'"
                    :title="'닉네임'"
                    :page="'edit'"
                    :canChange="messages.state"
                    v-model="userInfo.nickname"
                />
                <CommonMessage :isSuccess="messages.state" :message="messages.message" />
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
