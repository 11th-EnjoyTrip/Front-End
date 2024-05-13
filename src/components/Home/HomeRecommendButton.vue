<script setup>
import { ref, onMounted, watch } from "vue";
import { useHomeInfoStore } from "@/stores/homeMenu";

const categoryList = ["관광지", "문화시설", "숙박", "행사 / 공연 / 축제", "레포츠", "쇼핑", "음식점"];
const store = useHomeInfoStore();
const picked = ref([]);
const pickedIdx = ref(0);

onMounted(() => {
    let idx;

    while (picked.value.length != 3) {
        idx = Math.floor(Math.random() * 7);

        if (picked.value.includes(categoryList[idx])) continue;

        picked.value.push(categoryList[idx]);
    }
});

watch(pickedIdx, async () => {
    store.changeContentType(picked.value[pickedIdx.value]);
    await store.queryContents(store.getContentTypeId);
});
</script>

<template>
    <div class="d-flex justify-content-center column-gap-2 mt-3">
        <div
            v-for="(category, idx) in picked"
            :key="category"
            class="px-3 py-1 rounded-5 fw-semibold"
            :class="{ unselected: pickedIdx != idx, selected: pickedIdx == idx }"
            @click="pickedIdx = idx"
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
