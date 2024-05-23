<script setup>
import { ref } from "vue";
import NavComp from "@/components/Nav/NavComp.vue";
import HomeRankAttraction from "@/components/Home/Attraction/HomeRankAttraction.vue";
import HomeRankPlan from "@/components/Home/Plan/HomeRankPlan.vue";
import HomeRankReview from "@/components/Home/Review/HomeRankReview.vue";
import TheTrainer from "@/components/Chat/TheTrainer.vue";
import ChatButton from "@/components/Chat/ChatButton.vue";
import FooterComp from "@/components/Footer/FooterComp.vue";

const showChat = ref(false);

const handleShowChat = () => {
    showChat.value = !showChat.value;
};
</script>

<template>
    <div>
        <NavComp :withLower="true" />
        <HomeRankAttraction />
        <HomeRankPlan />
        <HomeRankReview />
        <ChatButton @showTrainer="handleShowChat" />
        <div v-if="showChat">
            <TheTrainer @showTrainer="handleShowChat" />
        </div>
        <FooterComp />
    </div>
</template>

<style scoped></style>
