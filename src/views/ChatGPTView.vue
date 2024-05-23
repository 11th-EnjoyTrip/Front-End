<script setup>
import { ref } from 'vue';
import NavComp from "@/components/Nav/NavComp.vue";
import TheTrainer from '@/components/Chat/TheTrainer.vue';
import HomeTodayTour from "@/components/Home/HomeTodayTour.vue";
import HomeRecommend from "@/components/Home/HomeRecommend.vue";
import ChatButton from "@/components/Chat/ChatButton.vue";

const showChat = ref(false);

const handleShowChat = () => {
  showChat.value = !showChat.value;
};

</script>

<template>
  <NavComp :withLower="true" />
  <HomeTodayTour />
  <HomeRecommend />

  <ChatButton @showTrainer="handleShowChat"/>
  <div v-if="showChat">
    <TheTrainer />
  </div>
</template>

<style scoped>
</style>
