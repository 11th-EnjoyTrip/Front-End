<script setup>
import DetailReviewAdd from "@/components/AttractionDetail/DetailReviewAdd.vue";
import DetailReviewCard from "@/components/AttractionDetail/DetailReviewCard.vue";
import { ref, onMounted } from "vue";
import { attractionReview } from "@/apis/attractionApi";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { getUserInfo } from "@/apis/userApi.js";
import { Empty } from "ant-design-vue";

const props = defineProps({
    contentId: Number,
});

const isAdding = ref(false);
const changeState = () => (isAdding.value = !isAdding.value);
const reviews = ref([]);
const page = ref(0);
const curReviews = ref([]);
const userid = ref("");
const nickname = ref("");
const token = localStorage.getItem("accessToken");

const getAttractionReview = async () => {
    await attractionReview(props.contentId)
        .then((response) => {
            reviews.value = response.data.reviews;
        })
        .catch((error) => {
            console.log(error);
        });
};
const loadNextReviews = ($state) => {
    let res = true;

    if (page.value >= reviews.value.length) {
        res = true;
    } else {
        let nextReviews = reviews.value[page.value];
        let newNR = nextReviews.filter((v) => v);
        page.value++;

        if (newNR.length == 0) {
            curReviews.value = [...curReviews.value];
            res = true;
        } else if (newNR.length < 10) {
            curReviews.value = [...curReviews.value, ...newNR];
            res = true;
        } else {
            curReviews.value = [...curReviews.value, ...newNR];
            res = false;
        }
    }

    if (res) $state.complete();
    else if (window.innerHeight + window.scrolLY >= document.documentElement.scrollHeight) $state.loaded();
};
onMounted(async () => {
    await getAttractionReview();
    loadNextReviews();

    await getUserInfo()
        .then((response) => {
            nickname.value = response.data.info.nickname;
            userid.value = response.data.info.userid;
        })
        .catch((error) => console.log(error));
});

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
</script>

<template>
    <div class="w-100 mt-5 mb-5 pb-5">
        <div class="review-title">
            <div>리뷰</div>
            <button v-if="token && !isAdding" class="review-btn" @click="changeState">리뷰 추가</button>
        </div>
        <div v-if="isAdding" class="w-100">
            <DetailReviewAdd :nickname="nickname" :userid="userid" :content_id="contentId" @changeState="changeState" />
        </div>
        <div v-if="curReviews.length < 1">
            <a-empty :image="simpleImage"> 등록된 리뷰가 없습니다 </a-empty>
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
