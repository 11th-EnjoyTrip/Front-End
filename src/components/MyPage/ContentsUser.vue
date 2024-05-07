<script setup>
import CommonInput2 from "@/components/common/CommonInput2.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
</script>

<template>
    <div class="col-7 mx-auto">
        <div class="fw-bold fs-5 text-center">회원정보 관리</div>
        <div class="mt-5 d-flex flex-column row-gap-3">
            <div><CommonInput2 :height="60" :placeholder="'bluewhaleyh'" :title="'아이디'" :type="'text'" /></div>
            <div><CommonInput2 :height="60" :placeholder="'최요하'" :title="'이름'" :type="'text'" /></div>
            <div>
                <CommonInput2 :height="60" :placeholder="'흰수염고래'" :title="'닉네임'" :type="'text'" />
                <CommonMessage :isSuccess="false" :message="'중복된 닉네임입니다'" />
                <CommonMessage :isSuccess="true" :message="'사용가능한 닉네임입니다'" />
            </div>
            <div>
                <CommonInput2 :height="60" :placeholder="'yoha6865@gmail.com'" :title="'이메일'" :type="'text'" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
