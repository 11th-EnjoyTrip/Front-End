<script setup>
import DetailReviewAdd from "@/components/AttractionDetail/DetailReviewAdd.vue";
import DetailReviewCard from "@/components/AttractionDetail/DetailReviewCard.vue";
import { ref, onMounted } from "vue";
import { attractionReview } from "@/apis/attractionApi";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { getUserInfo } from "@/apis/userApi.js";

const props = defineProps({
    contentId: Number,
});

const isAdding = ref(false);
const changeState = () => (isAdding.value = !isAdding.value);
const reviews = ref([]);
const page = ref(0);
const curReviews = ref([]);
const nickname = ref("");

const getAttractionReview = async () => {
    await attractionReview(props.contentId)
        .then((response) => {
            reviews.value = response.data.reviews;
        })
        .catch((error) => {
            console.log(error);
        });
};
const loadNextReviews = async ($state) => {
    curReviews.value = [...curReviews.value, ...reviews.value[page.value]];
    page.value++;

    if (page.value >= reviews.value.length) $state.complete();
    else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
        $state.loaded();
    }
};
onMounted(async () => {
    await getAttractionReview();
    loadNextReviews();

    await getUserInfo()
        .then((response) => {
            nickname.value = response.data.info.nickname;
        })
        .catch((error) => console.log(error));
});
</script>

<template>
    <div class="w-100 mt-5 mb-5 pb-5">
        <div class="review-title">
            <div>리뷰</div>
            <button v-if="!isAdding" class="review-btn" @click="changeState">리뷰 추가</button>
        </div>
        <div v-if="isAdding" class="w-100">
            <DetailReviewAdd @changeState="changeState" />
        </div>
        <div class="w-100">
            <DetailReviewCard
                v-for="review in curReviews"
                :key="review.review_id"
                :review="review"
                :nickname="nickname"
            />
            <InfiniteLoading @infinite="loadNextReviews">
                <template #complete>
                    <span></span>
                </template>
            </InfiniteLoading>
        </div>
    </div>
</template>

<style scoped>
.review-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 22px;
    font-weight: 600;
    color: #374553;
}

.review-btn {
    background-color: #e1e1e1;
    border: 0;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 700;
}

.review-btn:hover {
    background-color: #1769ff;
    color: white;
}
</style>
