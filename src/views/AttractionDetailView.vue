<template >
    <div>
        <NavComp :withLower="true" />
        <div class="mx-auto m-5 attraction-detail-view">
            <div class="card g-4" 
                style="box-sizing: border-box; border-radius: 25px; border:0;">
                <img v-if="content.firstImage" :src="content.firstImage"
                    style="border-radius: 20px;border: 1px solid rgba(0, 0, 0, 0.1); ">
            </div>
            <DetailContents v-bind:item-content="content"/>
            <DetailMap/>
        </div>
    </div>
</template>

<script setup>
import NavComp from "@/components/Nav/NavComp.vue";
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import DetailContents from '@/components/AttractionDetail/DetailContents.vue';
import DetailMap from '@/components/AttractionDetail/DetailMap.vue';

const route = useRoute()
const contentId = ref(route.params.id)
const content = ref({
        contentId : 125266,
        contentTypeId: 12,
        addr1: "강원도 횡성군 둔내면 청태산로 610",
        addr2: "(부남면)", 
        zipcode: "25261", 
        tel: "010-9085-9464", // 없는거 많음
        contentTypeName : '관광지',
        title : '국립 청태산자연휴양림',
        firstImage : "https://tong.visitkorea.or.kr/cms/resource/21/2657021_image2_1.jpg",
        sidoCode : 32,
        sidoName: '강원도',
        overview: "해발 1,200m의 청태산을 주봉으로 하여 인공림과 천연림이 잘 조화된 울창한 산림을 바탕으로 한 국유림 경영 시범단지로서 숲속에는 온갖 야생 동식물이 고루 서식하고 있어 자연박물관을 찾은 기분을 느낄 수 있다. 영동고속도로 신갈기점 강릉방향 128km 지점에 위치하고 있어 여름철 동해안 피서객들이 잠시 쉬었다 가기에 편리하고, 청소년의 심신수련을 위한 숲속교실도 설치되어 있으며 울창한 잣나무 숲속의 산림욕장은 한번왔다간 사람은 누구나 매료되어 찾는 곳이기도 하다. ",
    })

const contentItem = (contentId) => {
    // 서버에서 데이터 조회해서 저장
}

</script>

<style scoped>
.attraction-detail-view{
    width: 65% !important;
}
</style>