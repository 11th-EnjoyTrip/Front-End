<script setup>
import { onMounted, ref } from "vue";
import { qnaList, qnaSearch } from "@/apis/qnaApi";
import { useRouter } from "vue-router";
import CommonInput from "../common/CommonInput.vue";

const qnas = ref([]);
onMounted(async () => {
    await qnaList()
        .then((response) => {
            qnas.value = [...response.data];
        })
        .catch((error) => console.log(error));
});
const columns = [
    {
        title: "글 번호",
        dataIndex: "id",
        width: "15%",
    },
    {
        title: "제목",
        dataIndex: "title",
        width: "45%",
    },
    {
        title: "작성자",
        dataIndex: "writer",
        width: "20%",
    },
    {
        title: "작성 날짜",
        dataIndex: "reg_data",
        width: "20%",
    },
];
const router = useRouter();
const detailQnA = (id) => router.push(`/qna/${id}`);
const keyword = ref("");
const searchQnA = async () => {
    await qnaSearch(keyword.value)
        .then((response) => {
            qnas.value = [...response.data];
        })
        .catch((error) => console.log(error));
};
</script>

<template>
    <div class="d-flex flex-column h-auto col-8 col-sm-9 mx-auto table-container">
        <div class="w-100 mx-auto fw-bold title position-relative">
            <div class="w-50 text-center mx-auto fw-bold title">QnA 게시판</div>
            <button
                class="position-absolute top-0 end-0 h-100 rounded-5 border-0 px-3 add-btn"
                @click="router.push('/qna/add')"
            >
                게시글 추가
            </button>
        </div>
        <div class="w-50 mx-auto mt-3">
            <CommonInput
                :height="40"
                :placeholder="'제목 키워드'"
                :icon="{ isStart: false, name: 'search' }"
                v-model="keyword"
                @searchQnA="searchQnA"
            />
        </div>

        <div class="w-100 mt-5">
            <a-table :columns="columns" :data-source="qnas" bordered>
                <template #bodyCell="{ column, text, record }">
                    <div class="w-100" @click="detailQnA(record.id)">
                        <div v-if="column.dataIndex == 'reg_data'" class="w-100">
                            {{ new Date(text).getFullYear() }}년 {{ new Date(text).getMonth() + 1 }}월
                            {{ new Date(text).getDate() }}일
                        </div>
                        <div v-else>
                            {{ text }}
                        </div>
                    </div>
                </template>
            </a-table>
        </div>
    </div>
</template>

<style scoped>
.table-container {
    max-width: 1200px;
    margin-top: 60px;
}

.title {
    font-size: 24px;
    color: #374553;
}

a {
    text-decoration: none;
    color: #646f7c;
}

.add-btn {
    font-size: 14px;
}

.add-btn:hover {
    background-color: #1769ff;
    color: white;
}
</style>
