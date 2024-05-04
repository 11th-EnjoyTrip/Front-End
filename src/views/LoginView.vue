<script setup>
import CommonLogo from "@/components/common/CommonLogo.vue";
import CommonInput from "@/components/common/CommonInput.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
import LoginAuto from "@/components/Login/LoginAuto.vue";
import CommonButton from "@/components/common/CommonButton.vue";
import LoginSubMenu from "@/components/Login/LoginSubMenu.vue";
</script>

<template>
    <div class="h-auto mx-auto login">
        <div class="d-flex flex-column w-100 h-auto">
            <!-- 로고 -->
            <CommonLogo />
            <div class="d-flex flex-column align-items-center h-auto row-gap-2 mt-5">
                <!-- 아이디 & 비밀번호 -->
                <CommonInput :width="360" :height="50" :placeholder="'아이디'" :icon="{ isStart: true, name: 'id' }" />
                <CommonInput
                    :width="360"
                    :height="50"
                    :placeholder="'비밀번호'"
                    :icon="{ isStart: true, name: 'password' }"
                />
            </div>
            <!-- 로그인 결과 -->
            <CommonMessage :isSuccess="false" :message="'아이디 또는 비밀번호가 맞지 않습니다'" />
            <!-- 자동 로그인 -->
            <LoginAuto />
            <!-- 로그인 버튼 -->
            <CommonButton :width="360" :height="50" :value="'로그인'" :bgColors="['#1769ff', '#e1e1e1']" />
            <!-- 서브 메뉴 -->
            <LoginSubMenu />
        </div>
    </div>
</template>

<style scoped>
.login {
    margin-top: 120px;
    width: 360px;
}
</style>
