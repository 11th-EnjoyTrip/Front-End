<script setup>
import IconLike from "@/components/icons/IconLike.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import { ref } from "vue";
import { useReviewStore } from "@/stores/review.js";

const props = defineProps({
    review: Object,
    nickname: String,
});

const token = localStorage.getItem("accessToken");
const isEditing = ref(false);
const store = useReviewStore();
const { doLikeReview, doCancelReviewLike } = store;
const editLike = async () => {
    if (props.review.checkLiked) {
        await doCancelReviewLike(props.review.review_id);
    } else {
        await doLikeReview(props.review.review_id);
    }
};
</script>

<template>
    <div class="w-100 p-4 mt-4 review-container">
        <div class="w-100 d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center column-gap-3">
                <img src="@/assets/noPicture2.png" alt="프로필 사진" class="review-card-img" />
                <div>
                    <div class="review-writer">{{ review.nickname }}</div>
                    <div class="review-reg-date">{{ review.updated_time }}</div>
                </div>
            </div>
            <div class="d-flex align-items-center column-gap-2">
                <div v-if="token" class="d-flex align-items-center column-gap-1">
                    <IconLike
                        :width="24"
                        :height="24"
                        :color="'#ff2c51'"
                        :isLike="review.checkLiked"
                        @click="editLike"
                    />
                    <div>({{ review.likes }})</div>
                </div>

                <div v-if="nickname == review.nickname" class="d-flex align-items-center column-gap-3">
                    <IconEdit
                        v-if="!isEditing"
                        :width="24"
                        :height="24"
                        :color="'#1769ff'"
                        @click="isEditing = !isEditing"
                    />
                    <button v-else class="review-edit-btn">수정</button>
                    <IconTrash :width="24" :height="24" :color="'#1769ff'" />
                </div>
            </div>
        </div>
        <hr />
        <div v-if="!isEditing" class="review-content">
            {{ review.review_text }}
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

.review-edit-btn {
    background-color: #e1e1e1;
    border: 0;
    border-radius: 10px;
    padding: 10px;
    font-weight: 600;
    font-size: 14px;
}

.review-edit-btn:hover {
    background-color: #1769ff;
    color: white;
}
</style>
