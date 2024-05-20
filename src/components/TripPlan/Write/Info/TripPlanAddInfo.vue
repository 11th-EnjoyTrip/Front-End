<script setup>
import { ref, watch } from "vue";
import { QuillEditor } from "@vueup/vue-quill";

const quill = ref(null);
const getQuill = (q) => {
    quill.value = q;
    quill.value.root.innerHTML = "<p>helllo</p>";
};

const departure = ref("");
const arrival = ref("");
const departureTime = ref("");
watch(departureTime, () => {
    console.log(departureTime);
});
</script>

<template>
    <div class="w-100 add-info">
        <div class="fw-bold plan-title">여행 계획 제목</div>
        <input class="plan-title-input plan-input" type="text" />
        <div class="mt-4 row justify-content-between">
            <div class="col">
                <div class="info-period-title">출발</div>
                <a-date-picker v-model:value="departure" :placeholder="'출발 날짜'" class="info-period-datepicker" />
            </div>
            <div class="col">
                <div class="info-period-title">복귀</div>
                <a-date-picker v-model:value="arrival" :placeholder="'복귀 날짜'" class="info-period-datepicker" />
            </div>
            <div class="col">
                <div class="info-period-title">출발 시간</div>
                <a-time-picker
                    v-model:value="departureTime"
                    :placeholder="'출발 시간'"
                    class="info-period-datepicker"
                />
            </div>
        </div>
        <div class="mt-4 d-flex flex-column">
            <div class="info-period-title">출발지</div>
            <input class="plan-title-input plan-input" type="text" />
        </div>
        <div class="mt-4 w-100 mb-5">
            <div class="info-intro-title">여행 설명</div>
            <QuillEditor theme="snow" :toolbar="'full'" @ready="getQuill" />
        </div>
    </div>
</template>

<style scoped>
.plan-title {
    color: #374553;
    font-size: 20px;
}

.plan-title-input {
    width: 100%;
    height: 50px;
    border: 1px solid #e1e1e1;
    border-radius: 10px;
    margin-top: 10px;
    padding: 0 20px;
}

.plan-input:focus {
    outline: none;
    border: 1px solid #374553;
}

.info-writer {
    color: #999999;
    font-size: 14px;
}

.info-period-title {
    color: #374553;
    font-size: 20px;
    font-weight: 600;
}

.info-period {
    color: #374553;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    padding: 10px 150px 10px 10px;
}

.info-period-datepicker {
    width: 100%;
    padding: 10px 10px;
}

.info-intro-title {
    font-weight: 600;
    font-size: 20px;
    color: #374553;
}

.info-intro {
    width: 100%;
    border-radius: 5px;
    border: 1px solid #e1e1e1;
    min-height: 250px;
}
</style>
