<script setup>
import TripPlanDetailInfo from "@/components/TripPlan/Detail/TripPlanDetailInfo.vue";
import TripPlanDays from "@/components/TripPlan/Days/TripPlanDays.vue";
</script>

<template>
    <div class="mx-auto col-9 detail-container">
        <div class="text-center fw-bold title">여행계획 정보</div>
        <div class="mt-5 w-100 d-flex justify-content-evenly">
            <TripPlanDetailInfo />
        </div>
        <TripPlanDays />
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
</style>
