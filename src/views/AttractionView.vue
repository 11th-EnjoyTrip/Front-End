<script setup>
import SearchBox from "@/components/Attraction/SearchBox.vue";
import NavComp from "@/components/Nav/NavComp.vue";
import SearchItemCard from "@/components/Attraction/SearchItemCard.vue";
</script>

<template>
    <NavComp :withLower="true" />
    <SearchBox/>
    <hr width="1200px" class="mx-auto" >
    <SearchItemCard/>
</template>

<style scoped></style>

