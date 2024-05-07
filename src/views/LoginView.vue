<script setup>
import CommonLogo from "@/components/common/CommonLogo.vue";
import CommonInput from "@/components/common/CommonInput.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
import LoginAuto from "@/components/Login/LoginAuto.vue";
import CommonButton from "@/components/common/CommonButton.vue";
import LoginSubMenu from "@/components/Login/LoginSubMenu.vue";
import { ref, watch } from "vue";
//import { login } from "@/apis/authApi";

/* 로그인 정보 */
const loginInfo = ref({
    id: "",
    password: "",
});
const inputId = ref("");
const inputPwd = ref("");
const canLogin = ref(false);
const checkInfo = () => {
    if (inputId.value.length > 0 && inputPwd.value.length > 0) return true;
    return false;
};

/* 로그인 정보 입력 */
watch(inputId, () => {
    loginInfo.value = { ...loginInfo, id: inputId.value };
    canLogin.value = checkInfo();
});
watch(inputPwd, () => {
    loginInfo.value = { ...loginInfo, password: inputPwd.value };
    canLogin.value = checkInfo();
});

/* 로그인 수행 */
const doLogin = () => {
    if (canLogin.value) console.log(loginInfo.value);
    else alert("로그인 불가");
    //login(loginInfo.value);
};
</script>

<template>
    <div class="row">
        <div class="d-flex flex-column h-auto col-10 col-sm-12 mx-auto login">
            <!-- 로고 -->
            <div class="w-auto mx-auto">
                <CommonLogo :length="44" :size="36" :title="'EnjoyTrip'" />
            </div>
            <div class="d-flex flex-column align-items-center h-auto row-gap-2 mt-5 w-100">
                <!-- 아이디 & 비밀번호 -->
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
            <!-- 로그인 결과 -->
            <CommonMessage :isSuccess="false" :message="'아이디 또는 비밀번호가 맞지 않습니다'" />
            <!-- 자동 로그인 -->
            <LoginAuto />
            <!-- 로그인 버튼 -->
            <CommonButton
                :height="50"
                :value="'로그인'"
                :bgColors="['#1769ff', '#e1e1e1']"
                :state="canLogin"
                :click="doLogin"
            />
            <!-- 서브 메뉴 -->
            <LoginSubMenu />
        </div>
    </div>
</template>

<style scoped>
.login {
    max-width: 360px;
    margin-top: 120px;
}
</style>
