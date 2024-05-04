<script setup>
import UpperItems from "@/components/Nav/UpperItems.vue";
import CommonLogo from "@/components/common/CommonLogo.vue";
import UpperDropdown from "@/components/Nav/UpperDropdown.vue";
</script>

<template>
    <!-- 네비게이션 상단 -->
    <div class="row mx-auto nav-upper">
        <!-- 좌측 로고 & 검색 -->
        <div class="col my-auto">
            <CommonLogo length="28" size="24" />
        </div>
        <!-- 우측 사용자 상태 관리 -->
        <!-- 모바일보다 클 때 -->
        <div class="col my-auto d-flex justify-content-end">
            <UpperItems class="user-state" />
            <UpperDropdown />
        </div>
    </div>
</template>

<style scoped>
.nav-upper {
    max-width: 1200px;
    height: 64px;
}

@media (max-width: 575.98px) {
    .user-state {
        display: none !important;
    }
}
</style>
