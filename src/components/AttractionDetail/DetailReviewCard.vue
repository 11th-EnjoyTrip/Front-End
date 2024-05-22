<script setup>
import IconLike from "@/components/icons/IconLike.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import { ref } from "vue";
import { useReviewStore } from "@/stores/review.js";
import { useRouter } from "vue-router";

const props = defineProps({
    review: Object,
    nickname: String,
});

const router = useRouter();
const checkLiked = ref(props.review.checkLiked || props.review.checkliked);
const token = localStorage.getItem("accessToken");
const isEditing = ref(false);
const store = useReviewStore();
const { doLikeReview, doCancelReviewLike, editReview, deleteReview } = store;
const editLike = async () => {
    if (checkLiked.value) {
        await doCancelReviewLike(props.review.review_id);
        checkLiked.value = false;
    } else {
        await doLikeReview(props.review.review_id);
        checkLiked.value = true;
    }
};
const text = ref(props.review.review_text);
const updateReview = async () => {
    await editReview(props.review.review_id, text.value);
    isEditing.value = false;
};
const delReview = async () => {
    await deleteReview(props.review.review_id);
    router.go();
};
</script>

<template>
    <div v-if="review" class="w-100 p-4 mt-4 review-container">
        <div class="w-100 d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center column-gap-3">
                <img src="@/assets/noPicture2.png" alt="프로필 사진" class="review-card-img" />
                <div>
                    <div v-if="review" class="review-writer">{{ review.nickname }}</div>
                    <div v-if="review" class="review-reg-date">{{ review.updated_time }}</div>
                </div>
            </div>
            <div class="d-flex align-items-center column-gap-2">
                <div v-if="token" class="d-flex align-items-center column-gap-1">
                    <IconLike
                        v-if="review"
                        :width="24"
                        :height="24"
                        :color="'#ff2c51'"
                        :isLike="checkLiked"
                        @click="editLike"
                    />
                    <div v-if="review">({{ review.likes }})</div>
                </div>

                <div v-if="review && nickname == review.nickname" class="d-flex align-items-center column-gap-3">
                    <IconEdit
                        v-if="review && !isEditing"
                        :width="24"
                        :height="24"
                        :color="'#1769ff'"
                        @click="isEditing = !isEditing"
                    />
                    <button v-else class="review-edit-btn" @click="updateReview">수정</button>
                    <IconTrash :width="24" :height="24" :color="'#1769ff'" @click="delReview" />
                </div>
            </div>
        </div>
        <hr />
        <div v-if="review && !isEditing" class="review-content">
            {{ text }}
        </div>
        <textarea v-else class="review-edit" v-model="text"></textarea>
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
