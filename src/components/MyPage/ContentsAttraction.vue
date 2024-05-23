<script setup>
import { ref, onMounted, watch } from "vue";
import { attractionLike } from "@/apis/userApi.js";
import { message } from "ant-design-vue";
import IconPlace from "@/components/icons/IconPlace.vue";
import IconArrowDown from "@/components/icons/IconArrowDown.vue";

const like = ref(null);
const page = ref(1);
const isEnd = ref(false);
const getAttractionLike = async () => {
    await attractionLike(page.value - 1)
        .then((response) => {
            if (response.data.length == 0) {
                isEnd.value = true;
                message.info("'좋아요' 관광지 마지막 페이지에 도달했습니다", 3);
            } else if (response.data.length < 6) {
                like.value = response.data;
                isEnd.value = true;
                message.info("'좋아요' 관광지 마지막 페이지에 도달했습니다", 3);
            } else {
                like.value = response.data;
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
const nextPage = () => {
    if (!isEnd.value) page.value++;
};
const prevPage = () => {
    if (page.value > 1) {
        page.value--;
        isEnd.value = false;
    }
};
onMounted(async () => {
    await getAttractionLike();
});
watch(page, async () => await getAttractionLike());
</script>

<template>
    <div class="w-100">
        <div class="text-center fw-bold fs-5">여행 계획 관리</div>
        <div class="w-100 mt-3">
            <div class="w-100 d-flex justify-content-between align-items-end">
                <div class="fw-bold mt-5 fs-5">"좋아요" 관광지</div>
                <div class="d-flex align-items-center column-gap-4">
                    <IconArrowDown :width="20" :height="20" :color="'#999999'" :degree="90" @click="prevPage('my')" />
                    <div class="fw-semibold">{{ page }}</div>
                    <IconArrowDown :width="20" :height="20" :color="'#999999'" :degree="270" @click="nextPage('my')" />
                </div>
            </div>
            <table class="w-100 mt-4 contents-table">
                <tr align="center">
                    <th width="10">id</th>
                    <th width="40">관광지</th>
                    <th width="30">유형</th>
                    <th width="10">시/도</th>
                    <th width="10">상세 보기</th>
                </tr>
                <Transition
                    v-for="(val, index) in like"
                    :key="val.contentId"
                    name="fade"
                    :style="{ 'transition-duration': `${(index + 1) * 150}ms` }"
                    appear
                >
                    <tr align="center">
                        <td>{{ val.contentId }}</td>
                        <td>
                            <div style="overflow: hidden; text-overflow: ellipsis">
                                {{ val.title }}
                            </div>
                        </td>
                        <td>{{ val.contentTypeName }}</td>
                        <td>{{ val.sidoName }}</td>
                        <td>
                            <a-tooltip :title="'상세 보기'" :color="'#1769ff'">
                                <IconPlace
                                    :width="20"
                                    :height="20"
                                    :color="'#1769ff'"
                                    @click="$router.push(`/attraction/${val.contentId}`)"
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
