<script setup>
import { computed, ref, watch, nextTick } from "vue";
import { KakaoMap, KakaoMapCustomOverlay, KakaoMapMarker } from "vue3-kakao-maps";
import CommonKakaoMapInfoWindow from "./CommonKakaoMapInfoWindow.vue";

const props = defineProps({
    isDraggable: {
        type: Boolean,
        default: true,
    },
    content: Array,
});
const map = ref();
const overlay = ref(null);
let visibleRef = props.content.map((item, index) => (index === 0 ? ref(true) : ref(false)));

//마커 클릭 시 인포윈도우의 visible 값을 반전
const onClickMapMarker = (index) => {
    visibleRef[index].value = !visibleRef[index].value;
};

// 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
let bounds;

const onLoadKakaoMap = (mapRef) => {
    map.value = mapRef;
    bounds = new kakao.maps.LatLngBounds();
    let point;

    props.content.forEach((markerInfo) => {
        // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
        point = new kakao.maps.LatLng(markerInfo.latitude, markerInfo.longitude);

        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(point);
    });

    setBounds();
};

const setBounds = () => {
    // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
    // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
    if (map.value !== undefined) {
        map.value.setBounds(bounds);
    }
    map.value.setDraggable(props.isDraggable);

};

const onLoadKakaoMapCustomOverlay = (newCustomOverlay) => {
    overlay.value = newCustomOverlay;
};

watch(
    () => props.content.length,
    () => {
        onLoadKakaoMap(map.value);
        visibleRef = props.content.map((item, index) => (index === 0 ? ref(true) : ref(false)));
    }
);
</script>

<template style="background-color: white;" >
  <KakaoMap width="100%" class="kakao-map-item" :lat="content[0].latitude" :lng="content[0].longitude" 
  @onLoadKakaoMap="onLoadKakaoMap" >
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
        :visible="visibleRef[index].value"
        >
            <router-link :to="`attraction/${data.contentId}`" >
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
