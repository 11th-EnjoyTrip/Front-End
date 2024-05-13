<script setup>
import { ref, onMounted } from "vue";

const categoryList = ref([
    { name: "관광지", id: 0 },
    { name: "문화시설", id: 1 },
    { name: "숙박", id: 2 },
    { name: "행사 / 공연 / 축제", id: 3 },
    { name: "레포츠", id: 4 },
    { name: "쇼핑", id: 5 },
    { name: "음식점", id: 6 },
]);
const picked = ref([]);
const pickedIdx = ref(0);

onMounted(() => {
    let idx;
    while (picked.value.length != 3) {
        idx = Math.floor(Math.random() * 7);
        if (picked.value.includes(categoryList.value[idx].name)) continue;
        picked.value.push(categoryList.value[idx].name);
    }
});

const changeMenu = (idx) => (pickedIdx.value = idx);
</script>

<template>
    <div class="d-flex justify-content-center column-gap-2 mt-3">
        <div
            v-for="(category, idx) in picked"
            :key="category"
            class="px-3 py-1 rounded-5 fw-semibold"
            :class="{ unselected: pickedIdx != idx, selected: pickedIdx == idx }"
            @click="changeMenu(idx)"
        >
            {{ category }}
        </div>
    </div>
</template>

<style scoped>
.unselected {
    font-size: 14px;
    border: 1px solid #e1e1e1;
    background-color: white;
    color: #646f7c;
    cursor: grab;
}

.selected {
    font-size: 14px;
    border: 1px solid #1769ff;
    background-color: rgba(23, 105, 255, 0.1);
    color: #1769ff;
    cursor: grab;
}
</style>
