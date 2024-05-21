<script setup>
import ListCardHeader from "@/components/TripPlan/Days/ListCardHeader.vue";
import ListCardBody from "@/components/TripPlan/Days/ListCardBody.vue";
import { useTripPlanStore } from "@/stores/tripPlan";
import { useEditTripPlanStore } from "@/stores/editTripPlan";
import { storeToRefs } from "pinia";

defineProps({
    day: Number,
    type: String,
});

const store = useTripPlanStore();
const { listItem, planDetail } = storeToRefs(store);
const stores = useEditTripPlanStore();
const { listItems, daysSelected } = storeToRefs(stores);
</script>

<template>
    <div v-if="type == 'read'" class="w-100">
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
                    <ListCardHeader :day="day" :idx="i" :type="type" />
                </template>
                <ListCardBody :day="day" :idx="i" :type="type" />
            </a-collapse-panel>
        </a-collapse>
    </div>
    <div v-else class="w-100">
        <a-collapse
            class="bg-white"
            v-model:activeKey="listItems[day]"
            accordion
            :expandIconPosition="'end'"
            :bordered="false"
        >
            <a-collapse-panel v-for="(v, i) in daysSelected[day]" :key="v.title" class="panel" :showArrow="false">
                <template #header>
                    <ListCardHeader :day="day" :idx="i" :type="type" />
                </template>
                <ListCardBody :day="day" :idx="i" :type="type" />
            </a-collapse-panel>
        </a-collapse>
    </div>
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
