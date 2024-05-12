<script setup>
import { useRouter } from "vue-router";
import { qnaDetail, qnaEdit } from "@/apis/qnaApi.js";
import { ref, onMounted } from "vue";

const router = useRouter();
const before = ref({});
const inputTitle = ref("");
const inputContent = ref("");

onMounted(async () => {
    await qnaDetail(router.currentRoute.value.params.id)
        .then((response) => {
            before.value = { ...response.data };
            inputTitle.value = response.data.title;
            inputContent.value = response.data.content;
        })
        .catch((error) => console.log(error));
});

const editQnA = async () => {
    const newQnA = {
        id: before.value.id,
        writer: before.value.writer,
        title: inputTitle.value,
        content: inputContent.value,
    };

    await qnaEdit(newQnA)
        .then(() => {
            router.replace(`/qna/${before.value.id}`);
        })
        .catch((error) => console.log(error));
};
</script>

<template>
    <div class="d-flex flex-column h-auto col-8 col-sm-9 mx-auto edit-container">
        <div class="mx-auto fw-bold container-title">QnA 수정</div>
        <div class="d-flex flex-column mt-5">
            <input type="text" class="input-box" v-model="inputTitle" />
            <div class="px-2 mt-2 info">
                <div>{{ before.writer }}</div>
                <div class="mt-1">
                    {{ new Date().getFullYear() }}년 {{ new Date().getMonth() }}월 {{ new Date().getDate() }}일
                </div>
            </div>
            <hr />
            <textarea class="input-box" rows="20" v-model="inputContent"></textarea>
            <hr />
            <div class="w-100 d-flex justify-content-end column-gap-3">
                <button class="border-0 rounded-5 btn edit-btn" @click="editQnA">게시글 수정</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.edit-container {
    max-width: 1200px;
    margin-top: 60px;
}

.container-title {
    font-size: 24px;
    color: #374553;
}

.input-box {
    border: 1px solid #e1e1e1;
    border-radius: 10px;
    padding: 10px 20px;
}

.input-box:focus {
    border-color: #374559;
    outline: none;
}

.info {
    font-size: 14px;
    color: #999999;
}

.btn {
    padding: 10px 20px;
    background-color: #e1e1e1;
}

.btn:hover {
    color: white;
    background-color: #1769ff;
}
</style>
