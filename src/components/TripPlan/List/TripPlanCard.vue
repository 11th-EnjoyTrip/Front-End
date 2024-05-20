<script setup>
import { ref } from "vue";
import TripPlanCardCarousel from "@/components/TripPlan/List/TripPlanCardCarousel.vue";
import IconLike from "@/components/icons/IconLike.vue";

defineProps({
    detail: Object,
});

const titles = ref(["관광지1", "관광지2", "관광지3", "관광지4", "관광지5"]);
const images = ref([
    "@/assets/noPicture2.png",
    "@/assets/noPicture2.png",
    "@/assets/noPicture2.png",
    "@/assets/noPicture2.png",
    "@/assets/noPicture2.png",
]);
</script>

<template>
    <div class="col px-3 py-2 plan-card">
        <div class="w-100 h-auto">
            <TripPlanCardCarousel :titles="titles" :images="images" />
        </div>
        <div class="w-100 p-3 rounded-bottom-2 info">
            <div class="d-flex align-items-center">
                <div class="fw-bold me-3 trip-title">여행 제목</div>
                <IconLike :width="16" :height="16" :color="'#ff2c51'" :isLike="true" />
                <span class="ms-1 like-count">(100)</span>
            </div>
            <div class="mt-2 detail-info">1박2일 (24.05.17 ~ 24.05.18)</div>
            <div class="mt-1 detail-info">출발지 : 금오산</div>
        </div>
    </div>
</template>

<style scoped>
.plan-card {
    height: 320px;
    transition: all 0.3s ease-in-out;
}

.plan-card:hover {
    transform: scale(1.05);
}

.info {
    height: 120px;
    border-left: 1px solid rgba(225, 225, 225, 0.5);
    border-right: 1px solid rgba(225, 225, 225, 0.5);
    border-bottom: 1px solid rgba(225, 225, 225, 0.5);
}

.trip-title {
    color: #374553;
    font-size: 20px;
}

.like-count {
    font-size: 14px;
}

.detail-info {
    color: #646f7c;
    font-weight: 500;
}
</style>
