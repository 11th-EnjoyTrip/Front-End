<script setup>
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import IconLike from "@/components/icons/IconLike.vue";
import { useTripPlanStore } from "@/stores/tripPlan.js";
import { useUserInfoStore } from "@/stores/userInfo.js";
import { storeToRefs } from "pinia";

const tripPlanStore = useTripPlanStore();
const userInfoStore = useUserInfoStore();
const { planDetail } = storeToRefs(tripPlanStore);
const { userInfo } = storeToRefs(userInfoStore);
const { likeTripPlanDetail, cancelLikeTripPlanDetail } = tripPlanStore;
const getRegDate = (date) => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();
    const hour = new Date(date).getHours();
    const minute = new Date(date).getMinutes();
    const second = new Date(date).getSeconds();

    return `${year}.${month < 10 ? "0" + month : month}.${day < 10 ? "0" + day : day} ${
        hour < 10 ? "0" + hour : hour
    }:${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`;
};
const yoils = {
    0: "일",
    1: "월",
    2: "화",
    3: "수",
    4: "목",
    5: "금",
    6: "토",
};
const getDate = (date) => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();
    const yoil = yoils[new Date(date).getDay()];

    return `${year}.${month < 10 ? "0" + month : month}.${day < 10 ? "0" + day : day} (${yoil})`;
};
const quill = ref(null);
const getQuill = (q) => {
    quill.value = q;
    quill.value.root.innerHTML = `<p>${planDetail.value.intro}</p>`;
};
const likeControl = async () => {
    if (planDetail.value.likedPlan) await cancelLikeTripPlanDetail(planDetail.value.tripPlanId);
    else await likeTripPlanDetail(planDetail.value.tripPlanId);
};
</script>

<template>
    <div class="w-100">
        <div class="fw-bold fs-2 info-title">{{ planDetail.title }}</div>
        <div class="d-flex justify-content-between align-items-center mt-1 info-writer">
            <div class="d-flex align-items-center column-gap-3">
                <img v-if="userInfo.profile" :src="userInfo.profile" alt="프로필 사진" class="info-profile-img" />
                <img v-else src="@/assets/noPicture2.png" alt="프로필 사진" class="info-profile-img" />
                <div>
                    <div class="review-writer">{{ planDetail.nickname }}</div>
                    <div class="review-reg-date">{{ getRegDate(planDetail.updatedAt) }}</div>
                </div>
            </div>
            <div class="d-flex">
                <IconLike
                    :width="20"
                    :height="20"
                    :color="'#ff2c51'"
                    :isLike="planDetail.likedPlan"
                    @click="likeControl"
                />
                <div class="ms-1">{{ planDetail.likes }}</div>
            </div>
        </div>
        <hr />
        <div class="row justify-content-between mt-4">
            <div class="col">
                <div class="info-period-title">출발</div>
                <div class="info-period">{{ getDate(planDetail.startDate) }}</div>
            </div>
            <div class="col">
                <div class="info-period-title">복귀</div>
                <div class="info-period">{{ getDate(planDetail.endDate) }}</div>
            </div>
            <div class="col">
                <div class="info-period-title">출발 시간</div>
                <div class="info-period">{{ planDetail.dayPlanList[0].detailPlanList[0].arrivalTime }}</div>
            </div>
        </div>
        <div class="d-flex flex-column mt-4">
            <div class="info-period-title">출발지</div>
            <div class="info-period">{{ planDetail.dayPlanList[0].detailPlanList[0].title }}</div>
        </div>
        <div class="w-100 mt-4">
            <div class="info-intro-title">여행 설명</div>
            <div class="info-intro">
                <QuillEditor theme="" :readOnly="true" @ready="getQuill" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.info-title {
    color: #374553;
}

.info-writer {
    color: #999999;
    font-size: 14px;
}

.info-profile-img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 32px;
}

.info-period-title {
    color: #374553;
    font-size: 20px;
    font-weight: 600;
}

.info-period {
    color: #374553;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    padding: 10px 150px 10px 10px;
}

.info-intro-title {
    font-weight: 600;
    font-size: 20px;
    color: #374553;
}

.info-intro {
    width: 100%;
    border-radius: 5px;
    border: 1px solid #e1e1e1;
    min-height: 250px;
}
</style>
