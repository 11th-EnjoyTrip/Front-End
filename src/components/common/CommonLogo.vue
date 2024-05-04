<script setup>
import IconLogo from "@/components/icons/IconLogo.vue";
</script>

<template>
    <!-- 로고 -->
    <RouterLink class="d-flex align-items-center w-auto m-auto fw-bold nav-logo router" to="/">
        <IconLogo :width="44" :height="44" :color="'#1769ff'" />
        <div class="ms-3 logo-text">EnjoyTrip</div>
    </RouterLink>
</template>

<style scoped>
.nav-logo {
    font-size: 36px;
}

.logo-text {
    color: #374553;
}
</style>
