<script setup>
import NavComp from "@/components/Nav/NavComp.vue";
import CommonButton from "@/components/common/CommonButton.vue";
import CommonInput2 from "@/components/common/CommonInput2.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
</script>

<template>
    <NavComp :withLower="false" />
    <div class="row">
        <div class="d-flex flex-column h-auto col-10 col-sm-12 mx-auto signup">
            <div class="mx-auto fw-bold title">회원가입</div>
            <div class="d-flex flex-column row-gap-3 mt-5">
                <div>
                    <CommonInput2 :height="50" :placeholder="'소문자, 숫자'" :title="'아이디'" :type="text" />
                    <CommonMessage :isSuccess="false" :message="'사용 가능한 아이디 입니다'" />
                </div>
                <div>
                    <CommonInput2
                        :height="50"
                        :placeholder="'8자 이상 소문자, 숫자'"
                        :title="'비밀번호'"
                        :type="password"
                    />
                    <CommonMessage :isSuccess="true" :message="'사용 가능한 비밀번호 입니다'" />
                </div>
                <div>
                    <CommonInput2 :height="50" :placeholder="'비밀번호 재입력'" :title="'비밀번호 확인'" />
                    <CommonMessage :isSuccess="false" :message="'비밀번호가 일치하지 않습니다'" />
                </div>
                <CommonInput2 :height="50" :placeholder="'이름'" :title="'이름'" />
                <div>
                    <CommonInput2 :height="50" :placeholder="'email@domain.com'" :title="'이메일'" />
                    <CommonMessage :isSuccess="false" :message="'양식에 맞게 입력해주세요'" />
                </div>
            </div>
            <div class="mt-4"><CommonButton :height="50" :value="'회원가입'" :bgColors="['#1769ff', '#e1e1e1']" /></div>
        </div>
    </div>
</template>

<style scoped>
.signup {
    max-width: 480px;
    margin-top: 120px;
}

.title {
    font-size: 36px;
    color: #374553;
}
</style>
