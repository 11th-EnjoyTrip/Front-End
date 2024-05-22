<script setup>
import NavComp from "@/components/Nav/NavComp.vue";
import HomeTodayTour from "@/components/Home/HomeTodayTour.vue";
import HomeRecommend from "@/components/Home/HomeRecommend.vue";
import FooterComp from "@/components/Footer/FooterComp.vue";
</script>

<template>
    <NavComp :withLower="true" />
    <HomeTodayTour />
    <HomeRecommend />
    <FooterComp/>
</template>

<style scoped></style>
