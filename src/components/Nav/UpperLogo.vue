<script setup></script>

<template>
    <!-- 로고 -->
    <RouterLink class="d-flex align-items-center fw-bold nav-logo router" to="/">
        <img src="@/assets/logo.png" alt="로고" width="32px" />
        <div class="ms-3 logo-text">EnjoyTrip</div>
    </RouterLink>
</template>

<style scoped>
.nav-logo {
    font-size: 24px;
}

.logo-text {
    color: #374553;
}
</style>
