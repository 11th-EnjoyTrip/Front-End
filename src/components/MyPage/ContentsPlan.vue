<script setup>
import { ref, onMounted, watch } from "vue";
import { tripPlanMy, tripPlanLike } from "@/apis/userApi.js";
import { message } from "ant-design-vue";
import IconPlace from "@/components/icons/IconPlace.vue";
import IconArrowDown from "@/components/icons/IconArrowDown.vue";
import { Empty } from "ant-design-vue";

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
const plansMy = ref(null);
const plansLike = ref(null);
const pageMy = ref(1);
const pageLike = ref(1);
const isEndMy = ref(false);
const isEndLike = ref(false);
const isFirstMy = ref(true);
const isFirstLike = ref(true);
const getMyTripPlan = async () => {
    await tripPlanMy(pageMy.value - 1)
        .then((response) => {
            if (response.data.length == 0) {
                isEndMy.value = true;
                if (!isFirstMy.value) message.info("내가 작성한 계획 마지막 페이지에 도달했습니다", 3);
                isFirstMy.value = false;
            } else if (response.data.length < 6) {
                plansMy.value = response.data;
                isEndMy.value = true;
                if (!isFirstMy.value) message.info("내가 작성한 계획 마지막 페이지에 도달했습니다", 3);
                isFirstMy.value = false;
            } else {
                plansMy.value = response.data;
            }
        })
        .catch((error) => {
            console.log(error);
        });
};
const getMyTripPlanLike = async () => {
    await tripPlanLike(pageLike.value - 1)
        .then((response) => {
            if (response.data.length == 0) {
                isEndLike.value = true;
                if (!isFirstLike.value) message.info("좋아요 계획 마지막 페이지에 도달했습니다", 3);
                isFirstLike.value = false;
            } else if (response.data.length < 6) {
                plansLike.value = response.data;
                isEndLike.value = true;
                if (!isFirstLike.value) message.info("좋아요 계획 마지막 페이지에 도달했습니다", 3);
                isFirstLike.value = false;
            } else {
                plansLike.value = response.data;
            }
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
        if (!isEndMy.value) pageMy.value++;
    } else {
        if (!isEndLike.value) pageLike.value++;
    }
};
const prevPage = (type) => {
    if (type == "my") {
        if (pageMy.value > 1) {
            pageMy.value--;
            isEndMy.value = false;
        }
    } else {
        if (pageLike.value > 1) {
            pageLike.value--;
            isEndLike.value = false;
        }
    }
};
watch(pageMy, async () => await getMyTripPlan());
watch(pageLike, async () => await getMyTripPlanLike());
onMounted(async () => {
    await getMyTripPlan();
    await getMyTripPlanLike();
});
</script>

<template>
    <div class="w-100">
        <div class="text-center fw-bold fs-5">여행 계획 관리</div>
        <div class="w-100 mt-3">
            <div class="w-100 d-flex justify-content-between align-items-end">
                <div class="fw-bold mt-5">내가 작성한 계획</div>
                <div class="d-flex align-items-center column-gap-4">
                    <IconArrowDown
                        :width="20"
                        :height="20"
                        :color="'#999999'"
                        :degree="90"
                        @click="
                            () => {
                                prevPage('my');
                            }
                        "
                    />
                    <div class="fw-semibold">{{ pageMy }}</div>
                    <IconArrowDown
                        :width="20"
                        :height="20"
                        :color="'#999999'"
                        :degree="270"
                        @click="
                            () => {
                                nextPage('my');
                            }
                        "
                    />
                </div>
            </div>
            <table class="w-100 mt-4 contents-table">
                <tr align="center">
                    <th width="10">id</th>
                    <th width="50">제목</th>
                    <th width="30">여행 날짜</th>
                    <th width="10">상세 보기</th>
                </tr>
                <tr v-if="!plansMy || !plansMy.length">
                    <td colspan="4">
                        <a-empty :image="simpleImage">
                            <template #description>
                                <span> 불러올 데이터가 없습니다 </span>
                            </template>
                        </a-empty>
                    </td>
                </tr>
                <Transition
                    v-for="(plan, index) in plansMy"
                    :key="plan.tripPlanId"
                    name="fade"
                    :style="{ 'transition-duration': `${(index + 1) * 150}ms` }"
                    appear
                >
                    <tr align="center">
                        <td>{{ plan.tripPlanId }}</td>
                        <td>
                            <div style="overflow: hidden; text-overflow: ellipsis">
                                {{ plan.title }}
                            </div>
                        </td>
                        <td>{{ getDateFormat(plan.startDate) }} ~ {{ getDateFormat(plan.endDate) }}</td>
                        <td>
                            <a-tooltip :title="'상세 보기'" :color="'#1769ff'">
                                <IconPlace
                                    :width="20"
                                    :height="20"
                                    :color="'#1769ff'"
                                    @click="$router.push(`/plan/${plan.tripPlanId}`)"
                                />
                            </a-tooltip>
                        </td>
                    </tr>
                </Transition>
            </table>
        </div>
        <div class="w-100 mt-5">
            <div class="w-100 d-flex justify-content-between align-items-end">
                <div class="fw-bold mt-5">"좋아요" 계획</div>
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
                    <th width="50">제목</th>
                    <th width="30">여행 날짜</th>
                    <th width="10">상세 보기</th>
                </tr>
                <tr v-if="!plansLike || !plansLike.length">
                    <td colspan="4">
                        <a-empty :image="simpleImage">
                            <template #description>
                                <span> 불러올 데이터가 없습니다 </span>
                            </template>
                        </a-empty>
                    </td>
                </tr>
                <Transition
                    v-for="(plan, index) in plansLike"
                    :key="plan.tripPlanId"
                    name="fade"
                    :style="{ 'transition-duration': `${(index + 1) * 150}ms` }"
                    appear
                >
                    <tr align="center">
                        <td>{{ plan.tripPlanId }}</td>
                        <td>
                            <div style="overflow: hidden; text-overflow: ellipsis">
                                {{ plan.title }}
                            </div>
                        </td>
                        <td>{{ getDateFormat(plan.startDate) }} ~ {{ getDateFormat(plan.endDate) }}</td>
                        <td>
                            <a-tooltip :title="'상세 보기'" :color="'#1769ff'">
                                <IconPlace
                                    :width="20"
                                    :height="20"
                                    :color="'#1769ff'"
                                    @click="$router.push(`/plan/${plan.tripPlanId}`)"
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
