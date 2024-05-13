<script setup>
import { useUserInfoStore } from "@/stores/userInfo.js";
import { useRouter } from "vue-router";
import { qnaDelete } from "@/apis/qnaApi";

defineProps({
    detail: Object,
});

const store = useUserInfoStore();
const router = useRouter();
const deleteQnA = async () => {
    await qnaDelete(router.currentRoute.value.params.id)
        .then(() => router.replace("/qna"))
        .catch((error) => console.log(error));
};
</script>

<template>
    <div class="w-100">
        <div class="fw-bold px-2 title">{{ detail.title }}</div>
        <div class="px-2 mt-2 info">
            <div>{{ detail.writer }}</div>
            <div class="mt-1">
                {{ new Date(detail.reg_data).getFullYear() }}년 {{ new Date(detail.reg_data).getMonth() + 1 }}월
                {{ new Date(detail.reg_data).getDate() }}일 {{ new Date(detail.reg_data).getHours() }}:{{
                    new Date(detail.reg_data).getMinutes()
                }}:{{ new Date(detail.reg_data).getSeconds() }}
            </div>
        </div>
        <hr />
        <div class="w-full mt-3 contents">
            <div v-for="(line, idx) in detail.content" :key="idx">
                <br v-if="line.length == 0" />
                <div v-else>{{ line }}</div>
            </div>
        </div>
        <hr />
        <div class="w-100 d-flex justify-content-end column-gap-3">
            <button
                v-if="detail.writer == store.getUserInfo.id"
                class="border-0 rounded-5 btn edit-btn"
                @click="router.push(`/qna/${detail.id}/edit`)"
            >
                게시글 수정
            </button>
            <button
                v-if="detail.writer == store.getUserInfo.id"
                class="border-0 rounded-5 btn delete-btn"
                @click="deleteQnA"
            >
                게시글 삭제
            </button>
            <button class="border-0 rounded-5 btn before-btn" @click="router.back()">뒤로가기</button>
        </div>
    </div>
</template>

<style scoped>
.title {
    font-size: 28px;
    color: #374559;
}

.info {
    font-size: 14px;
    color: #999999;
}

.contents {
    padding: 10px 20px;
    min-height: 300px;
}

.btn {
    padding: 10px 20px;
    background-color: #e1e1e1;
}

.btn:hover {
    color: white;
}

.edit-btn {
    color: #1769ff;
}

.edit-btn:hover {
    background-color: #1769ff !important;
}

.delete-btn {
    color: #ff2c51;
}

.delete-btn:hover {
    background-color: #ff2c51 !important;
}

.before-btn {
    color: #374559;
}

.before-btn:hover {
    background-color: #1769ff !important;
}
</style>
