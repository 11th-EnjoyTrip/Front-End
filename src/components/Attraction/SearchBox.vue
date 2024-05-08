<script setup>
import CommonInput from "@/components/common/CommonInput.vue";
import CommonButton from "../common/CommonButton.vue";
import { ref } from 'vue';

const sido = ref('')
const sidoList = ref([
    { name: '지역 전체', id: 'all' },
    { name: '서울', id: 'seoul' },
    { name: '인천', id: 'inchen' },
]);

const category = ref([])
const categoryList = ref([
    { name: '관광지', id: 0 },
    { name: '문화시설', id: 1 },
    { name: '숙박', id: 2 },
    { name: '행사 / 공연 / 축제', id: 3 },
    { name: '레포츠', id: 4 },
    { name: '쇼핑', id: 5 },
    {name : '음식점', id: 6}
])

const keyword = ref('')
const updateSido = (value) => {
    sido.value = value;
};
</script>

<template>
    <div class="searchBox">
        <div class="row mx-auto d-flex align-items-center justify-content-center input-group">
            <div class="col dropdown row m-1">
                <label class="" style="color: #999999; font-weight: 700; font-size: 15;">지역</label>
                <input
                 class="btn"
                 style="font-size: 20px; font-weight: 700; border: 0; text-align: left;
                 background-color: #ffffff;"
                 :style="{ 'color': (sido === '') ? '#CCCCCC' : 'black' }"
                 type="button" data-bs-toggle="dropdown"
                 data-bs-auto-close="true" :value="(sido == '') ? '어디로 여행가세요?' : sido" />
                <ul class="dropdown-menu" style="background: #FFFFFF; box-shadow: 0px 4px 19.35px rgba(0, 0, 0, 0.25);border-radius: 12.2692px;">
                    <div class="ms-4 me-4">
                        <div class="pt-3 pb-3" style="font-weight: 700; font-size: 18.4038px;">지역 선택</div>
                        <li v-for="sidoItem in sidoList" :key="sidoItem.id">
                            <a class="dropdown-item pb-2 ps-0"
                               style="font-weight: 700; font-size: 13px; background-color: #ffffff !important;"
                               :style="{ 'color': (sido === sidoItem.name) ? '#1769FF' : 'black' }"
                               href="#" @click="updateSido(sidoItem.name)">{{ sidoItem.name }}</a>
                        </li>
                    </div>
                </ul>
            </div>
            <div class="col dropdown row m-1">
                <label class="" style="color: #999999; font-weight: 700; font-size: 15;">관광지 유형</label>
                <input
                 class="btn"
                 style="font-size: 20px; font-weight: 700; border: 0; text-align: left;
                 background-color: #ffffff;"
                 type="button" data-bs-toggle="dropdown"
                 data-bs-auto-close="false" :value="(category == '') ? '관광지 유형 전체' : category" />
                <ul class="dropdown-menu" style="background: #FFFFFF; box-shadow: 0px 4px 19.35px rgba(0, 0, 0, 0.25);border-radius: 12.2692px;">
                    <div class="ms-4 me-4">
                        <div class="pt-3 pb-3" style="font-weight: 700; font-size: 18.4038px;">관광지 유형 선택</div>
                        <div class="form-switch">
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
                            <label class="form-check-label" 
                            style="color: #666666; font-weight: bold; margin-left: 10px !important;">
                            전체 선택</label>
                            <div class="">
                                <input type="checkbox" class="btn-check" id="btncheck" autocomplete="off">
                                <label class="btn btn-outline-primary" for="btncheck">Checkbox 1</label>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
            <div class="col">
                <label style="color: #999999; font-weight: 700; font-size: 15;">관광지 검색</label>
                <CommonInput
                class="border-0 ps-0"
                :height="40"
                :placeholder="'키워드를 검색해보세요.'"
                :icon="{ isStart: true, name: 'search' }"
                v-model="keyword"/>
            </div>

            <div class="col">
                <CommonButton
                class="search-button"
                :height="50"
                :value="'검색'"
                :bgColors="['#1769FF', '#e1e1e1']"
                :state=true
                :click="doLogin"
            />
            </div>

        </div>
    </div>
</template>

<style scoped>

.input-group{
    margin-top: 30px;
    width: 1200px;
    height: 95px;
    background: #FFFFFF;
    border: 1.20907px solid #EEEEEE;
    box-shadow: 0px 2.41814px 19.3451px rgba(0, 0, 0, 0.25);
    border-radius: 16.927px;
}

.search-button{
    background: #1769FF;
    border-radius: 10px !important;
    color: #FFFFFF;
    font-weight:bold;
    font-size: 18.136px;
}

</style>



/* 지역 선택 모달 */

position: absolute;
width: 321px;
height: 439px;
left: 221px;
top: 49px;

background: #FFFFFF;
box-shadow: 0px 4px 19.35px rgba(0, 0, 0, 0.25);
border-radius: 12.2692px;
