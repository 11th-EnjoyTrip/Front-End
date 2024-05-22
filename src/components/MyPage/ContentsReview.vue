<script setup>
import { ref, onMounted } from "vue";
import DetailReviewCard from "@/components/AttractionDetail/DetailReviewCard.vue";
import { reviewMy, reviewLike } from "@/apis/userApi.js";

const reviewsMy = ref(null);
const reviewsLike = ref(null);
const getMyReview = async () => {
    await reviewMy()
        .then((response) => {
            reviewsMy.value = response.data.reivews;
        })
        .catch((error) => {
            console.log(error);
        });
};
const getMyLikedReview = async () => {
    await reviewLike()
        .then((response) => {
            reviewsLike.value = response.data.reviews;
        })
        .catch((error) => {
            console.log(error);
        });
};
onMounted(async () => {
    await getMyReview();
    await getMyLikedReview();
});
</script>

<template>
    <div class="position-absolute w-100">
        <div class="text-center fw-bold fs-5">리뷰 관리</div>
        <div class="w-100 mt-5">
            <div class="fw-bold mt-5 fs-5">내가 작성한 리뷰</div>
            <div class="row gy-5 row-cols-1 row-cols-lg-2 mt-3">
                <DetailReviewCard
                    v-for="review in reviewsMy"
                    :key="review.review_id"
                    :review="review"
                    :nickname="review.nickname"
                />
            </div>
        </div>
        <div class="w-100 mt-5">
            <div class="fw-bold mt-5 fs-5">나의 "좋아요" 리뷰</div>
            <div class="row gy-5 row-cols-1 row-cols-lg-2 mt-3">
                <DetailReviewCard
                    v-for="review in reviewsLike"
                    :key="review.review_id"
                    :review="review"
                    :nickname="review.nickname"
                />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
