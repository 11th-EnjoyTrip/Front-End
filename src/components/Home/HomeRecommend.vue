<script setup>
import HomeRecommendButton from "@/components/Home/HomeRecommendButton.vue";
import HomeRecommendCarousel from "@/components/Home/HomeRecommendCarousel.vue";
</script>

<template>
    <div class="row">
        <div class="col-8 col-sm-9 mx-auto mt-5 recommend-container">
            <div class="fw-bold fs-5 text-center title">추천 컨텐츠</div>
            <HomeRecommendButton />
            <HomeRecommendCarousel />
        </div>
    </div>
</template>

<style scoped>
.recommend-container {
    max-width: 1200px;
    color: #374553;
}
</style>
