<script setup>
import { ref, onMounted, watch } from "vue";
import { reviewMy, reviewLike } from "@/apis/userApi.js";
import { message } from "ant-design-vue";
import IconPlace from "@/components/icons/IconPlace.vue";
import IconArrowDown from "@/components/icons/IconArrowDown.vue";

const reviewsMy = ref(null);
const reviewsLike = ref(null);
const curMy = ref([]);
const curLike = ref([]);
const pageMy = ref(1);
const pageLike = ref(1);
const isEndMy = ref(1);
const isEndLike = ref(1);
const getNextMy = () => {
    if (reviewsMy.value[pageMy.value - 1].length > 0) {
        curMy.value = reviewsMy.value[pageMy.value - 1];
    }
};
const getMyReview = async () => {
    await reviewMy()
        .then((response) => {
            reviewsMy.value = response.data.data;
            isEndMy.value = reviewsMy.value.length;
            getNextMy();
        })
        .catch((error) => {
            console.log(error);
        });
};
const getNextLike = () => {
    if (reviewsLike.value[pageLike.value - 1].length > 0) {
        curLike.value = reviewsLike.value[pageLike.value - 1];
    }
};
const getMyLikedReview = async () => {
    await reviewLike()
        .then((response) => {
            reviewsLike.value = [[]];
            for (let i = 0; i < response.data["liked reviews"].length; i++) {
                for (let j = 0; j < response.data["liked reviews"][i].length; j++) {
                    if (response.data["liked reviews"][i][j] == null) continue;
                    if (response.data["liked reviews"][i][j].checkliked == 0) continue;

                    if (reviewsLike.value[reviewsLike.value.length - 1].length == 10) reviewsLike.value.push([]);
                    reviewsLike.value[reviewsLike.value.length - 1].push(response.data["liked reviews"][i][j]);
                }
            }
            isEndLike.value = reviewsLike.value.length;
            getNextLike();
        })
        .catch((error) => {
            console.log(error);
        });
};
const getDateFormat = (date) => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();

    return `${year.toString().substring(2)}.${month < 10 ? "0" + month : month}.${day < 10 ? "0" + day : day}`;
};
const nextPage = (type) => {
    if (type == "my") {
        if (isEndMy.value != pageMy.value) {
            pageMy.value++;
            if (pageMy.value == isEndMy.value) message.info("내가 작성한 리뷰 마지막 페이지에 도달했습니다", 3);
        }
    } else {
        if (isEndLike.value != pageLike.value) {
            pageLike.value++;
            if (pageLike.value == isEndLike.value) message.info("좋아요 리뷰 마지막 페이지에 도달했습니다", 3);
        }
    }
};
const prevPage = (type) => {
    if (type == "my") {
        if (pageMy.value > 1) pageMy.value--;
    } else {
        if (pageLike.value > 1) pageLike.value--;
    }
};
onMounted(async () => {
    await getMyReview();
    await getMyLikedReview();
});
watch(pageMy, async () => getNextMy());
watch(pageLike, async () => getNextLike());
</script>

<template>
    <div class="position-absolute w-100">
        <div class="text-center fw-bold fs-5">리뷰 관리</div>
        <div class="w-100 mt-3">
            <div class="w-100 d-flex justify-content-between align-items-end">
                <div class="fw-bold mt-5 fs-5">내가 작성한 리뷰</div>
                <div class="d-flex align-items-center column-gap-4">
                    <IconArrowDown :width="20" :height="20" :color="'#999999'" :degree="90" @click="prevPage('my')" />
                    <div class="fw-semibold">{{ pageMy }}</div>
                    <IconArrowDown :width="20" :height="20" :color="'#999999'" :degree="270" @click="nextPage('my')" />
                </div>
            </div>
            <table class="w-100 mt-4 contents-table">
                <tr align="center">
                    <th width="10">id</th>
                    <th width="50">리뷰 내용</th>
                    <th width="30">등록 날짜</th>
                    <th width="10">등록 관광지 보기</th>
                </tr>
                <Transition
                    v-for="(review, index) in curMy"
                    :key="review.review_id"
                    name="fade"
                    :style="{ 'transition-duration': `${(index + 1) * 150}ms` }"
                    appear
                >
                    <tr align="center">
                        <td>{{ review.review_id }}</td>
                        <td>
                            <div style="overflow: hidden; text-overflow: ellipsis">
                                {{ review.review_text }}
                            </div>
                        </td>
                        <td>{{ getDateFormat(review.update_time) }}</td>
                        <td>
                            <a-tooltip :title="'관광지 보러가기'" :color="'#1769ff'">
                                <IconPlace
                                    :width="20"
                                    :height="20"
                                    :color="'#1769ff'"
                                    @click="$router.push(`/attraction/${review.content_id}`)"
                                />
                            </a-tooltip>
                        </td>
                    </tr>
                </Transition>
            </table>
        </div>
        <div class="w-100 mt-5">
            <div class="w-100 d-flex justify-content-between align-items-end">
                <div class="fw-bold mt-5 fs-5">"좋아요" 리뷰</div>
                <div class="d-flex align-items-center column-gap-4">
                    <IconArrowDown :width="20" :height="20" :color="'#999999'" :degree="90" @click="prevPage('like')" />
                    <div class="fw-semibold">{{ pageLike }}</div>
                    <IconArrowDown
                        :width="20"
                        :height="20"
                        :color="'#999999'"
                        :degree="270"
                        @click="nextPage('like')"
                    />
                </div>
            </div>
            <table class="w-100 mt-4 contents-table">
                <tr align="center">
                    <th width="10">id</th>
                    <th width="50">리뷰 내용</th>
                    <th width="30">등록 날짜</th>
                    <th width="10">등록 관광지 보기</th>
                </tr>
                <Transition
                    v-for="(review, index) in curLike"
                    :key="review.review_id"
                    name="fade"
                    :style="{ 'transition-duration': `${(index + 1) * 150}ms` }"
                    appear
                >
                    <tr align="center">
                        <td>{{ review.review_id }}</td>
                        <td>
                            <div style="overflow: hidden; text-overflow: ellipsis">
                                {{ review.review_text }}
                            </div>
                        </td>
                        <td>{{ getDateFormat(review.update_time) }}</td>
                        <td>
                            <a-tooltip :title="'관광지 보러가기'" :color="'#1769ff'">
                                <IconPlace
                                    :width="20"
                                    :height="20"
                                    :color="'#1769ff'"
                                    @click="$router.push(`/attraction/${review.content_id}`)"
                                />
                            </a-tooltip>
                        </td>
                    </tr>
                </Transition>
            </table>
        </div>
    </div>
</template>

<style scoped>
a {
    text-decoration: none;
    color: black;
}

table,
th,
td {
    border: 1px solid #f1f1f1;
}

table {
    border-collapse: collapse;
    border-radius: 10px;
    border-style: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.075);
}

th {
    padding: 15px 10px;
    background-color: #fafafa;
    font-size: 14px;
}

td {
    padding: 15px 0;
    font-size: 14px;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 300ms ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
