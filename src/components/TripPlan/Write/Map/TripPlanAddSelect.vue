<script setup>
import IconPlace from "@/components/icons/IconPlace.vue";
import TripPlanAddSearchResultCard from "@/components/TripPlan/Write/Map/TripPlanAddSearchResultCard.vue";
import { VueDraggableNext } from "vue-draggable-next";
import { ref } from "vue";
import { message } from "ant-design-vue";
import { useEditTripPlanStore } from "@/stores/editTripPlan";
import { storeToRefs } from "pinia";

const store = useEditTripPlanStore();
const { selected, daysSelected, canEdit } = storeToRefs(store);
const addDays = () => {
    daysSelected.value.push([]);
};
const delDays = () => {
    if (daysSelected.value.length == 1) {
        message.warn("하루 이상의 일정이 있어야 합니다");
    } else {
        daysSelected.value.pop().forEach((v) => {
            selected.value.push(v);
        });
    }
};
const openDays = ref(false);
</script>

<template>
    <div class="add-container add-select">
        <div class="mt-4 d-flex justify-content-center align-items-center column-gap-3">
            <IconPlace :width="24" :height="24" :color="'#1769ff'" />
            <div class="add-container-title">선택 여행지</div>
        </div>
        <div class="add-content-result-container select-container">
            <VueDraggableNext class="dragArea w-full" :group="'card'" :list="selected">
                <TripPlanAddSearchResultCard v-for="(v, i) in selected" :key="i" :item="v" :type="'delete'" :idx="i" />
            </VueDraggableNext>
        </div>
        <div class="d-flex justify-content-center column-gap-2 w-100 mt-2">
            <button class="add-select-btn" @click="openDays = true">상세 계획 펼치기</button>
            <button class="add-select-btn" @click="canEdit = true">일자 별 계획 세우기</button>
        </div>
    </div>
    <div v-if="openDays" class="add-container add-days">
        <div class="add-days-inner-container">
            <div class="w-100" v-for="(v, i) in daysSelected" :key="i">
                <div class="mt-4 d-flex justify-content-center align-items-center column-gap-3">
                    <IconPlace :width="24" :height="24" :color="'#1769ff'" />
                    <div class="add-container-title">Day {{ i + 1 }}</div>
                </div>
                <div class="add-content-result-container">
                    <VueDraggableNext class="dragArea w-full" :group="'card'" :list="daysSelected[i]">
                        <TripPlanAddSearchResultCard
                            v-for="(val, idx) in daysSelected[i]"
                            :key="idx"
                            :item="val"
                            :type="'delete'"
                            :idx="idx"
                        />
                    </VueDraggableNext>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center column-gap-2 w-100 mt-2">
            <button class="add-select-btn" @click="addDays">날짜 추가</button>
            <button class="add-select-btn" @click="openDays = false">상세 계획 접기</button>
            <button class="add-select-btn" @click="delDays">날짜 제거</button>
        </div>
    </div>
</template>

<style scoped>
.add-container {
    position: absolute;
    top: 10px;
    width: 400px;
    height: 95%;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    z-index: 10;
}

.add-select {
    right: 20px;
}

.add-days {
    right: 430px;
}

.add-days-inner-container {
    width: 100%;
    height: 90%;
    overflow-y: scroll;
}

.add-days-inner-container::-webkit-scrollbar {
    width: 0;
}

.add-container-title {
    font-weight: 600;
    font-size: 16px;
    color: #374553;
}

.add-content-result-container {
    width: 100%;
    margin-top: 10px;
    padding: 5px 10px;
    overflow-y: scroll;
}

.select-container {
    height: 85%;
}

.add-content-result-container::-webkit-scrollbar {
    width: 0;
}

.add-select-btn {
    padding: 5px 10px;
    background-color: #f1f1f1;
    border: 0;
    border-radius: 15px;
    font-size: 14px;
    font-weight: 500;
}

.add-select-btn:hover {
    color: white;
    background-color: #1769ff;
}
</style>
