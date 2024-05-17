<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import { ref } from "vue";
import { Carousel, Slide, Navigation } from "vue3-carousel";

const quill = ref(null);
const getQuill = (q) => {
    quill.value = q;
    quill.value.root.innerHTML = "<p>helllo</p>";
};

const settings = ref({
    itemsToShow: 1,
    snapAlign: "center",
});
const breakpoints = ref({
    0: {
        itemsToShow: 1,
        snapAlign: "center",
    },
});
</script>

<template>
    <div class="col-9 mx-auto detail-container">
        <div class="text-center fw-bold title">여행계획 정보</div>

        <div class="w-100 d-flex justify-content-evenly mt-5">
            <div class="detail-info">
                <div class="fw-bold fs-2 info-title">구미 5반 짱!!</div>

                <div class="mt-1 info-writer">최요하 | 2024.05.17</div>

                <hr />

                <div class="w-100 row justify-content-between mt-4">
                    <div class="col-5 fw-bold fs-5">
                        출발
                        <div class="mt-1 info-period">2024.06.01(토)</div>
                    </div>
                    <div class="col-5 fw-bold fs-5">
                        도착
                        <div class="mt-1 info-period">2024.06.30(일)</div>
                    </div>
                </div>

                <div class="w-100 mt-4">
                    <div class="fw-bold fs-5">여행 설명</div>
                    <div class="w-100 rounded-2 mt-1 info-intro">
                        <QuillEditor theme="" :readOnly="true" @ready="getQuill" />
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column detail-img">
                <Carousel :settings="settings" :breakpoints="breakpoints" :wrap-around="true">
                    <Slide v-for="slide in 5" :key="slide">
                        <img class="w-100 object-fit-cover rounded-top-3" src="@/assets/noPicture2.png" />
                    </Slide>

                    <template #addons>
                        <Navigation />
                    </template>
                </Carousel>
                <div class="w-100 h-100 d-flex justify-content-center align-items-center">hello</div>
            </div>
        </div>

        <div class="plan-days"></div>
    </div>
</template>

<style scoped>
.detail-container {
    max-width: 1200px;
    margin-top: 60px;
}

.title {
    font-size: 24px;
    color: #374553;
}

.detail-info {
    width: 40%;
}

.info-title {
    color: #374553;
}

.info-writer {
    color: #999999;
    font-size: 14px;
}

.info-period {
    color: #646f7c;
    font-size: 16px;
}

.info-intro {
    min-height: 250px;
    border: 1px solid #e1e1e1;
}

.detail-img {
    width: 40%;
}
</style>
