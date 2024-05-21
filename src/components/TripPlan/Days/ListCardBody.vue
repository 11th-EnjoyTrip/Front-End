<script setup>
import { useTripPlanStore } from "@/stores/tripPlan.js";
import { useEditTripPlanStore } from "@/stores/editTripPlan";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
import { ref, watch } from "vue";

const props = defineProps({
    day: Number,
    idx: Number,
    type: String,
});

const store = useTripPlanStore();
const { planDetail } = storeToRefs(store);
const getTime = (time) => {
    const splits = time.split(":");
    return `${splits[0]}:${splits[1]}`;
};

const stores = useEditTripPlanStore();
const { attractionInfos } = storeToRefs(stores);
const newArrivalTime = ref(
    props.type == "read"
        ? ""
        : dayjs(
              attractionInfos.value[props.day][props.idx].arrivalTime == ""
                  ? "12:00"
                  : attractionInfos.value[props.day][props.idx].arrivalTime,
              "HH:mm:ss"
          )
);
const newDepartureTime = ref(
    props.type == "read"
        ? ""
        : dayjs(
              attractionInfos.value[props.day][props.idx].departureTime == ""
                  ? "12:00"
                  : attractionInfos.value[props.day][props.idx].departureTime,
              "HH:mm:ss"
          )
);
const newTransportation = ref(props.type == "read" ? "" : attractionInfos.value[props.day][props.idx].transportation);
const newMemo = ref(props.type == "read" ? "" : attractionInfos.value[props.day][props.idx].memo);
watch([newArrivalTime, newDepartureTime, newTransportation, newMemo], () => {
    attractionInfos.value[props.day][props.idx].arrivalTime = newArrivalTime.value.format("HH:mm:ss");
    attractionInfos.value[props.day][props.idx].departureTime = newDepartureTime.value.format("HH:mm:ss");
    attractionInfos.value[props.day][props.idx].transportation = newTransportation.value;
    attractionInfos.value[props.day][props.idx].memo = newMemo.value;
});
</script>

<template>
    <div class="mt-3">
        <div class="px-2 row">
            <div class="col">
                <div class="card-body-title">도착</div>
                <div v-if="type == 'read'" class="card-body-info">
                    {{ getTime(planDetail.dayPlanList[day].detailPlanList[idx].arrivalTime) }}
                </div>
                <a-time-picker v-else v-model:value="newArrivalTime" :placeholder="'도착'" format="HH:mm" />
            </div>
            <div class="col">
                <div class="card-body-title">출발</div>
                <div v-if="type == 'read'" class="card-body-info">
                    {{ getTime(planDetail.dayPlanList[day].detailPlanList[idx].departureTime) }}
                </div>
                <a-time-picker v-else v-model:value="newDepartureTime" :placeholder="'출발'" format="HH:mm" />
            </div>
            <div class="col">
                <div class="card-body-title">이동수단</div>
                <div v-if="type == 'read'" class="card-body-info">
                    {{ planDetail.dayPlanList[day].detailPlanList[idx].transportation == "CAR" ? "자동차" : "도보" }}
                </div>
                <a-select
                    v-else
                    ref="select"
                    v-model:value="newTransportation"
                    style="width: 100%"
                    @focus="focus"
                    @change="handleChange"
                >
                    <a-select-option value="자동차">자동차</a-select-option>
                    <a-select-option value="도보">도보</a-select-option>
                </a-select>
            </div>
        </div>
        <div class="px-2 mt-3">
            <div class="card-body-title">간단 설명</div>
            <div v-if="type == 'read'" class="card-body-info card-body-description">
                {{ planDetail.dayPlanList[day].detailPlanList[idx].memo }}
            </div>
            <textarea
                v-else
                class="card-body-info card-body-description"
                :class="{ edit: type == 'edit' }"
                v-model="newMemo"
            ></textarea>
        </div>
    </div>
</template>

<style scoped>
.card-body-title {
    color: #646f7c;
}

.card-body-info {
    color: #374553;
    font-size: 16px;
}

.card-body-description {
    width: 100%;
    border: 0;
    margin-top: 4px;
    resize: none;
}

.edit {
    height: 100px;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    padding: 5px 10px;
}

.edit::-webkit-scrollbar {
    width: 0;
}

.card-body-description.edit:focus {
    outline: 1px solid #374553;
}

.card-body-description:focus {
    outline: none;
}
</style>
