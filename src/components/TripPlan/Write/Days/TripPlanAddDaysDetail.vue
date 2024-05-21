<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { useEditTripPlanStore } from "@/stores/editTripPlan.js";
import { storeToRefs } from "pinia";
import { ref, onMounted, watch } from "vue";

const props = defineProps({
    day: Number,
});

const store = useEditTripPlanStore();
const { daysSelected, markerLists } = storeToRefs(store);
const newMarkerList = ref([]);
onMounted(() => {
    daysSelected.value[props.day].forEach((v, i) => {
        newMarkerList.value.push({
            lat: v.latitude,
            lng: v.longitude,
        });
    });
});

const map = ref();
const onLoadKakaoMap = (mapRef) => {
    map.value = mapRef;
    let bounds = new kakao.maps.LatLngBounds();

    daysSelected.value[props.day].forEach((v) => {
        bounds.extend(new kakao.maps.LatLng(v.latitude, v.longitude));
    });

    map.value.setBounds(bounds);
    map.value.setDraggable(false);
    map.value.setZoomable(false);
    getInfo();
};
let polyLines = [];
let overlays = [];
const getInfo = () => {
    if (polyLines.length > 0) {
        polyLines.forEach((pl) => pl.setMap(null));
        polyLines = [];
    }

    if (overlays.length > 0) {
        overlays.forEach((ol) => ol.setMap(null));
        overlays = [];
    }

    if (markerLists.value[props.day].length > 1) {
        for (let i = 0; i < markerLists.value[props.day].length - 1; i++) {
            if (!markerLists.value[props.day][i]) continue;
            if (!markerLists.value[props.day][i + 1]) continue;

            let polyLine = new kakao.maps.Polyline({
                map: map.value,
                path: [
                    new kakao.maps.LatLng(newMarkerList.value[i].lat, newMarkerList.value[i].lng),
                    new kakao.maps.LatLng(newMarkerList.value[i + 1].lat, newMarkerList.value[i + 1].lng),
                ],
                strokeWeight: 3,
                strokeColor: "#db4040",
                strokeOpacity: 1,
                strokeStyle: "solid",
                endArrow: true,
            });
            polyLines.push(polyLine);
        }

        polyLines.forEach((pl) => {
            let distance = Math.round(pl.getLength());

            var walkkTime = (distance / 67) | 0;
            var walkHour = "",
                walkMin = "";
            if (walkkTime > 60) walkHour = '<span class="number">' + Math.floor(walkkTime / 60) + "</span>시간 ";
            walkMin = '<span class="number">' + (walkkTime % 60) + "</span>분";

            var carTime = (distance / 1667) | 0;
            var carHour = "",
                carMin = "";
            if (carTime > 60) carHour = '<span class="number">' + Math.floor(carTime / 60) + "</span>시간 ";
            carMin = '<span class="number">' + (carTime % 60) + "</span>분";

            var content = '<ul class="dotOverlay distanceInfo">';
            content += "    <li>";
            content +=
                '        <span class="label">총거리</span><span class="number">' +
                Math.round(distance / 1000) +
                "</span>km";
            content += "    </li>";
            content += "    <li>";
            content += '        <span class="label">도보</span>' + walkHour + walkMin;
            content += "    </li>";
            content += "    <li>";
            content += '        <span class="label">자동차</span>' + carHour + carMin;
            content += "    </li>";
            content += "</ul>";

            overlays.push(
                new kakao.maps.CustomOverlay({
                    map: map.value,
                    content: content,
                    position: pl.getPath()[1],
                    xAnchor: 0,
                    yAnchor: 0,
                    zIndex: 3,
                })
            );
        });
    }
};
watch(newMarkerList, () => {
    getInfo();
});
watch(daysSelected.value[props.day], () => {
    let bounds = new kakao.maps.LatLngBounds();

    daysSelected.value[props.day].forEach((v) => {
        bounds.extend(new kakao.maps.LatLng(v.latitude, v.longitude));
    });

    map.value.setBounds(bounds);
    map.value.setDraggable(false);
    map.value.setZoomable(false);
    getInfo();
});
</script>

<template>
    <div class="days-map">
        <div class="days-map-badges">
            <a-checkable-tag
                v-for="(v, i) in daysSelected[day]"
                :key="i"
                v-model:checked="markerLists[day][i]"
                @click="getInfo"
                >{{ i + 1 }}</a-checkable-tag
            >
        </div>
        <KakaoMap
            v-if="newMarkerList.length > 0"
            :width="'100%'"
            :height="700"
            :lat="newMarkerList[0].lat"
            :lng="newMarkerList[0].lng"
            @onLoadKakaoMap="onLoadKakaoMap"
        >
            <div v-for="(v, i) in markerLists[day]" :key="i">
                <KakaoMapMarker :lat="newMarkerList[i].lat" :lng="newMarkerList[i].lng" :clickable="true" />
            </div>
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
