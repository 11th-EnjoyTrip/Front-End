<script setup>
import IconLike from "@/components/icons/IconLike.vue";
import { useRouter } from "vue-router";
import { useTripPlanStore } from "@/stores/tripPlan";

defineProps({
    plan: Object,
});

const router = useRouter();
const store = useTripPlanStore();
const { getTripPlanDetail } = store;
const getDateFormat = (date) => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();

    return `${year.toString().substring(2)}.${month < 10 ? "0" + month : month}.${day < 10 ? "0" + day : day}`;
};
const getDateDiff = (startDate, endDate) => {
    return Math.ceil(Math.abs((new Date(startDate).getTime() - new Date(endDate).getTime()) / (1000 * 60 * 60 * 24)));
};
const goDetail = async (id) => {
    await getTripPlanDetail(id);
    router.push(`/plan/${id}`);
};
</script>

<template>
    <div class="w-100 h-100 card-tour" @click="goDetail(plan.tripPlanId)">
        <div class="position-relative w-100 card-img">
            <img
                v-if="plan.contents[0].firstImage"
                :src="plan.contents[0].firstImage"
                class="w-100 h-100 object-fit-cover rounded-top-4"
            />
            <img v-else src="@/assets/noPicture2.png" class="w-100 h-100 object-fit-cover rounded-top-4" />
            <div class="position-absolute start-0 px-2 py-1 ms-2 rounded-2 text-white card-sido">
                출발지 : {{ plan.contents[0].title }}
            </div>
        </div>
        <div class="w-100 d-flex flex-column justify-content-center px-3 mt-1 card-info">
            <div class="d-flex align-items-center justify-content-between card-text">
                <span class="fw-bold info-title">{{ plan.title }}</span>
                <div class="d-flex align-items-center column-gap-1">
                    <IconLike :width="20" :height="20" :color="'#ff2c51'" :isLike="plan.isPlanLiked" />
                    <div class="fw-medium info-address">({{ plan.likes }})</div>
                </div>
            </div>
            <div class="fw-medium text-start mt-1 info-description">
                {{ getDateDiff(plan.startDate, plan.endDate) }}박{{ getDateDiff(plan.startDate, plan.endDate) + 1 }}일
                ({{ getDateFormat(plan.startDate) }} ~ {{ getDateFormat(plan.endDate) }})
            </div>
            <div class="fw-medium text-start mt-1 info-intro">{{ plan.intro }}</div>
        </div>
    </div>
</template>

<style scoped>
.card-tour {
    min-height: 300px;
    max-height: 300px;
}

.card-img {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    height: 65%;
}

.card-sido {
    bottom: calc(-5%);
    font-size: 12px;
    background-color: #1769ff;
}

.card-info {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    height: 35%;
}

.card-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.info-title {
    color: #1769ff;
}

.info-address {
    color: #374553;
    font-size: 12px;
}

.info-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    font-size: 14px;
    font-weight: 500;
    color: #646f7c;
}

.info-intro {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
}
</style>
