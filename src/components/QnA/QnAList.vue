<script setup>
import { onMounted, ref } from "vue";
import { qnaList } from "@/apis/qnaApi";
import { useRouter } from "vue-router";

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
</script>

<template>
    <div class="d-flex flex-column h-auto col-8 col-sm-9 mx-auto table-container">
        <div class="mx-auto fw-bold title">QnA 게시판</div>
        <div class="w-100 mt-5">
            <a-table :columns="columns" :data-source="qnas" bordered>
                <template #bodyCell="{ column, text, record }">
                    <div class="w-100" @click="detailQnA(record.id)">
                        <div v-if="column.dataIndex == 'reg_data'" @click="console.log(record.id)" class="w-100">
                            {{ new Date(text).getFullYear() }}년 {{ new Date(text).getMonth() + 1 }}월
                            {{ new Date(text).getDate() }}일
                        </div>
                        <div v-else @click="detailQnA(record.id)">
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
</style>
