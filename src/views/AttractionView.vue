<script setup>
import SearchBox from "@/components/Attraction/SearchBox.vue";
import NavComp from "@/components/Nav/NavComp.vue";
import CommonKakaoMap from "@/components/common/CommonKakaoMap.vue";
import SearchItemCard from "@/components/Attraction/SearchItemCard.vue";
import TheTrainer from "@/components/Chat/TheTrainer.vue";
import ChatButton from "@/components/Chat/ChatButton.vue";
import FooterComp from "@/components/Footer/FooterComp.vue";

import { ref, onMounted } from "vue";
import { attractionList } from "@/apis/attractionApi";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

const region = ref("0");
const regionName = ref("");
const categorys = ref("12,14,32,15,28,38,39");
const keyword = ref("");

const showChat = ref(false);

const handleShowChat = () => {
    showChat.value = !showChat.value;
};

const searchItem = async (...args) => {
    region.value = args[0].value;
    regionName.value = args[1].value;
    categorys.value = args[2].value;
    keyword.value = args[3].value;

    // args(sido,categorys,keyword)로 서버에서 데이터 불러옴
    page.value = 0;
    await loadAttractionList();
};

// 서버에서 불러온 데이터
const attractionListData = ref(null);
const page = ref(0);

const loadAttractionList = async ($state) => {
    await attractionList(region.value, categorys.value, keyword.value, page.value)
        .then((response) => {
            if (page.value == 0) {
                attractionListData.value = [...response.data];
            } else {
                attractionListData.value = [...attractionListData.value, ...response.data];

                if (response.data.length < 20) $state.complete();
                else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) $state.loaded();
            }
            page.value++;
        })
        .catch((error) => {
            console.log(error);
            $state.error();
        });
};

onMounted(() => {
    loadAttractionList();
});
</script>

<template>
    <div>
        <div v-if="attractionListData">
            <NavComp :withLower="true" />
            <SearchBox @search-item="searchItem" />
            <div v-if="attractionListData.length" class="mt-4 mb-5 map-item">
                <CommonKakaoMap :content="attractionListData" />
            </div>
            <hr width="90%" style="max-width: 1200px" class="mx-auto" />
            <div>
                <SearchItemCard :regionName="regionName" :dataList="attractionListData" />
                <InfiniteLoading @infinite="loadAttractionList">
                    <template #complete>
                        <div>
                            <span></span>
                        </div>
                    </template>
                </InfiniteLoading>
            </div>
            <FooterComp />
        </div>
        <ChatButton @showTrainer="handleShowChat" />
        <div v-if="showChat">
            <TheTrainer @showTrainer="handleShowChat" />
        </div>
    </div>
</template>

<style scoped>
.map-item {
    box-sizing: border-box;
    margin: auto;
    width: 90%;
    max-width: 1200px;
    border: 2.33648px solid #eeeeee;
    border-radius: 15.5765px;
}
</style>
