<script setup>
import { KakaoMap, KakaoMapMarkerPolyline } from "vue3-kakao-maps";
import { useTripPlanStore } from "@/stores/tripPlan";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

const props = defineProps({
    day: Number,
});

const store = useTripPlanStore();
const { days, markerList, latis, longs } = storeToRefs(store);
const newMarkerList = ref([]);
onMounted(() => {
    for (let i = 0; i < days.value[props.day]; i++) {
        newMarkerList.value.push({
            lat: latis.value[props.day][i],
            lng: longs.value[props.day][i],
        });
    }
});

const map = ref();
let bounds;
const onLoadKakaoMap = (mapRef) => {
    map.value = mapRef;
    bounds = new kakao.maps.LatLngBounds();

    let point;
    latis.value[props.day].forEach((lati, idx) => {
        point = new kakao.maps.LatLng(lati, longs.value[props.day][idx]);
        bounds.extend(point);
    });

    map.value.setBounds(bounds);
    map.value.setDraggable(true);
};
</script>

<template>
    <div class="days-map">
        <div class="days-map-badges">
            <a-checkable-tag v-for="(v, i) in days[day]" :key="i" v-model:checked="markerList[day][i]">{{
                i + 1
            }}</a-checkable-tag>
        </div>
        <KakaoMap
            :width="'100%'"
            :height="700"
            :lat="latis[day][0]"
            :lng="longs[day][0]"
            @onLoadKakaoMap="onLoadKakaoMap"
        >
            <!-- <div v-for="(lati, i) in latis[day]" :key="i">
                <KakaoMapMarker :lat="lati" :lng="longs[day][i]" :clickable="false" />
            </div> -->
            <KakaoMapMarkerPolyline :markerList="newMarkerList" :endArrow="true" />
        </KakaoMap>
    </div>
</template>

<style scoped>
.days-map {
    position: relative;
    width: 65%;
    height: 700px;
    margin-top: 40px;
}

.days-map-badges {
    position: absolute;
    top: 10px;
    right: 0;
    padding: 5px 0 5px 5px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.75);
    z-index: 100;
}

.days-map-badges::-webkit-scrollbar {
    scrollbar-width: 0;
}
</style>
