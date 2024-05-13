<script setup>
import HomeTourCarousel from "@/components/Home/HomeTourCarousel.vue";
</script>

<template>
    <div class="row">
        <div class="col-8 col-sm-9 mx-auto mt-5 main-container">
            <div class="fw-bold fs-5 text-center title">오늘의 관광지</div>
            <HomeTourCarousel />
        </div>
    </div>
</template>

<style scoped>
.main-container {
    max-width: 1200px;
    color: #374553;
}
</style>
