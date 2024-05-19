<script setup>
import IconDeparture from "@/components/icons/IconDeparture.vue";
import TripPlanAddSido from "@/components/TripPlan/Write/Map/TripPlanAddSido.vue";
import TripPlanAddType from "@/components/TripPlan/Write/Map/TripPlanAddType.vue";
import TripPlanAddKeyword from "@/components/TripPlan/Write/Map/TripPlanAddKeyword.vue";
</script>

<template>
    <div class="add-search">
        <div class="mt-4 d-flex justify-content-center align-items-center column-gap-3">
            <IconDeparture :width="24" :height="24" :color="'#1769ff'" />
            <div class="add-search-title">여행지 검색</div>
        </div>
        <div class="px-3 mt-4">
            <div class="add-search-sub-title">여행지 정보</div>
            <div class="add-search-content-box">
                <div class="col-2 add-search-content-title">지역</div>
                <div class="col-1 align-self-center">|</div>
                <TripPlanAddSido />
            </div>
            <div class="add-search-content-box">
                <div class="col-2 add-search-content-title">유형</div>
                <div class="col-1 align-self-center">|</div>
                <TripPlanAddType />
            </div>
            <div class="add-search-content-box">
                <div class="col-2 add-search-content-title">키워드</div>
                <div class="col-1 align-self-center">|</div>
                <TripPlanAddKeyword />
            </div>
        </div>
    </div>
</template>

<style scoped>
.add-search {
    position: absolute;
    top: 10px;
    left: 20px;
    width: 400px;
    height: 95%;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    z-index: 10;
}

.add-search-title {
    font-weight: 600;
    font-size: 20px;
    color: #374553;
}

.add-search-sub-title {
    font-weight: 600;
    font-size: 16px;
    color: #374553;
}

.add-search-content-box {
    display: flex;
    align-items: center;
    height: 50px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-top: 8px;
}

.add-search-content-title {
    font-size: 16px;
    font-weight: 500;
    color: #374553;
    text-align: center;
    line-height: 50px;
}
</style>
