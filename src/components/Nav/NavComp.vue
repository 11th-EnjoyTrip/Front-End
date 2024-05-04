<script setup>
import NavCompUpper from "@/components/Nav/NavCompUpper.vue";
import NavCompLower from "@/components/Nav/NavCompLower.vue";
</script>

<template>
    <div class="fixed-top border-bottom w-100 nav-comp px-3">
        <!-- 네비게이션 상단 -->
        <NavCompUpper />
        <!-- 네비게이션 하단 -->
        <NavCompLower />
    </div>
</template>

<style scoped>
.nav-comp {
    border-color: #e1e1e1;
    min-height: 108px;
}
</style>
