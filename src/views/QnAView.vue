<script setup>
import NavComp from "@/components/Nav/NavComp.vue";
import QnATable from "@/components/QnA/QnATable.vue";
</script>

<template>
    <NavComp :withLower="true" />
    <div class="row">
        <div class="d-flex flex-column h-auto col-8 col-sm-9 mx-auto table-container">
            <div class="mx-auto fw-bold title">QnA 게시판</div>
            <div class="w-100 mt-5">
                <QnATable />
            </div>
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
</style>
