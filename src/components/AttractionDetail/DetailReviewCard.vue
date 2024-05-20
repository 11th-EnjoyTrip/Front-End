<script setup>
import IconLike from "@/components/icons/IconLike.vue";
import { ref } from "vue";

const isEditing = ref(false);
const ment = ref(
    "여기 여행지 진짜 너무 좋아서 미쳐 환장한다니까요 제가 미친게 아니라요 진짜라니까요 여기 여행지 진짜 너무 좋아서 미쳐 환장한다니까요 제가 미친게 아니라요 진짜라니까요 여기 여행지 진짜 너무 좋아서 미쳐 환장한다니까요 제가 미친게 아니라요 진짜라니까요 여기 여행지 진짜 너무 좋아서 미쳐 환장한다니까요 제가 미친게 아니라요 진짜라니까요 여기 여행지 진짜 너무 좋아서 미쳐 환장한다니까요 제가 미친게 아니라요 진짜라니까요 여기 여행지 진짜 너무 좋아서 미쳐 환장한다니까요 제가 미친게 아니라요 진짜라니까요 여기 여행지 진짜 너무 좋아서 미쳐 환장한다니까요 제가 미친게 아니라요 진짜라니까요 여기 여행지 진짜 너무 좋아서 미쳐 환장한다니까요 제가 미친게 아니라요 진짜라니까요 여기 여행지 진짜 너무 좋아서 미쳐 환장한다니까요 제가 미친게 아니라요 진짜라니까요"
);
</script>

<template>
    <div class="w-100 p-4 mt-4 review-container">
        <div class="w-100 d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center column-gap-3">
                <img src="@/assets/noPicture2.png" alt="프로필 사진" class="review-card-img" />
                <div>
                    <div class="review-writer">최요하</div>
                    <div class="review-reg-date">2024.05.20 18:30:00</div>
                </div>
            </div>
            <IconLike :width="24" :height="24" :color="'#ff2c51'" :isLike="true" @click="isEditing = !isEditing" />
        </div>
        <hr />
        <div v-if="!isEditing" class="review-content">
            여기 여행지 진짜 너무 좋아서 미쳐 환장한다니까요? 제가 미친게 아니라요 진짜라니까요? 여기 여행지 진짜 너무
            좋아서 미쳐 환장한다니까요? 제가 미친게 아니라요 진짜라니까요? 여기 여행지 진짜 너무 좋아서 미쳐
            환장한다니까요? 제가 미친게 아니라요 진짜라니까요? 여기 여행지 진짜 너무 좋아서 미쳐 환장한다니까요? 제가
            미친게 아니라요 진짜라니까요? 여기 여행지 진짜 너무 좋아서 미쳐 환장한다니까요? 제가 미친게 아니라요
            진짜라니까요? 여기 여행지 진짜 너무 좋아서 미쳐 환장한다니까요? 제가 미친게 아니라요 진짜라니까요? 여기
            여행지 진짜 너무 좋아서 미쳐 환장한다니까요? 제가 미친게 아니라요 진짜라니까요? 여기 여행지 진짜 너무 좋아서
            미쳐 환장한다니까요? 제가 미친게 아니라요 진짜라니까요? 여기 여행지 진짜 너무 좋아서 미쳐 환장한다니까요?
            제가 미친게 아니라요 진짜라니까요?
        </div>
        <textarea v-else class="review-edit" :value="ment"></textarea>
    </div>
</template>

<style scoped>
.review-container {
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.review-card-img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 32px;
}

.review-writer {
    font-size: 18px;
    font-weight: 600;
    color: #374553;
}

.review-reg-date {
    font-size: 14px;
    color: #646f7c;
}

.review-content {
    font-size: 16px;
    font-weight: 500;
    color: #374553;
    padding-left: 10px;
    padding-right: 10px;
}

.review-edit {
    width: 100%;
    height: 300px;
    font-size: 16px;
    font-weight: 500;
    color: #374553;
    border-radius: 10px;
    padding: 10px 10px;
    resize: none;
}

.review-edit:focus {
    outline: none;
}

.review-edit::-webkit-scrollbar {
    width: 0;
}
</style>
