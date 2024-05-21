<script setup>
import { ref, watch, onMounted } from "vue";
import CommonInput from "@/components/common/CommonInput.vue";
import TripPlanCard from "@/components/TripPlan/List/TripPlanCard.vue";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { tripPlanList } from "@/apis/tripPlanApi.js";

const keyword = ref("");
const plans = ref(null);
const page = ref(0);
const getTripPlanList = async ($state) => {
    try {
        const response = await tripPlanList(keyword.value, page.value);
        const jsonData = response.data;
        if (page.value == 0) plans.value = [];

        jsonData.forEach((res) => {
            let newRes = { ...res };
            newRes.contents = JSON.parse(newRes.contents);
            plans.value.push(newRes);
        });

        if (jsonData.length < 6) $state.complete();
        else $state.loaded();

        page.value++;
        localStorage.removeItem("tripPlan");
    } catch (error) {
        console.error("Error fetching attraction list:", error);
        $state.error();
    }
};
onMounted(async () => {
    await getTripPlanList();
});
watch(keyword, () => {
    page.value = 0;
});
</script>

<template>
    <div class="col-9 col-xl-12 mx-auto list-container">
        <div class="w-100 mx-auto fw-bold position-relative title">
            <div class="w-50 text-center mx-auto">여행계획 게시판</div>
            <button
                class="position-absolute top-0 end-0 h-100 rounded-5 border-0 px-3 add-btn"
                @click="$router.push('/plan/add')"
            >
                여행계획 추가
            </button>
        </div>
        <div class="w-50 mx-auto mt-5">
            <CommonInput
                :height="40"
                :placeholder="'제목 검색'"
                :icon="{ isStart: false, name: 'search' }"
                v-model="keyword"
                @search="getTripPlanList"
            />
        </div>
        <div class="row gy-5 row-cols-1 row-cols-md-2 row-cols-xl-3 mt-3">
            <TripPlanCard v-for="plan in plans" :key="plan.tripPlanId" :detail="plan" />
            <InfiniteLoading @infinite="getTripPlanList">
                <template #complete>
                    <span></span>
                </template>
            </InfiniteLoading>
        </div>
    </div>
</template>

<style scoped>
.list-container {
    max-width: 1200px;
    margin-top: 60px;
}

.title {
    font-size: 24px;
    color: #374553;
}

a {
    text-decoration: none;
    color: #646f7c;
}

.add-btn {
    font-size: 14px;
}

.add-btn:hover {
    background-color: #1769ff;
    color: white;
}
</style>
