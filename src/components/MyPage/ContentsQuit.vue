<script setup>
import CommonInput2 from "@/components/common/CommonInput2.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
import CommonButton from "@/components/common/CommonButton.vue";
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
                />
                <CommonMessage :isSuccess="false" :message="'비밀번호가 일치하지 않습니다'" />
            </div>
        </div>
        <div class="mt-5 w-100 d-flex align-items-center">
            <CommonButton :height="50" :value="'회원 탈퇴'" :bgColors="['#ff2c51', '#e1e1e1']" />
        </div>
    </div>
</template>

<style scoped></style>
