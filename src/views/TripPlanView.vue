<script setup>
import NavComp from "@/components/Nav/NavComp.vue";
import FooterComp from "@/components/Footer/FooterComp.vue";
import { RouterView } from "vue-router";
</script>

<template>
    <NavComp :withLower="true" />
    <div class="row">
        <RouterView />
    </div>
    <FooterComp class="mt-5"/>
</template>

<style scoped></style>
