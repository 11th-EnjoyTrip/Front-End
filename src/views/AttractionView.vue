<script setup>
import SearchBox from "@/components/Attraction/SearchBox.vue";
import NavComp from "@/components/Nav/NavComp.vue";
import CommonKakaoMap from "@/components/common/CommonKakaoMap.vue";
import SearchItemCard from "@/components/Attraction/SearchItemCard.vue";
import { ref,onMounted } from 'vue';
import { attractionList } from "@/apis/attractionApi";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

const region = ref('0')
const regionName = ref('')
const categorys = ref('12,14,32,15,28,38,39')
const keyword = ref('')

const searchItem = async(...args) => {
  region.value = args[0].value;
  regionName.value = args[1].value;
  categorys.value = args[2].value;
  keyword.value = args[3].value; 

  // args(sido,categorys,keyword)로 서버에서 데이터 불러옴
  page = 1;
  await loadAttractionList();

};

// 서버에서 불러온 데이터
const attractionListData = ref(null)
let page = 1;

const loadAttractionList = async $state => {
  console.log("loading...")
  try {
    console.log(region.value)
    const response =  await attractionList(region.value, categorys.value, keyword.value,page);
    console.log(response.data)

    const jsonData = response.data;

    if (jsonData.length < 20) {
      $state.complete();
    } else {
      attractionListData.value = page === 1 ? jsonData : [...attractionListData.value, ...jsonData];
      console.log(attractionListData.value)
      // $state.loaded();
    }
    page++;
  } catch (error) {
    console.error("Error fetching attraction list:", error);
    // $state.error();
  }
};

onMounted(() => {
  loadAttractionList();
})

</script>

<template>
  <div v-if="attractionListData">
    <NavComp :withLower="true" />
    <SearchBox @search-item="searchItem" />
    <div class="mt-4 mb-5 map-item">
        <CommonKakaoMap :isDraggable="true" :content="attractionListData" />
    </div>
    <hr width="80%" class="mx-auto" />
    <SearchItemCard :regionName="regionName" :dataList="attractionListData" />
    <InfiniteLoading @infinite="loadAttractionList"/>
  </div>
</template>

<style scoped>
.map-item{
  box-sizing: border-box;
  margin : auto;
  width: 80%;
  border: 2.33648px solid #EEEEEE;
  border-radius: 15.5765px;
}
</style>

