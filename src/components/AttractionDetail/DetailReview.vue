<script setup>
import DetailReviewAdd from "@/components/AttractionDetail/DetailReviewAdd.vue";
import DetailReviewCard from "@/components/AttractionDetail/DetailReviewCard.vue";
import { ref } from "vue";

defineProps({
    contentId: Number,
});

const isAdding = ref(false);
const changeState = () => (isAdding.value = !isAdding.value);
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
            <DetailReviewCard v-for="(v, i) in 3" :key="i" />
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
