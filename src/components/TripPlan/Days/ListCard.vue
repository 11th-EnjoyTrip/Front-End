<script setup>
import ListCardHeader from "@/components/TripPlan/Days/ListCardHeader.vue";
import ListCardBody from "@/components/TripPlan/Days/ListCardBody.vue";
import { useTripPlanStore } from "@/stores/tripPlan";
import { storeToRefs } from "pinia";

defineProps({
    day: Number,
    type: String,
});

const store = useTripPlanStore();
const { listItem, planDetail } = storeToRefs(store);
</script>

<template>
    <a-collapse
        class="bg-white"
        v-model:activeKey="listItem[day]"
        accordion
        :expandIconPosition="'end'"
        :bordered="false"
    >
        <a-collapse-panel
            v-for="(v, i) in planDetail.dayPlanList[day].detailPlanList"
            :key="v.title"
            class="panel"
            :showArrow="false"
        >
            <template #header>
                <ListCardHeader :day="day" :idx="i" />
            </template>
            <ListCardBody :day="day" :idx="i" :type="type" />
        </a-collapse-panel>
    </a-collapse>
</template>

<style scoped>
.panel {
    border-radius: 5px;
    margin-bottom: 24px;
    overflow: hidden;
    border: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
