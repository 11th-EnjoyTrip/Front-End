<script setup>
import {ref} from 'vue';
import IconNoSearch from '../icons/IconNoSearch.vue';

// 사진 없는 경우도 고려하기!!!
const attractionList = ref([
    {
        contentId : 125266,
        contentTypeId : 12,
        contentTypeName : '관광지',
        title : '국립 청태산자연휴양림',
        firstImage : "https://tong.visitkorea.or.kr/cms/resource/21/2657021_image2_1.jpg",
        sidoCode : 32,
        sidoName : '강원도'
    },
    {
        contentId : 132366,
        contentTypeId : 38,
        contentTypeName : '쇼핑',
        title : '포항 죽도시장',
        firstImage : "https://tong.visitkorea.or.kr/cms/resource/88/2678388_image2_1.jpg",
        sidoCode : 32,
        sidoName : '강원도'
    },
    {
        contentId : 132367,
        contentTypeId : 38,
        contentTypeName : '쇼핑',
        title : '포항 죽도시장',
        firstImage : '',
        sidoCode : 32,
        sidoName : '강원도'
    },
    {
        contentId : 125266,
        contentTypeId : 12,
        contentTypeName : '관광지',
        title : '국립 청태산자연휴양림',
        firstImage : "https://tong.visitkorea.or.kr/cms/resource/21/2657021_image2_1.jpg",
        sidoCode : 32,
        sidoName : '강원도'
    },
    {
        contentId : 132366,
        contentTypeId : 38,
        contentTypeName : '쇼핑',
        title : '포항 죽도시장',
        firstImage : "https://tong.visitkorea.or.kr/cms/resource/88/2678388_image2_1.jpg",
        sidoCode : 32,
        sidoName : '강원도'
    },
    {
        contentId : 132367,
        contentTypeId : 38,
        contentTypeName : '쇼핑',
        title : '포항 죽도시장',
        firstImage : '',
        sidoCode : 32,
        sidoName : '강원도'
    },
])
</script>

<template>
    <div v-if="attractionList.length">
        <div class="d-flex mb-4 mt-3">
            <div style="color: #1769FF;font-weight: 700;font-size: 32px; padding-left: 10%; padding-right: 5px;">
                제주도 관광지</div>
            <div class="mt-3">로 여기 어때요?</div>
        </div>
        <div class="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4 mx-auto searchitem-card">
            <div class="col position-relative"
                v-for="attraction in attractionList" :key="attraction.contentId">
                <router-link :to="`attraction/${attraction.contentId}`">
                    <div class="card" style="box-sizing: border-box; border-radius: 25px; border:0">
                        <img v-if="attraction.firstImage" :src="attraction.firstImage"
                            style="border-radius: 25px;border: 1px solid rgba(0, 0, 0, 0.1); ">
                        <img v-else src="@/assets/noPicture2.png"
                            style="border-radius: 25px;border: 1px solid rgba(0, 0, 0, 0.1); ">
                        <div class="card-body position-absolute bottom-0 start-0 ms-2 mb-2"
                            style="background: radial-gradient(50% 50% at 50% 50%, rgba(40, 38, 38, 0.32) 50%,
                            rgba(40, 38, 38, 0.23) 70%, rgba(225, 225, 225, 0) 100%) !important;">
                            <div style="color: #ffffff; font-weight: 700; font-size: 15px;">
                                {{attraction.title}}</div>
                            <div style="color: #ffffff; font-weight: 500; font-size: 10px; ">
                                {{attraction.contentTypeName}} • {{attraction.sidoName}}</div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
    <div v-else style="margin:8%">
        <IconNoSearch style="width: 100%;" width="50" height="50" color="#1769FF"/>
        <div style=" font-weight: 700;font-size: 23.224px;line-height: 34px; text-align: center;">검색 결과가 없어요</div>
        <div style="font-weight: 500;font-size: 17.8051px;line-height: 26px;color: #999999; text-align: center;">다시 검색해 주세요.</div>
    </div>
    
</template>

<style scoped>
.searchitem-card{
    width: 80% !important;
    margin-bottom: 60px;
}
</style>

