<script setup>
import UpperLogo from "./UpperLogo.vue";
import UpperSearch from "./UpperSearch.vue";
import UpperItems from "./UpperItems.vue";
</script>

<template>
    <!-- 네비게이션 상단 -->
    <div class="d-flex justify-content-between align-items-center m-auto nav-upper">
        <!-- 좌측 로고 & 검색 -->
        <div class="d-flex align-items-center w-auto h-100">
            <UpperLogo />
            <UpperSearch />
        </div>
        <!-- 우측 사용자 상태 관리 -->
        <div class="h-100">
            <UpperItems />
        </div>
    </div>
</template>

<style scoped>
.nav-upper {
    max-width: 1200px;
    height: 64px;
}
</style>
