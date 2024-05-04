<script setup>
import { RouterView } from "vue-router";
import NavComp from "./components/Nav/NavComp.vue";
import "./assets/app.css";
</script>

<template>
    <NavComp />
    <RouterView />
</template>

<style scoped></style>
