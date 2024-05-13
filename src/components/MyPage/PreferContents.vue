<script setup>
import IconArrowDown from "@/components/icons/IconArrowDown.vue";
import IconPlace from "@/components/icons/IconPlace.vue";
import IconCheck from "@/components/icons/IconCheck.vue";
import { ref } from "vue";
import { useUserInfoStore } from "@/stores/userInfo.js";
import { preferChange } from "@/apis/userApi";

const sidoList = ref([
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
]);
const store = useUserInfoStore();
const curSidos = ref(store.userInfo.prefer_place);
const changeSidos = async (sido, isAdd) => {
    if (isAdd) {
        curSidos.value.push(sido);
        curSidos.value.sort();
    } else {
        curSidos.value.splice(curSidos.value.indexOf(sido), 1);
    }

    await preferChange(curSidos.value)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
};
const displayState = ref("none");
const doEdit = () => {
    if (displayState.value == "none") {
        displayState.value = "flex";
    } else {
        displayState.value = "none";
    }
};
</script>

<template>
    <div class="row border-bottom mx-0 content-box">
        <div class="col-3 d-flex align-items-center fw-bold px-0 title">선호 지역</div>
        <div class="col-3 title-icon">
            <IconPlace :width="24" :height="24" :color="'#374559'" />
        </div>
        <div class="col-8 d-flex align-items-center position-relative">
            <div class="contents">
                <div v-if="curSidos.length > 0">
                    <span v-for="(val, idx) in curSidos" :key="val"
                        >{{ val }}{{ idx + 1 == curSidos.length ? "" : " / " }}</span
                    >
                </div>
                <div v-else>지역 무관</div>
            </div>
            <div
                class="w-50 flex-column position-absolute mt-3 py-2 rounded-3 bg-white dropdown-items"
                :style="{ display: displayState }"
            >
                <div
                    v-for="sido in sidoList"
                    :key="sido.name"
                    class="w-100 d-flex justify-content-between px-3 py-2 item"
                    @click="changeSidos(sido.name, !curSidos.includes(sido.name))"
                >
                    <div>{{ sido.name }}</div>
                    <div v-if="curSidos.includes(sido.name)">
                        <IconCheck :width="20" :height="20" :color="'#1769ff'" />
                    </div>
                </div>
            </div>
        </div>
        <div class="col-1 d-flex align-items-center justify-content-center px-0">
            <IconArrowDown
                :width="24"
                :height="24"
                :color="displayState == 'flex' ? '#1769ff' : '#999999'"
                @click="doEdit"
            />
        </div>
    </div>
</template>

<style scoped>
.content-box {
    border-color: #374553 !important;
    height: 60px;
}

.title {
    color: #646f7c;
    font-size: 14px;
}

.title-icon {
    display: none !important;
}

.contents {
    color: #374553;
    font-size: 14px;
}

.dropdown-items {
    box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.05);
    animation: moveDown 0.3s ease forwards;
}

.item {
    font-size: 14px;
    color: #374559;
}

.item:hover {
    color: #1769ff;
    font-weight: bold;
    background-color: #f7f7f7;
}

@keyframes moveDown {
    0% {
        top: 0px;
    }
    100% {
        top: 32px;
    }
}

@media (max-width: 575.98px) {
    .title {
        display: none !important;
    }

    .title-icon {
        display: flex !important;
        align-items: center;
    }
}
</style>
