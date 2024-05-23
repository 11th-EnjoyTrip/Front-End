<script setup>
defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
});

const capitalize = (v) => `${v.charAt(0).toUpperCase()}${v.slice(1)}`;

</script>

<template>
  <div class="section">
    <div v-for="(message, i) in messages" :key="i" class="mb-4" :class="{ 'text-right': message.role === 'user', 'text-left': message.role !== 'user' }">
      <v-chip color="#5c6cc4" variant="elevated" size="x-small" class="mb-2">
        {{ capitalize(message.role) }}
      </v-chip>
      <v-sheet color="#CFD8DC" class="px-3 py-2" style="border-radius: 18px;">
        {{ message.content }}
      </v-sheet>
    </div>
  </div>
</template>

<style scoped>
.section {
    overflow-y:auto; 
    overflow-x: hidden; 
    height: 400px;  
}
.text-right {
  text-align: right;
}
.text-left {
  text-align: left;
}
</style>