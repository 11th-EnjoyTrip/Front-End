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
    <div style="overflow:scroll; height: 400px;">
        <div v-for="(message, i) in messages"
        :key="i"
        class="mb-4"
        >
        <v-chip color="indigo-lighten-1" variant="elevated" size="x-small" class="mb-2">
        {{ capitalize(message.role) }}
        </v-chip>
        <v-sheet color="blue-grey-lighten-4" rounded="xl" class="px-4 py-2">
        {{ message.content }}
        </v-sheet>
    </div>
    </div>
</template>