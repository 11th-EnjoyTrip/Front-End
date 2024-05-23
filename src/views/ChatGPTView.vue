<script setup>
import { ref } from "vue";
import NavComp from "@/components/Nav/NavComp.vue";
import TheTrainer from "@/components/Chat/TheTrainer.vue";
import ChatButton from "@/components/Chat/ChatButton.vue";
import HomeRankAttraction from "@/components/Home/Attraction/HomeRankAttraction.vue";

const showChat = ref(false);

const handleShowChat = () => {
    showChat.value = !showChat.value;
};
</script>

<template>
    <div>
        <NavComp :withLower="true" />
        <HomeRankAttraction />
        <!-- <HomeRecommend /> -->
        <ChatButton @showTrainer="handleShowChat" />
        <div v-if="showChat">
            <TheTrainer @showTrainer="handleShowChat" />
        </div>
    </div>
</template>

<style scoped></style>
