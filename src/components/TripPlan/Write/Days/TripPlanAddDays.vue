<script setup>
import TripPlanAddDaysDetail from "@/components/TripPlan/Write/Days/TripPlanAddDaysDetail.vue";
import TripPlanDaysList from "@/components/TripPlan/Days/TripPlanDaysList.vue";
import { useEditTripPlanStore } from "@/stores/editTripPlan";
import { storeToRefs } from "pinia";

const store = useEditTripPlanStore();
const { daysSelected } = storeToRefs(store);
</script>

<template>
    <div class="mb-5 w-100">
        <div v-for="(v, i) in daysSelected" :key="i">
            <div class="mt-5 text-center fw-bold fs-5">Day {{ i + 1 }}</div>
            <div v-if="i % 2 == 0" class="d-flex">
                <TripPlanDaysList :day="i" :type="'add'" />
                <TripPlanAddDaysDetail :day="i" />
            </div>
            <div v-else class="d-flex">
                <TripPlanAddDaysDetail :day="i" />
                <TripPlanDaysList :day="i" :type="'add'" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
