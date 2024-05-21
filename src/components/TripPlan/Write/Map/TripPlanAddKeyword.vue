<script setup>
import IconSearch from "@/components/icons/IconSearch.vue";
import { useEditTripPlanStore } from "@/stores/editTripPlan";
import { storeToRefs } from "pinia";

const store = useEditTripPlanStore();
const { curPage, curKeyword } = storeToRefs(store);
const { getSearchList } = store;
const searching = async () => {
    curPage.value = 0;
    await getSearchList();
};
</script>

<template>
    <input class="col-8 add-search-content" v-model="curKeyword" />
    <div class="col-1"><IconSearch :width="20" :height="20" :color="'#1769ff'" @click="searching" /></div>
</template>

<style scoped>
.add-search-content {
    border: 0;
    color: #374553;
}

.add-search-content:focus {
    outline: none;
}
</style>
