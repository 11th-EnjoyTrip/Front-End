<script setup></script>

<template>
    <div class="d-flex align-items-center m-auto column-gap-4 nav-lower">
        <!-- 컨텐츠 네비게이션 리스트 -->
        <RouterLink to="/attraction" class="fw-medium contents-search router">관광지검색</RouterLink>
        <RouterLink to="/qna" class="fw-medium contents-search router">QnA 게시판</RouterLink>
        <RouterLink to="/plan/list" class="fw-medium contents-search router">여행계획 게시판</RouterLink>
    </div>
</template>

<style scoped>
.nav-lower {
    max-width: 1200px;
    height: 44px;
}

.contents-search {
    color: #374553;
}
</style>
