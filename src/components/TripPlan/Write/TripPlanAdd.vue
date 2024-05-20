<script setup>
import TripPlanAddMap from "@/components/TripPlan/Write/Map/TripPlanAddMap.vue";
import TripPlanAddInfo from "@/components/TripPlan/Write/Info/TripPlanAddInfo.vue";
import TripPlanAddDays from "@/components/TripPlan/Write/Days/TripPlanAddDays.vue";
</script>

<template>
    <TripPlanAddMap />
    <div class="row">
        <div class="col-9 add-info">
            <TripPlanAddInfo />
        </div>
    </div>
    <div class="row">
        <div class="col-9 add-info">
            <TripPlanAddDays />
        </div>
    </div>
</template>

<style scoped>
.add-info {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
}
</style>
