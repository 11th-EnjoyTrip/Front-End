<script setup>
import NavComp from "@/components/Nav/NavComp.vue";
import DetailContents from '@/components/AttractionDetail/DetailContents.vue';
import DetailMap from '@/components/AttractionDetail/DetailMap.vue';
import { useRouter } from 'vue-router';
import { onMounted } from "vue";
import { attractionDetail } from "@/apis/attractionApi";
import {ref, computed} from "vue"

const router = useRouter();
const content = ref(null);

onMounted(async () => {
  await attractionDetail(router.currentRoute.value.params.id)
    .then(response => {
      console.log(response.data);
      content.value = {...response.data}
    }).catch(error => console.log(error));
})

const getContent = computed(() => {
  console.log(1211)
  return content.value;
})

</script>

<template>
  <div>
    <NavComp :withLower="true" />
    <div v-if="content" class="mx-auto m-5 attraction-detail-view">
      <div class="card g-4" style="box-sizing: border-box; border-radius: 25px; border:0;">
        <img v-if="content.firstImage" :src="content.firstImage" style="border-radius: 20px;border: 1px solid rgba(0, 0, 0, 0.1);">
        <img v-else src="@/assets/noPicture2.png" width="100%" height="40%" style="border-radius: 20px;border: 1px solid rgba(0, 0, 0, 0.1);">
      </div>
      <DetailContents :content="getContent"/>
      <DetailMap :content="getContent"/>
    </div>
  </div>
</template>
<style scoped>
.attraction-detail-view {
  width: 65% !important;
}
</style>
