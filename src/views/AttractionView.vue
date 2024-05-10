<template>
    <NavComp :withLower="true" />
    <SearchBox/>
    <div class="mt-4 mb-5 map-item">
        <CommonKakaoMap :isDraggable="true" />
    </div>
    <hr width="80%" class="mx-auto" />
    <SearchItemCard/>
</template>

<script setup>
import SearchBox from "@/components/Attraction/SearchBox.vue";
import NavComp from "@/components/Nav/NavComp.vue";
import SearchItemCard from "@/components/Attraction/SearchItemCard.vue";
import CommonKakaoMap from "@/components/common/CommonKakaoMap.vue";



</script>

<style scoped>
.map-item{
  box-sizing: border-box;
  margin : auto;
  width: 80%;
  border: 2.33648px solid #EEEEEE;
  border-radius: 15.5765px;
}
</style>

