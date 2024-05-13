<script setup>
import { useRouter } from "vue-router";
import { qnaAdd } from "@/apis/qnaApi.js";
import { ref } from "vue";
import { useUserInfoStore } from "@/stores/userInfo";

const router = useRouter();
const inputTitle = ref("제목을 입력해주세요");
const inputContent = ref("내용을 입력해주세요");
const store = useUserInfoStore();

const addQnA = async () => {
    const newQnA = {
        writer: store.getUserInfo.id,
        title: inputTitle.value,
        content: inputContent.value,
    };

    await qnaAdd(newQnA)
        .then(() => {
            router.replace("/qna");
        })
        .catch((error) => console.log(error));
};
</script>

<template>
    <div class="d-flex flex-column h-auto col-8 col-sm-9 mx-auto add-container">
        <div class="mx-auto fw-bold container-title">QnA 등록</div>
        <div class="d-flex flex-column mt-5">
            <input type="text" class="input-box" placeholder="제목을 입력해주세요" v-model="inputTitle" />
            <hr />
            <textarea class="input-box" rows="20" v-model="inputContent"></textarea>
            <hr />
            <div class="w-100 d-flex justify-content-end column-gap-3">
                <button class="border-0 rounded-5 btn edit-btn" @click="addQnA">게시글 등록</button>
                <button class="border-0 rounded-5 btn before-btn" @click="router.back()">뒤로가기</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.add-container {
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

.btn {
    padding: 10px 20px;
    background-color: #e1e1e1;
}

.btn:hover {
    color: white;
    background-color: #1769ff;
}
</style>
