<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['showTrainer']);

const handleClick = () => {
  emit('showTrainer');
};
</script>

<template>
  <button class="floating-btn" @click="handleClick">↑</button>
</template>

<style scoped>
  .floating-btn {
    position: fixed;
    bottom: 40px;
    right: 13%;
    width: 50px;
    height: 50px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
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

  .floating-btn:hover {
    background-color: #0056b3;
  }
</style>
