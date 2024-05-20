<script setup>
import { ref, onMounted } from "vue";
import CommonInput from "@/components/common/CommonInput.vue";
import { useRouter } from "vue-router";
import { useTripPlanStore } from "@/stores/tripPlan";
import { storeToRefs } from "pinia";
import TripPlanCard from "@/components/TripPlan/List/TripPlanCard.vue";

const store = useTripPlanStore();
const { getTripPlanList, getTripPlanSearch } = store;
const { plans } = storeToRefs(store);
const keyword = ref("");
const router = useRouter();

onMounted(async () => {
    await getTripPlanList();
});
const detailPlan = (id) => router.push(`/plan/${id}`);
const searchPlan = async () => {
    await getTripPlanSearch(keyword.value);
};
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
                @searchPlan="searchPlan"
            />
        </div>
        <div class="row gy-5 row-cols-1 row-cols-md-2 row-cols-xl-3 mt-3">
            <TripPlanCard v-for="plan in plans" :key="plan.id" :detail="plan" />
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
