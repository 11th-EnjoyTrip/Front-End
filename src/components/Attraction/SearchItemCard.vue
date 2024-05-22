<script setup>
import { useAttractionStore } from "@/stores/attraction";
import IconNoSearch from "../icons/IconNoSearch.vue";

const props = defineProps({
    dataList: Array,
    regionName: String,
});

const store = useAttractionStore();

const searchAttr = async (attrId) => {
    await store.changeAttrId(attrId);
};
</script>

<template>
    <div v-if="dataList.length">
        <div class="d-flex mb-4 mx-auto attr-style" style="width: 100%; max-width: 1200px; padding-left: 2%">
            <!-- 삼항 연산자를 이용하여 displayRegion 값이 null이 아닌 경우에만 출력 -->
            <div style="color: #1769ff; font-weight: 700; font-size: 25px; padding-right: 5px">
                {{ regionName }} 관광지
            </div>
            <div class="mt-2">로 여기 어때요?</div>
        </div>
        <div class="mx-auto searchitem-card">
            <masonry-wall
                class="col position-relative"
                :items="dataList"
                :ssr-columns="1"
                :column-width="300"
                :gap="20"
            >
                <template #default="{ item }">
                    <div>
                        <router-link :to="`attraction/${item.contentId}`" @click="searchAttr(item.contentId)">
                            <div class="card" style="box-sizing: border-box; border-radius: 25px; border: 0">
                                <img
                                    v-if="item.firstImage2"
                                    :src="item.firstImage2"
                                    style="border-radius: 25px; border: 1px solid rgba(0, 0, 0, 0.1)"
                                />
                                <img
                                    v-else
                                    src="@/assets/noPicture2.png"
                                    style="border-radius: 25px; border: 1px solid rgba(0, 0, 0, 0.1)"
                                />
                                <div
                                    class="card-body position-absolute bottom-0 start-0 ms-2 mb-2"
                                    style="
                                        background: radial-gradient(
                                            50% 50% at 50% 50%,
                                            rgba(40, 38, 38, 0.32) 50%,
                                            rgba(40, 38, 38, 0.23) 70%,
                                            rgba(225, 225, 225, 0) 100%
                                        ) !important;
                                    "
                                >
                                    <div style="color: #ffffff; font-weight: 700; font-size: 15px">
                                        {{ item.title }}
                                    </div>
                                    <div style="color: #ffffff; font-weight: 500; font-size: 10px">
                                        {{ item.contentTypeName }} • {{ item.sidoName }}
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </template>
            </masonry-wall>
        </div>

        <!-- <div class="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4 mx-auto searchitem-card">
            <div class="col position-relative"
                v-for="attraction in dataList" :key="attraction.contentId">
                <router-link :to="`attraction/${attraction.contentId}`" @click="searchAttr(attraction.contentId)">
                    <div class="card" style="box-sizing: border-box; border-radius: 25px; border:0;">
                        <img v-if="attraction.firstImage" :src="attraction.firstImage"
                            style="border-radius: 25px;border: 1px solid rgba(0, 0, 0, 0.1);">
                        <img v-else src="@/assets/noPicture2.png"
                            style="border-radius: 25px;border: 1px solid rgba(0, 0, 0, 0.1);  max-height: 180px;">
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
        </div> -->
    </div>
    <div v-else style="margin: 8%">
        <IconNoSearch style="width: 100%" width="50" height="50" color="#1769FF" />
        <div style="font-weight: 700; font-size: 23.224px; line-height: 34px; text-align: center">
            검색 결과가 없어요
        </div>
        <div style="font-weight: 500; font-size: 17.8051px; line-height: 26px; color: #999999; text-align: center">
            다시 검색해 주세요.
        </div>
    </div>
</template>

<style scoped>
.searchitem-card {
    width: 90% !important;
    max-width: 1200px;
    margin-bottom: 60px;
}

@media (max-width: 1250px) {
    .attr-style {
        padding-left: 7% !important;
    }
}
</style>
