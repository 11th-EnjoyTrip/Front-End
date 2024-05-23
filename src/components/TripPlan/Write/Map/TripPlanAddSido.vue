<script setup>
import { ref } from "vue";
import IconArrowDown from "@/components/icons/IconArrowDown.vue";
import IconCheck from "@/components/icons/IconCheck.vue";
import { useEditTripPlanStore } from "@/stores/editTripPlan";
import { storeToRefs } from "pinia";

const sidoList = ref([
    { name: "지역 전체", id: 0 },
    { name: "서울", id: 1 },
    { name: "인천", id: 2 },
    { name: "대전", id: 3 },
    { name: "대구", id: 4 },
    { name: "광주", id: 5 },
    { name: "부산", id: 6 },
    { name: "울산", id: 7 },
    { name: "세종특별자치시", id: 8 },
    { name: "경기도", id: 31 },
    { name: "강원도", id: 32 },
    { name: "충청북도", id: 33 },
    { name: "충청남도", id: 34 },
    { name: "경상북도", id: 35 },
    { name: "경상남도", id: 36 },
    { name: "전라북도", id: 37 },
    { name: "전라남도", id: 38 },
    { name: "제주도", id: 39 },
]);
const store = useEditTripPlanStore();
const { curSido } = storeToRefs(store);
const idx = ref(0);
const changeSido = (sido) => {
    idx.value = sido;
    curSido.value = sidoList.value[sido].id;
    doEdit();
};

const displayState = ref("none");
const doEdit = () => {
    if (displayState.value == "none") displayState.value = "flex";
    else displayState.value = "none";
};
</script>

<template>
    <div class="col-8 add-search-content">
        {{ sidoList[idx].name }}
        <div class="add-search-dropdown" :style="{ display: displayState }">
            <div
                v-for="(sido, i) in sidoList"
                :key="sido.name"
                class="px-3 py-2 w-100 d-flex justify-content-between"
                @click="changeSido(i)"
            >
                <div>{{ sido.name }}</div>
                <div v-if="curSido == i">
                    <IconCheck :width="20" :height="20" :color="'#1769ff'" />
                </div>
            </div>
        </div>
    </div>
    <div class="col-1">
        <IconArrowDown
            :width="20"
            :height="20"
            :color="displayState == 'flex' ? '#1769ff' : '#999999'"
            @click="doEdit"
        />
    </div>
</template>

<style scoped>
.add-search-content {
    position: relative;
    font-size: 16px;
    font-weight: 500;
    color: #374553;
}

.add-search-dropdown {
    position: absolute;
    flex-direction: column;
    width: 100%;
    margin-top: 12px;
    padding: 8px 0px;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    background-color: white;
    animation: moveDown 0.3s ease forwards;
    z-index: 5;
}

@keyframes moveDown {
    0% {
        top: 0px;
    }
    100% {
        top: 32px;
    }
}
</style>
