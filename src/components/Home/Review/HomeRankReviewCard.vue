<script setup>
import { ref, onMounted } from "vue";
import { attractionDetail } from "@/apis/attractionApi";
import IconLike from "@/components/icons/IconLike.vue";

const props = defineProps({
    review: Object,
});

const attr = ref({});
onMounted(async () => {
    await attractionDetail(props.review.content_id)
        .then((response) => (attr.value = response.data))
        .catch((error) => console.log(error));
    console.log(attr.value);
});
</script>

<template>
    <div class="w-100 h-100 card-tour">
        <div class="position-relative w-100 card-img">
            <img v-if="attr.firstImage" :src="attr.firstImage" class="w-100 h-100 object-fit-cover rounded-top-4" />
            <img v-else src="@/assets/noPicture2.png" class="w-100 h-100 object-fit-cover rounded-top-4" />
            <div class="position-absolute start-0 px-2 py-1 ms-2 rounded-2 text-white card-sido">
                관광지 : {{ attr.title }}
            </div>
        </div>
        <div class="w-100 d-flex flex-column justify-content-center px-3 card-info">
            <div class="d-flex align-items-center justify-content-between card-text">
                <div class="d-flex align-items-center column-gap-3">
                    <img src="@/assets/noPicture2.png" alt="프로필 사진" class="review-card-img" />
                    <div class="fw-bold info-title">{{ review.nickname }}</div>
                </div>
                <div class="d-flex align-items-center column-gap-1">
                    <IconLike :width="20" :height="20" :color="'#ff2c51'" :isLike="true" />
                    <div class="fw-medium info-address">({{ review.likes }})</div>
                </div>
            </div>
            <div class="fw-medium text-start mt-2 info-description">
                {{ review.review_text }}
            </div>
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
    font-size: 12px;
    font-weight: 500;
    color: #646f7c;
}

.review-card-img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 20px;
}
</style>
