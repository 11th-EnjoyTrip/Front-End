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

const category = ref([
])

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
const updateCategory = (item) => {
    const index = category.value.findIndex(cat => cat.id === item.id);
    if (index !== -1) {
        // 이미 존재하는 경우 제거
        category.value.splice(index, 1);
    } else {
        // 존재하지 않는 경우 추가
        category.value.push(item);
    }
    console.log(categoryList.value)
}

const toggleAllCategories = () => {
    if (document.getElementById('flexSwitchCheckChecked').checked) {
        // 체크되었을 때: 모든 카테고리를 선택
        category.value = JSON.parse(JSON.stringify(categoryList.value));
    } else {
        // 체크 해제되었을 때: 모든 카테고리를 해제
        category.value = [];
    }
};
</script>

<template>
    <div class="searchBox">
        <div class="row mx-auto d-flex align-items-center justify-content-centers input-group">
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
                 data-bs-auto-close="outside" 
                 :style="{ 'color': (category.length == 0) ? '#CCCCCC' : 'black' }"
                 :value="(category.length == 0) ? '관광지 유형을 선택해주세요' :
                    (category.length ==7 )? '관광지 유형 전체' : category.map(cat => cat.name).join(', ')" /> 

                <ul class="dropdown-menu p-4"
                    style="background: #FFFFFF; box-shadow: 0px 4px 19.35px rgba(0, 0, 0, 0.25); min-width: 350px;
                        border-radius: 12.2692px;">
                    <div class="ms-4 me-4">
                        <div class="pt-3 pb-3" style="font-weight: 700; font-size: 18.4038px;">관광지 유형 선택</div>
                        <div class="form-switch ps-0">
                            <input class="form-check-input ms-1" 
                            type="checkbox" id="flexSwitchCheckChecked"
                               @change="toggleAllCategories"
                             :checked="category.length === categoryList.length"
                            >
                            <label class="form-check-label mb-2" style="color: #666666; font-weight: bold; margin-left: 10px !important;">
                                전체 선택
                            </label>
                            <div class="row">
                                <div v-for="categoryItem in categoryList" :key="categoryItem.id" 
                                class="col-auto mt-2 mb-1"
                                >
                                    <input type="checkbox" class="btn-check"
                                        :id="'checkbox_' + categoryItem.id"
                                        @click="updateCategory(categoryItem)"
                                        :checked="category.some(cat => cat.id === categoryItem.id)"
                                        >
                                    <label class="btn btn-outline-primary"
                                        :for="'checkbox_' + categoryItem.id"
                                        :class="{ 'active': category.some(cat => cat.id === categoryItem.id) }"
                                        style="font-weight: 600; font-size: 16px;
                                        border: 1px solid ;
                                        border-radius: 10px ; 
                                        border-color: #EEEEEE;
                                        background-color: #ffffff;
                                        color: #666666;">
                                        {{ categoryItem.name }}
                                    </label>
                                </div>
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

            <div class="col d-flex justify-content-end">
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
    padding: 15px;
    width: 1200px;
    background: #FFFFFF;
    border: 1.20907px solid #EEEEEE;
    box-shadow: 0px 2.41814px 19.3451px rgba(0, 0, 0, 0.25);
    border-radius: 16.927px;
}

.search-button{
    margin: 0px !important;
    background: #1769FF;
    max-width: 100px;
    border-radius: 10px !important;
    color: #FFFFFF;
    font-weight:bold;
    font-size: 18.136px;
}
.active {
    background-color: #E9F0FE !important; 
    color: #1769FF !important;
    border-color: #73AFFF  !important;
}

</style>

/* 관광지 */

box-sizing: border-box;

position: absolute;
width: 93px;
height: 38px;
left: 56px;
top: 159px;

background: #E9F0FE;
border: 1px solid #73AFFF;
border-radius: 10px;
