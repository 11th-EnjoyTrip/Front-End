<script setup>
import TripPlanDaysMap from "@/components/TripPlan/Days/TripPlanDaysMap.vue";
import TripPlanDaysList from "@/components/TripPlan/Days/TripPlanDaysList.vue";
</script>

<template>
    <div class="mb-5 w-100">
        <div v-for="(v, i) in 3" :key="i">
            <div class="mt-5 text-center fw-bold fs-5">Day {{ i + 1 }}</div>
            <div v-if="i % 2 == 0" class="d-flex">
                <TripPlanDaysList :day="i" :type="'edit'" />
                <TripPlanDaysMap :day="i" />
            </div>
            <div v-else class="d-flex">
                <TripPlanDaysMap :day="i" />
                <TripPlanDaysList :day="i" :type="'edit'" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
