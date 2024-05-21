<script setup>
import { ref, onMounted } from "vue";
import TripPlanCard from "@/components/TripPlan/List/TripPlanCard.vue";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { tripPlanMy, tripPlanLike } from "@/apis/userApi.js";

const plansMy = ref(null);
const plansLike = ref(null);
const pageMy = ref(0);
const pageLike = ref(0);
const getMyTripPlan = async ($state) => {
    try {
        const response = await tripPlanMy(pageMy.value);
        const jsonData = response.data;
        if (pageMy.value == 0) plansMy.value = [];

        jsonData.forEach((res) => {
            let newRes = { ...res };
            newRes.contents = JSON.parse(newRes.contents);
            plansMy.value.push(newRes);
        });

        if (jsonData.length < 6) $state.complete();
        else $state.loaded();

        pageMy.value++;
        localStorage.removeItem("tripPlan");
    } catch (error) {
        console.error("Error fetching attraction list:", error);
        $state.error();
    }
};
const getMyTripPlanLike = async ($state) => {
    try {
        const response = await tripPlanLike(pageLike.value);
        const jsonData = response.data;
        if (pageLike.value == 0) plansLike.value = [];

        jsonData.forEach((res) => {
            let newRes = { ...res };
            newRes.contents = JSON.parse(newRes.contents);
            plansLike.value.push(newRes);
        });

        if (jsonData.length < 6) $state.complete();
        else $state.loaded();

        pageLike.value++;
        localStorage.removeItem("tripPlan");
    } catch (error) {
        console.error("Error fetching attraction list:", error);
        $state.error();
    }
};
onMounted(async () => {
    await getMyTripPlan();
    await getMyTripPlanLike();
});
</script>

<template>
    <div class="position-absolute w-100">
        <div class="text-center fw-bold fs-5">여행 계획 관리</div>
        <div class="w-100 mt-5">
            <div class="fw-bold mt-5 fs-5">내가 작성한 계획</div>
            <div class="row gy-5 row-cols-1 row-cols-lg-2 mt-3">
                <TripPlanCard v-for="plan in plansMy" :key="plan.tripPlanId" :detail="plan" />
                <InfiniteLoading @infinite="getMyTripPlan">
                    <template #complete>
                        <span></span>
                    </template>
                </InfiniteLoading>
            </div>
        </div>
        <div class="w-100 mt-5">
            <div class="fw-bold mt-5 fs-5">"좋아요" 계획</div>
            <div class="row gy-5 row-cols-1 row-cols-lg-2 mt-3">
                <TripPlanCard v-for="plan in plansLike" :key="plan.tripPlanId" :detail="plan" />
                <InfiniteLoading @infinite="getMyTripPlanLike">
                    <template #complete>
                        <span></span>
                    </template>
                </InfiniteLoading>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
