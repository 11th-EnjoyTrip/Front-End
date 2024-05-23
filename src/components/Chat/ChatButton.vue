<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['showTrainer']);

const handleClick = () => {
  emit('showTrainer');
};
</script>

<template>
  <button class="floating-btn" @click="handleClick"><img src="@/assets/chat/chatbot.png" width="40" height="40"/></button>
</template>

<style scoped>
  .floating-btn {
    position: fixed;
    bottom: 40px;
    right: 13%;
    width: 50px;
    height: 50px;
    background-color: #ffffff;
    border: none;
    border-radius: 40%;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  @media (max-width: 1350px) {
    .floating-btn {
      right: 8%;
    }
  }

  @media (max-width: 1500px){
    .floating-btn {
      right: 10%;
    }
  }
  
  @media(min-width:1600px){
    .floating-btn{
      right: 18%;
    }
  }

  .floating-btn:hover {
    background-color: #E9F0FE;
  }
</style>
