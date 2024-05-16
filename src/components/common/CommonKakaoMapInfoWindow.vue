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
                box-shadow: 0px 2.5914px 2.5914px rgba(0, 0, 0, 0.25);border-radius: 9.71774px; display: flex;
                max-height: 175px; max-width: 175px;">
      <div class="img-card">
          <img v-if="firstImage" :src="firstImage" style="border-radius: 8px 8px 0px 0px; "/>
          <img v-else src="@/assets/noPicture2.png" style="border-radius: 9px 9px 0px 0px;">
      </div>
      <div class="d-flex" style="flex-wrap: wrap; justify-content: space-between; margin: 8px;">
        <div class="d-flex">
          <div class="card-title">{{ title }}</div>
          <div style="margin-top: 6px; border-left: 0.64785px solid #666666; color: #666666;  height : 12px;"></div>
          <div class="content-type" style="">{{ contentTypeName }}</div>
        </div>
        <div class="d-flex info-text">
          <IconClick :width="13" :height="13" :color="'#666666'" />
          <div style="margin-top: 2px;">클릭시 상세보기</div>
        </div>
      </div> 
    </div>
</template>

<style scoped>


.card-title{
  font-weight: 700;
  font-size: 13px;
  max-width: 95px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 2px;
}

img{
  max-width: 150px;
  max-height: 100px;
  object-fit: fill;
  margin-top: 1px;
}
.img-card{
  align-items: center;
  margin: auto;
}

.info-text{
  padding-right: 5px;
  padding-top: 1px;
  padding-bottom: 3px;
  font-size: 7px;
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
  font-size: 10px;
  color: #666666;
}

</style>