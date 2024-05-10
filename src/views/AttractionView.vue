<script setup>
import SearchBox from "@/components/Attraction/SearchBox.vue";
import NavComp from "@/components/Nav/NavComp.vue";
import CommonKakaoMap from "@/components/common/CommonKakaoMap.vue";
import SearchItemCard from "@/components/Attraction/SearchItemCard.vue";
import { ref } from 'vue';

const searchItem = (...args) => {
  console.log(args)
  // args(sido,category,keyword)로 서버에서 데이터 불러옴
  // TODO : 서버 연동
}

// 서버에서 불러온 데이터
const attractionList = ref([
    {
        contentId : 125266,
        contentTypeId : 12,
        contentTypeName : '관광지',
        title : '국립 청태산자연휴양림',
        firstImage : "https://tong.visitkorea.or.kr/cms/resource/21/2657021_image2_1.jpg",
        sidoCode : 32,
        sidoName: '강원도',
        latitude:37.52251412,
        longitude:128.2919115
    },
    {
        contentId : 132366,
        contentTypeId : 38,
        contentTypeName : '쇼핑',
        title : '포항 죽도시장',
        firstImage : "https://tong.visitkorea.or.kr/cms/resource/88/2678388_image2_1.jpg",
        sidoCode : 32,
        sidoName: '강원도',
        latitude: 36.03646287,
        longitude: 129.3681706
    },
    // {
    //     contentId : 132367,
    //     contentTypeId : 38,
    //     contentTypeName : '쇼핑',
    //     title : '포항 죽도시장',
    //     firstImage : '',
    //     sidoCode : 32,
    //     sidoName : '강원도'
    // },
    // {
    //     contentId : 125266,
    //     contentTypeId : 12,
    //     contentTypeName : '관광지',
    //     title : '국립 청태산자연휴양림',
    //     firstImage : "https://tong.visitkorea.or.kr/cms/resource/21/2657021_image2_1.jpg",
    //     sidoCode : 32,
    //     sidoName : '강원도'
    // },
    // {
    //     contentId : 132366,
    //     contentTypeId : 38,
    //     contentTypeName : '쇼핑',
    //     title : '포항 죽도시장',
    //     firstImage : "https://tong.visitkorea.or.kr/cms/resource/88/2678388_image2_1.jpg",
    //     sidoCode : 32,
    //     sidoName : '강원도'
    // },
    // {
    //     contentId : 132367,
    //     contentTypeId : 38,
    //     contentTypeName : '쇼핑',
    //     title : '포항 죽도시장',
    //     firstImage : '',
    //     sidoCode : 32,
    //     sidoName : '강원도'
    // },
])

</script>

<template>
  <div>
    <NavComp :withLower="true" />
    <SearchBox @search-item="searchItem" />
    <div class="mt-4 mb-5 map-item">
        <CommonKakaoMap :isDraggable="true" :dataList="attractionList" />
    </div>
    <hr width="80%" class="mx-auto" />
    <SearchItemCard :dataList="attractionList"/>
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

