<script setup>
import NavComp from "@/components/Nav/NavComp.vue";
import { RouterView } from "vue-router";
</script>

<template>
    <NavComp :withLower="true" />
    <div class="row">
        <RouterView />
    </div>
</template>

<style scoped></style>
