<script setup>
import { KakaoMap } from "vue3-kakao-maps";
import TripPlanAddSearch from "@/components/TripPlan/Write/Map/TripPlanAddSearch.vue";
</script>

<template>
    <div class="add-map-container">
        <KakaoMap :width="'100%'" :height="'100%'" :lat="37.514575" :lng="127.0495556" class="add-map" />
        <TripPlanAddSearch />
    </div>
</template>

<style scoped>
.add-map-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 110px);
}

.add-map {
    position: absolute;
}
</style>
