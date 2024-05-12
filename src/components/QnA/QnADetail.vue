<script setup>
import { qnaDetail } from "@/apis/qnaApi.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import QnADetailItems from "@/components/QnA/QnADetailItems.vue";

const detail = ref({});
const router = useRouter();
onMounted(async () => {
    await qnaDetail(router.currentRoute.value.params.id)
        .then((response) => {
            detail.value = { ...response.data };
        })
        .catch((error) => console.log(error));
});
</script>

<template>
    <div class="d-flex flex-column h-auto col-8 col-sm-9 mx-auto detail-container">
        <div class="mx-auto fw-bold title">QnA 게시글</div>
        <div class="d-flex flex-column mt-5">
            <QnADetailItems :detail="detail" />
        </div>
    </div>
</template>

<style scoped>
.detail-container {
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
