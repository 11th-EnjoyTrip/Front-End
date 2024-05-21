<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import TripPlanAddSearch from "@/components/TripPlan/Write/Map/TripPlanAddSearch.vue";
import TripPlanAddSelect from "@/components/TripPlan/Write/Map/TripPlanAddSelect.vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useEditTripPlanStore } from "@/stores/editTripPlan";

const store = useEditTripPlanStore();
const { pinned } = storeToRefs(store);
const map = ref();
const onLoadKakaoMap = (mapRef) => (map.value = mapRef);
</script>

<template>
    <div class="add-map-container">
        <KakaoMap
            :width="'100%'"
            :height="'100%'"
            :lat="pinned[0]"
            :lng="pinned[1]"
            class="add-map"
            @onLoadKakaoMap="onLoadKakaoMap"
        >
            <KakaoMapMarker :lat="pinned[0]" :lng="pinned[1]" />
        </KakaoMap>
        <TripPlanAddSearch />
        <TripPlanAddSelect />
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
