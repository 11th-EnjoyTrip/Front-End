<script setup> 
import IconClick from '@/components/icons/IconClick.vue';
const props = defineProps({
    title : String,
    contentTypeName : String,
    firstImage: String
})
</script>

<template>
    <div class="card" style="padding: 1px; background-color: white; border: 0.64785px solid #EEEEEE;
                box-shadow: 0px 2.5914px 2.5914px rgba(0, 0, 0, 0.25);border-radius: 9.71774px; display: flex;">
            <div class="img-card">
                <img :src="firstImage" width="100%" height="120px" style="border-radius: 9.71774px 9.71774px 0px 0px; min-width: 210px;"/>
            </div>
            <div class="d-flex" style="flex-wrap: wrap; justify-content: space-between; margin: 8px;">
              <div class="d-flex">
                <div style="font-weight: 700;font-size: 15px; text-overflow: ellipsis;">{{ title }}</div>
                <div style="margin-left: 3px; margin-top: 6px; border-left: 0.64785px solid #666666; color: #666666;  height : 12px;"></div>
                <div class="content-type" style="">{{ contentTypeName }}</div>
              </div>
              <div class="d-flex info-text">
                <IconClick width="16" height="16" color="#666666" />
                <div style="margin-top: 2px;">클릭시 상세보기</div>
              </div>
            </div> 
          </div>
</template>

<style scoped>
.img-card{
  align-items: center;
  margin: auto;
}

.info-text{
  padding-right: 5px;
  padding-top: 3px;
  padding-bottom: 3px;
  font-size: 9px;
  background: #EEEEEE;
  border-radius: 5px;
}

a {
  text-decoration: none;
}

.content-type{
  margin-left: 3px;
  margin-top:3px;
  font-weight: 500;
  font-size: 13px;
  color: #666666;
}

</style>
/* 라인 */

position: absolute;
width: 7.13px;
height: 0px;
left: 70.62px;
top: 99.77px;

border: 0.64785px solid #666666;
transform: rotate(90deg);
