<script setup>
import TripPlanDetailInfo from "@/components/TripPlan/Detail/TripPlanDetailInfo.vue";
import TripPlanDays from "@/components/TripPlan/Days/TripPlanDays.vue";
import { useTripPlanStore } from "@/stores/tripPlan.js";
import { useUserInfoStore } from "@/stores/userInfo.js";
import { useEditTripPlanStore } from "@/stores/editTripPlan";
import { storeToRefs } from "pinia";
import { tripPlanDelete } from "@/apis/tripPlanApi";
import { useRouter } from "vue-router";

const router = useRouter();
const tripPlanStore = useTripPlanStore();
const userInfoStore = useUserInfoStore();
const editTripPlanStore = useEditTripPlanStore();
const { userInfo } = storeToRefs(userInfoStore);
const { planDetail } = storeToRefs(tripPlanStore);
const { controlTripPlanShare } = tripPlanStore;
const { editingTripPlan } = editTripPlanStore;
const deleteTripPlan = async () => {
    await tripPlanDelete(router.currentRoute.value.params.id)
        .then((response) => {
            router.replace("/plan/list");
        })
        .catch((error) => {
            console.log(error);
        });
};
const editTripPlan = async () => {
    await editingTripPlan(planDetail.value);
    router.push("/plan/add");
};
</script>

<template>
    <div class="mx-auto col-9 detail-container">
        <div class="row align-items-center text-center fw-bold px-0 title">
            <div v-if="userInfo.userid != planDetail.userid" class="col-3 d-flex justify-content-start">
                <button v-if="userInfo.userid != planDetail.userid" class="detail-btn" @click="$router.back()">
                    뒤로가기
                </button>
            </div>
            <div v-else class="col-3 d-flex justify-content-start">
                <button
                    v-if="planDetail.isShared == 1"
                    @click="controlTripPlanShare(planDetail.tripPlanId)"
                    class="detail-btn"
                >
                    공유취소
                </button>
                <button v-else @click="controlTripPlanShare(planDetail.tripPlanId)" class="detail-btn">공유하기</button>
            </div>
            <div class="col-6">여행계획 정보</div>
            <div v-if="userInfo.userid == planDetail.userid" class="col-3 d-flex justify-content-end column-gap-2">
                <button class="detail-btn" @click="editTripPlan">계획 수정</button>
                <button class="detail-btn del" @click="deleteTripPlan">계획 삭제</button>
            </div>
        </div>
        <div class="mt-5 w-100 d-flex justify-content-evenly">
            <TripPlanDetailInfo />
        </div>
        <TripPlanDays />
    </div>
</template>

<style scoped>
.detail-container {
    max-width: 1200px;
    margin-top: 60px;
}

.title {
    font-size: 24px;
    color: #374553;
}

.detail-btn {
    font-size: 14px;
    font-weight: 600;
    padding: 10px 20px;
    background-color: #e1e1e1;
    border: 0;
    border-radius: 20px;
}

.detail-btn:hover {
    background-color: #1769ff;
    color: white;
}

.detail-btn.del:hover {
    background-color: #ff2c51;
}
</style>
