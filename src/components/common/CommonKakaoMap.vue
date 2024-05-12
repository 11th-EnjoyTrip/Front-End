<script setup>
import { ref } from 'vue';
import { KakaoMap, KakaoMapCustomOverlay, KakaoMapMarker } from 'vue3-kakao-maps';
import CommonKakaoMapInfoWindow from './CommonKakaoMapInfoWindow.vue';

const props = defineProps({
  isDraggable: Boolean,
  dataList: Array
});
console.log(props.dataList)
const map = ref();

const overlay = ref(null);

const visibleRef = props.dataList.map((item, index) => index === 0 ? ref(true) : ref(false));

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

  props.dataList.forEach((markerInfo) => {
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
};

const onLoadKakaoMapCustomOverlay = (newCustomOverlay) => {
  overlay.value = newCustomOverlay;
};


</script>

<template>
  <KakaoMap :draggable="isDraggable" width="100%" class="kakao-map-item" :lat="dataList[0].latitude" :lng="dataList[0].longitude" 
  @onLoadKakaoMap="onLoadKakaoMap" >
    <template v-for="(data, index) in dataList" :key="index">
      <KakaoMapMarker
          :lat="data.latitude"
          :lng="data.longitude"
          :clickable="true"
          @onClickKakaoMapMarker="onClickMapMarker(index)"
      />
      <KakaoMapCustomOverlay
        :lat="data.latitude"
        :lng="data.longitude"
        :yAnchor="1.27"
        @onLoadKakaoMapCustomOverlay="onLoadKakaoMapCustomOverlay"
        :visible="visibleRef[index].value"
      >
        <router-link :to="`attraction/${data.contentId}`" >
            <CommonKakaoMapInfoWindow :title="data.title" :content-type-name="data.contentTypeName" :first-image="data.firstImage"/>
        </router-link>
        
      </KakaoMapCustomOverlay>
    </template>
  </KakaoMap>
</template>

<style scoped>

.kakao-map-item{
  border-radius: 14px;
}


a {
  text-decoration: none;
}

</style>