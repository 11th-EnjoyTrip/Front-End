<script setup>
import CommonLogo from "@/components/common/CommonLogo.vue";
import CommonInput from "@/components/common/CommonInput.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
import LoginAuto from "@/components/Auth/Login/LoginAuto.vue";
import CommonButton from "@/components/common/CommonButton.vue";
import LoginSubMenu from "@/components/Auth/Login/LoginSubMenu.vue";
import { ref, watch } from "vue";
import { login } from "@/apis/authApi.js";
import { useRouter } from "vue-router";
import { useUserInfoStore } from "@/stores/userInfo.js";

const inputId = ref("");
const inputPwd = ref("");
const selectAutoLogin = ref(false);
const canLogin = ref(false);
const messageInfo = ref({
    state: false,
    message: "",
});

const checkInfo = () => {
    if (inputId.value.length > 0 && inputPwd.value.length > 0) return true;
    return false;
};
const doLogin = async () => {
    const loginInfo = {
        id: inputId.value,
        password: inputPwd.value,
        autoLogin: selectAutoLogin.value,
    };

    if (canLogin.value) {
        await login(loginInfo)
            .then((response) => {
                console.log(response.data);

                const router = useRouter();
                const store = useUserInfoStore();

                store.changeLoginState(true);
                store.changeUserInfo(response.data.id);
                router.replace("/");
            })
            .catch((error) => {
                console.log(error);
                messageInfo.value.message = "아이디 또는 비밀번호가 일치하지 않습니다";
            });
    } else {
        messageInfo.value.message = "아이디 또는 비밀번호를 입력해주세요";
    }
};
watch([inputId, inputPwd], () => {
    canLogin.value = checkInfo();
});
</script>

<template>
    <Transition name="bounce" appear>
        <div class="row">
            <div class="d-flex flex-column h-auto col-8 col-sm-12 mx-auto login">
                <div class="w-auto mx-auto">
                    <CommonLogo :length="44" :size="36" :title="'Travelogue'" />
                </div>
                <div class="d-flex flex-column align-items-center h-auto row-gap-2 mt-5 w-100">
                    <CommonInput
                        :height="50"
                        :placeholder="'아이디'"
                        :icon="{ isStart: true, name: 'id' }"
                        v-model="inputId"
                    />
                    <CommonInput
                        :height="50"
                        :placeholder="'비밀번호'"
                        :icon="{ isStart: true, name: 'password' }"
                        v-model="inputPwd"
                    />
                </div>
                <CommonMessage :isSuccess="messageInfo.state" :message="messageInfo.message" />
                <LoginAuto v-model="selectAutoLogin" />
                <CommonButton
                    :height="50"
                    :value="'로그인'"
                    :bgColors="['#1769ff', '#e1e1e1']"
                    :state="canLogin"
                    :click="doLogin"
                />
                <LoginSubMenu />
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.login {
    max-width: 360px;
    margin-top: 120px;
}

.bounce-enter-active {
    animation: bounce 0.5s;
}

@keyframes bounce {
    0% {
        transform: scale(0.975);
    }
    100% {
        transform: scale(1);
    }
}
</style>
