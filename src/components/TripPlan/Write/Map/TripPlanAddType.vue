<script setup>
import { ref } from "vue";
import IconArrowDown from "@/components/icons/IconArrowDown.vue";
import IconCheck from "@/components/icons/IconCheck.vue";

const curType = ref(0);
const typeList = ref([
    { name: "유형 무관", id: 0 },
    { name: "관광지", id: 1 },
    { name: "문화시설", id: 2 },
    { name: "숙박", id: 3 },
    { name: "행사/공연/축제", id: 4 },
    { name: "레포츠", id: 5 },
    { name: "쇼핑", id: 6 },
    { name: "음식점", id: 7 },
]);
const changeType = (type) => {
    curType.value = typeList.value[type].id;
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
        {{ typeList[curType].name }}
        <div class="add-search-dropdown" :style="{ display: displayState }">
            <div
                v-for="(type, i) in typeList"
                :key="type.name"
                class="px-3 py-2 w-100 d-flex justify-content-between"
                @click="changeType(i)"
            >
                <div>{{ type.name }}</div>
                <div v-if="curType == i">
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
