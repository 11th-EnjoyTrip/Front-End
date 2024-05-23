<script setup>
import { ref } from 'vue';
import NavComp from "@/components/Nav/NavComp.vue";
import TheTrainer from '@/components/Chat/TheTrainer.vue';
import ChatButton from "@/components/Chat/ChatButton.vue";
import { RouterView } from "vue-router";


const showChat = ref(false);

const handleShowChat = () => {
  showChat.value = !showChat.value;
};

</script>

<template>
    <div>
        <NavComp :withLower="true" />
    <div class="row">
        <RouterView />
    </div>
    <ChatButton @showTrainer="handleShowChat"/>
    <div v-if="showChat">
      <TheTrainer @showTrainer="handleShowChat" />
    </div>
    </div>

</template>

<style scoped></style>
