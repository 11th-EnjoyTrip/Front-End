<script setup>
import dayjs from "dayjs";
import { ref, onMounted } from "vue";
import { useReviewStore } from "@/stores/review.js";
import { useRouter } from "vue-router";
import { getUserInfo } from "@/apis/userApi";
import { jwtDecode } from "jwt-decode";

const props = defineProps({
    nickname: String,
    userid: String,
    content_id: Number,
});
const emit = defineEmits(["changeState"]);
const review_text = ref("");
const store = useReviewStore();
const { addReview } = store;
const router = useRouter();
const insertReview = async () => {
    const newReview = {
        userid: userInfo.value.userid,
        content_id: props.content_id,
        nickname: userInfo.value.nickname,
        review_text: review_text.value,
    };

    await addReview(newReview);
    emit("changeState");
    router.go();
};

const userInfo = ref({
    nickname: "",
    userid: "",
});
onMounted(async () => {
    await getUserInfo()
        .then((response) => {
            console.log(response.data);
            userInfo.value.nickname = response.data.info.nickname;
            userInfo.value.userid = response.data.info.userid;
        })
        .catch((error) => {
            console.log(error);
        });
});
</script>

<template>
    <div class="w-100 p-4 mt-4 review-container">
        <div class="w-100 d-flex justify-content-between align-items-center">
            <div>
                <div class="review-info">작성자&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{{ userInfo.nickname }}</div>
                <div class="mt-2 review-info">
                    작성날짜&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;{{ dayjs().year() }}-{{
                        dayjs().month() + 1 < 10 ? "0" + (dayjs().month() + 1) : dayjs().month() + 1
                    }}-{{ dayjs().date() < 10 ? "0" + dayjs().date() : dayjs().date() }}
                </div>
            </div>
            <button class="review-btn" @click="insertReview">리뷰 작성</button>
        </div>
        <hr />
        <textarea class="review-content" v-model="review_text"></textarea>
    </div>
</template>

<style scoped>
.review-container {
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.review-info {
    font-size: 18px;
    font-weight: 600;
    color: #374553;
}

.review-content {
    width: 100%;
    height: 300px;
    font-size: 16px;
    font-weight: 500;
    color: #374553;
    border-radius: 10px;
    padding: 10px 10px;
    resize: none;
}

.review-content:focus {
    outline: none;
}

.review-content::-webkit-scrollbar {
    width: 0;
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
