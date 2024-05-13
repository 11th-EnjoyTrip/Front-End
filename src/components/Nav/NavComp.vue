<script setup>
import NavCompUpper from "@/components/Nav/NavCompUpper.vue";
import NavCompLower from "@/components/Nav/NavCompLower.vue";

defineProps({
    withLower: Boolean,
});
</script>

<template>
    <div class="border-bottom w-100 nav-comp px-3" :style="{ 'min-height': withLower ? '108px' : '64px' }">
        <!-- 네비게이션 상단 -->
        <NavCompUpper />
        <!-- 네비게이션 하단 -->
        <NavCompLower v-if="withLower" />
    </div>
</template>

<style scoped>
.nav-comp {
    border-color: #e1e1e1;
}
</style>
