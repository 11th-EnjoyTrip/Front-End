<script setup>
import CommonInput2 from "@/components/common/CommonInput2.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
import CommonButton from "@/components/common/CommonButton.vue";
</script>

<template>
    <div class="col-7 mx-auto">
        <div class="fw-bold fs-5 text-center">비밀번호 변경</div>
        <div class="mt-5 d-flex flex-column row-gap-3">
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'8자 이상 소문자, 숫자'"
                    :title="'기존 비밀번호'"
                    :type="'password'"
                />
                <CommonMessage :isSuccess="false" :message="'비밀번호가 일치하지 않습니다'" />
            </div>
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'8자 이상 소문자, 숫자'"
                    :title="'새로운 비밀번호'"
                    :type="'password'"
                />
                <CommonMessage :isSuccess="false" :message="'사용 불가능한 비밀번호입니다'" />
                <CommonMessage :isSuccess="false" :message="'이전과 동일한 비밀번호입니다'" />
                <CommonMessage :isSuccess="true" :message="'사용가능한 비밀번호입니다'" />
            </div>
        </div>
        <div class="mt-5 w-100 d-flex align-items-center">
            <CommonButton :height="50" :value="'비밀번호 변경'" :bgColors="['#1769ff', '#e1e1e1']" />
        </div>
    </div>
</template>

<style scoped></style>
