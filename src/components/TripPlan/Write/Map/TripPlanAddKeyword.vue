<script setup>
import IconSearch from "@/components/icons/IconSearch.vue";
</script>

<template>
    <input class="col-8 add-search-content" />
    <div class="col-1"><IconSearch :width="20" :height="20" :color="'#1769ff'" /></div>
</template>

<style scoped>
.add-search-content {
    border: 0;
    color: #374553;
}

.add-search-content:focus {
    outline: none;
}
</style>
