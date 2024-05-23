<script setup>
import { ref, watch } from "vue";
import { KakaoMap, KakaoMapCustomOverlay, KakaoMapMarker } from "vue3-kakao-maps";
import CommonKakaoMapInfoWindow from "./CommonKakaoMapInfoWindow.vue";
import { useAttractionStore } from "@/stores/attraction";
import { storeToRefs } from "pinia";

const props = defineProps({
    isDraggable: {
        type: Boolean,
        default: true,
    },
    content: Array,
});
const store = useAttractionStore();
const { curLatLng } = storeToRefs(store);
const map = ref();
const overlay = ref(null);
const visibleRef = ref(props.content.map((item, idx) => (idx == 0 ? true : false)));

//마커 클릭 시 인포윈도우의 visible 값을 반전
const onClickMapMarker = (index) => {
    visibleRef.value[visibleRef.value.indexOf(true)] = false;
    visibleRef.value[index] = true;
};

const onLoadKakaoMap = (mapRef) => {
    map.value = mapRef;
    map.value.setDraggable(props.isDraggable);
    map.value.setZoomable(true);
    curLatLng.value.lat = props.content[0].latitude + 0.001;
    curLatLng.value.lng = props.content[0].longitude;
};

const onLoadKakaoMapCustomOverlay = (newCustomOverlay) => {
    overlay.value = newCustomOverlay;
};

watch(
    () => props.content.length,
    () => {
        onLoadKakaoMap(map.value);
        visibleRef.value = props.content.map((item, index) => (index === 0 ? true : false));
    }
);
watch(curLatLng.value, () => {
    visibleRef.value[visibleRef.value.indexOf(true)] = false;
    props.content.forEach((c, i) => {
        if (c.latitude + 0.001 == curLatLng.value.lat && c.longitude == curLatLng.value.lng) {
            visibleRef.value[i] = true;
        }
    });
});
</script>

<template style="background-color: white">
    <KakaoMap
        width="100%"
        class="kakao-map-item"
        :lat="curLatLng.lat"
        :lng="curLatLng.lng"
        @onLoadKakaoMap="onLoadKakaoMap"
    >
        <div v-for="(data, index) in content" :key="index">
            <KakaoMapMarker
                :lat="data.latitude"
                :lng="data.longitude"
                :clickable="true"
                :image="{
                    imageSrc: `/src/assets/marker/${data.contentTypeId}.png`,
                    imageWidth: 42,
                    imageHeight: 42,
                }"
                @onClickKakaoMapMarker="onClickMapMarker(index)"
            />
            <KakaoMapCustomOverlay
                :lat="data.latitude"
                :lng="data.longitude"
                :y-anchor="1.3"
                :z-index="20"
                @onLoadKakaoMapCustomOverlay="onLoadKakaoMapCustomOverlay"
                :visible="visibleRef[index]"
            >
                <router-link :to="`attraction/${data.contentId}`">
                    <CommonKakaoMapInfoWindow
                        :title="data.title"
                        :content-type-name="data.contentTypeName"
                        :first-image="data.firstImage"
                    />
                </router-link>
            </KakaoMapCustomOverlay>
        </div>
    </KakaoMap>
</template>

<style scoped>
.kakao-map-item {
    border-radius: 14px;
}

a {
    text-decoration: none;
}
</style>
