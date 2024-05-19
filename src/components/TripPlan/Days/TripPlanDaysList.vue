<script setup>
import ListCard from "@/components/TripPlan/Days/ListCard.vue";

defineProps({
    day: Number,
});
</script>

<template>
    <div class="days-list">
        <ListCard :day="day" />
    </div>
</template>

<style scoped>
.days-list {
    width: 35%;
    border-radius: 5px;
    height: 700px;
    margin-top: 40px;
    padding: 10px;
    overflow-y: scroll;
}

::-webkit-scrollbar {
    width: 0;
}
</style>
