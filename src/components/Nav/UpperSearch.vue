<script setup></script>

<template>
    <!-- 검색 -->
    <div class="d-flex justify-content-between align-items-center border rounded-5 overflow-hidden ms-4 nav-search">
        <input class="w-100 h-100 border-0 ms-4" type="text" placeholder="인기 여행지 구미!!!" />
        <img src="@/assets/search-btn.png" alt="검색 버튼" class="me-3 search-btn" />
    </div>
</template>

<style scoped>
.nav-search {
    width: 350px;
    height: 36px;
    border-color: #e1e1e1;
}

input::placeholder {
    color: #999999;
}

input:focus {
    outline: none;
}

.search-btn {
    cursor: grab;
}
</style>
