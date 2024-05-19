<script setup>
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import IconLike from "@/components/icons/IconLike.vue";

const quill = ref(null);
const getQuill = (q) => {
    quill.value = q;
    quill.value.root.innerHTML = "<p>helllo</p>";
};
</script>

<template>
    <div class="w-100">
        <div class="fw-bold fs-2 info-title">구미 5반 짱!!</div>
        <div class="d-flex justify-content-between mt-1 info-writer">
            <div>최요하 | 2024.05.17</div>
            <div class="d-flex">
                <IconLike :width="20" :height="20" :color="'#ff2c51'" :isLike="false" />
                <div class="ms-1">100</div>
            </div>
        </div>
        <hr />
        <div class="row justify-content-between mt-4">
            <div class="col">
                <div class="info-period-title">출발</div>
                <div class="info-period">2024.06.01(토)</div>
            </div>
            <div class="col">
                <div class="info-period-title">복귀</div>
                <div class="info-period">2024.06.30(일)</div>
            </div>
            <div class="col">
                <div class="info-period-title">출발 시간</div>
                <div class="info-period">AM 09:00</div>
            </div>
        </div>
        <div class="d-flex flex-column mt-4">
            <div class="info-period-title">출발지</div>
            <div class="info-period">구미 SSAFY 교육장 입구</div>
        </div>
        <div class="w-100 mt-4">
            <div class="info-intro-title">여행 설명</div>
            <div class="info-intro">
                <QuillEditor theme="" :readOnly="true" @ready="getQuill" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.info-title {
    color: #374553;
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
