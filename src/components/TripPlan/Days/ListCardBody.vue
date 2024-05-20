<script setup>
import { ref } from "vue";

defineProps({
    type: String,
});

const departureTime = ref("");
const arrivalTime = ref("");
const selected = ref("자동차");
</script>

<template>
    <div class="mt-3">
        <div class="px-2 row">
            <div class="col">
                <div class="card-body-title">도착</div>
                <div v-if="type == 'read'" class="card-body-info">08:30</div>
                <a-time-picker v-else v-model:value="arrivalTime" :placeholder="'도착'" use12-hours format="h:mm A" />
            </div>
            <div class="col">
                <div class="card-body-title">출발</div>
                <div v-if="type == 'read'" class="card-body-info">11:00</div>
                <a-time-picker v-else v-model:value="departureTime" :placeholder="'출발'" use12-hours format="h:mm A" />
            </div>
            <div class="col">
                <div class="card-body-title">이동수단</div>
                <div v-if="type == 'read'" class="card-body-info">자동차</div>
                <a-select
                    v-else
                    ref="select"
                    v-model:value="selected"
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
                도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔도레미파솔
            </div>
            <textarea v-else class="card-body-info card-body-description" :class="{ edit: type == 'edit' }"></textarea>
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
