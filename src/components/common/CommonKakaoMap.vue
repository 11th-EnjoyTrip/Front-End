<script setup>
import { KakaoMap } from 'vue3-kakao-maps';
</script>


<template>
  <div>
    <KakaoMap widht="100" class="kakao-map-item"  width="100%"
    :lat="33.450701" :lng="126.570667" >
    </KakaoMap>
  </div>
</template>


<style scoped>


.kakao-map-item{
  border-radius: 14px;
}

</style> 