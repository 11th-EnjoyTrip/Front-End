<script setup>
import TripPlanAddSearchResultCard from "@/components/TripPlan/Write/Map/TripPlanAddSearchResultCard.vue";
import { useTripPlanStore } from "@/stores/tripPlan.js";
import { storeToRefs } from "pinia";

const store = useTripPlanStore();
const { pinLat, pinLng } = storeToRefs(store);
const changeLatLng = () => {
    pinLat.value = 37.514575;
    pinLng.value = 127.0495556;
};
</script>

<template>
    <div class="add-search-result-sub-title">경상북도 / 음식점 / 미나리 삼겹살</div>
    <TripPlanAddSearchResultCard v-for="(v, i) in 5" :key="i" :type="'add'" @click="changeLatLng" />
</template>

<style scoped>
.add-search-result-sub-title {
    font-weight: 600;
    font-size: 16px;
    color: #374553;
}

.add-search-content-box {
    display: flex;
    align-items: center;
    height: 50px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-top: 8px;
}

.add-search-content-title {
    font-size: 16px;
    font-weight: 500;
    color: #374553;
    text-align: center;
    line-height: 50px;
}
</style>
