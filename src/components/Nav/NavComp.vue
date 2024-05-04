<script setup>
import NavCompUpper from "./NavCompUpper.vue";
import NavCompLower from "./NavCompLower.vue";
</script>

<template>
    <div class="border-bottom w-100 px-5 nav-comp">
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
