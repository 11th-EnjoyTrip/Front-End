
<template>
    <div class="mt-5">
       <div style="font-weight: 700;font-size: 22px;line-height: 32px; color: #14181B; margin-left: 10px">
        위치</div> 
        <div class="mt-3 map-item">
            <CommonKakaoMap :isDraggable="false" :dataList="[itemContent]"  />
        </div>
    </div>
</template>

<script setup>
import CommonKakaoMap from '@/components/common/CommonKakaoMap.vue';
import {ref} from 'vue';

const props = defineProps({
    itemContent: Object
})
</script>

<style scoped>
.map-item{
  box-sizing: border-box;
  margin : auto;
  width : 100%;
  border: 2.33648px solid #EEEEEE;
  border-radius: 15.5765px;
}
</style>
