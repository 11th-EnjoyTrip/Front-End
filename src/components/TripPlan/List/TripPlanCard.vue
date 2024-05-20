<script setup>
import { ref, onMounted } from "vue";
import TripPlanCardCarousel from "@/components/TripPlan/List/TripPlanCardCarousel.vue";
import IconLike from "@/components/icons/IconLike.vue";

const props = defineProps({
    detail: Object,
});

const titles = ref([]);
const images = ref([]);
onMounted(() => {
    props.detail.contents.forEach((content) => {
        titles.value.push(content.title);

        if (content.firstImage == undefined) images.value.push("@/assets/noPicture2.png");
        else images.value.push(content.firstImage);
    });
});

const getDateFormat = (date) => {
    const year = new Date(date).getFullYear().substring(2, 4);
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();
    return `${year}.${month < 10 ? "0" + month : month}.${day < 10 ? "0" + day : day}`;
};
const getDateDiff = (startDate, endDate) => {
    return Math.ceil(Math.abs((new Date(startDate).getTime() - new Date(endDate).getTime()) / (1000 * 60 * 60 * 24)));
};
</script>

<template>
    <div class="col px-3 py-2 plan-card">
        <div class="w-100 h-auto">
            <TripPlanCardCarousel :titles="titles" :images="images" />
        </div>
        <div class="w-100 p-3 rounded-bottom-2 info">
            <div class="d-flex align-items-center">
                <div class="fw-bold me-3 trip-title">{{ detail.title }}</div>
                <IconLike :width="16" :height="16" :color="'#ff2c51'" :isLike="detail.isLikedPlan" />
                <span class="ms-1 like-count">({{ detail.likes }})</span>
            </div>
            <div class="mt-2 detail-info">
                {{ getDateDiff(detail.startDate, detail.endDate) }}박{{
                    getDateDiff(detail.startDate, detail.endDate) + 1
                }}일 ({{ getDateFormat(detail.startDate) }} ~ {{ getDateFormat(detail.endDate) }})
            </div>
            <div class="mt-1 detail-info">출발지 : {{ detail.contents[0].title }}</div>
        </div>
    </div>
</template>

<style scoped>
.plan-card {
    height: 320px;
    transition: all 0.3s ease-in-out;
}

.plan-card:hover {
    transform: scale(1.05);
}

.info {
    height: 120px;
    border-left: 1px solid rgba(225, 225, 225, 0.5);
    border-right: 1px solid rgba(225, 225, 225, 0.5);
    border-bottom: 1px solid rgba(225, 225, 225, 0.5);
}

.trip-title {
    color: #374553;
    font-size: 20px;
}

.like-count {
    font-size: 14px;
}

.detail-info {
    color: #646f7c;
    font-weight: 500;
}
</style>
