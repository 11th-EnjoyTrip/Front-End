<script setup>
import TripPlanAddSearchResultCard from "@/components/TripPlan/Write/Map/TripPlanAddSearchResultCard.vue";
import { storeToRefs } from "pinia";
import { useEditTripPlanStore } from "@/stores/editTripPlan";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

const stores = useEditTripPlanStore();
const { searchList, pinned } = storeToRefs(stores);
const { getSearchList } = stores;
const changeLatLng = (idx) => {
    pinned.value = [searchList.value[idx].latitude, searchList.value[idx].longitude];
};
</script>

<template>
    <div class="add-search-result-sub-title">검색 결과</div>
    <div class="w-100" v-if="searchList.length > 0">
        <TripPlanAddSearchResultCard
            v-for="(v, i) in searchList"
            :key="v.contentId"
            :item="v"
            :type="'add'"
            :idx="i"
            @click="changeLatLng(i)"
        />
        <InfiniteLoading @infinite="getSearchList">
            <template #complete>
                <span></span>
            </template>
        </InfiniteLoading>
    </div>
</template>

<style scoped>
.add-search-result-sub-title {
    font-weight: 600;
    font-size: 16px;
    color: #374553;
}

.add-search-content-box {
    display: flex;
    align-items: center;
    height: 50px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-top: 8px;
}

.add-search-content-title {
    font-size: 16px;
    font-weight: 500;
    color: #374553;
    text-align: center;
    line-height: 50px;
}
</style>
