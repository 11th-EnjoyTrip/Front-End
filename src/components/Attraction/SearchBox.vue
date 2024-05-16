<script setup>
import CommonInput from "@/components/common/CommonInput.vue";
import CommonButton from "../common/CommonButton.vue";
import ModalSearchResult from "@/components/Modal/ModalSearchResult.vue";
import { ref } from "vue";

const sidoName = ref("");
const sido = ref();
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
]);

const category = ref([]);

const categoryList = ref([
    { name: "관광지", id: 12 },
    { name: "문화시설", id: 14 },
    { name: "숙박", id: 32 },
    { name: "행사 / 공연 / 축제", id: 15 },
    { name: "레포츠", id: 28 },
    { name: "쇼핑", id: 38 },
    { name: "음식점", id: 39 },
]);

const keyword = ref("");

const updateSido = (item) => {
    console.log(item)
    sido.value = item.id;
    sidoName.value = item.name;
};
const updateCategory = (item) => {
    const index = category.value.findIndex((cat) => cat.id === item.id);
    if (index !== -1) {
        // 이미 존재하는 경우 제거
        category.value.splice(index, 1);
    } else {
        // 존재하지 않는 경우 추가
        category.value.push(item);
    }
    console.log(categoryList.value);
};

const toggleAllCategories = () => {
    if (document.getElementById("flexSwitchCheckChecked").checked) {

        // 체크되었을 때: 모든 카테고리를 선택
        category.value = JSON.parse(JSON.stringify(categoryList.value));
    } else {
        // 체크 해제되었을 때: 모든 카테고리를 해제
        category.value = [];
    }
};

const emit = defineEmits(["searchEvent"]);
const modalState = ref(false);
const isSuccess = ref(false);
const result = ref("");

// 검색 이벤트
const doSearch = () => {
    console.log(sido.value)
    // 유효성 체크
    if (sido.value == undefined || category.value.length == 0) {
        modalState.value = true;
        isSuccess.value = false;
        result.value = "지역을 입력하시거나 <br/> 관광지 유형을 선택해 주세요.";
    } else {
        // 성공한 경우
        isSuccess.value = true;

        //카테고리 형식 변경
        const categorys = ref(category.value.map((cat)=>cat.id).join(","))
  
        // 부모 컴포넌트로 전달
        emit("searchItem", sido,sidoName, categorys, keyword);
    }
};
</script>

<template>
    <div class="searchBox">
        <div class="row mx-auto d-flex align-items-center input-group">
            <div class="col-xl-3 col-lg-12 dropdown row search-style search-item region-style search-col">
                <label class="" style="color: #999999; font-weight: 700; font-size: 100%">지역</label>
                <input
                    class="btn m-xxl-0 input-border"
                    style="font-size: 20px; font-weight: 700; border-radius: 0; text-align: left; border-color: #ffffff"
                    :style="{ color: sidoName === '' ? '#CCCCCC' : 'black' }"
                    type="button"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="true"
                    :value="sidoName == '' ? '어디로 여행가세요?' : sidoName"
                />
                <ul
                    class="dropdown-menu"
                    style="box-shadow: 0px 4px 19.35px rgba(0, 0, 0, 0.25); border-radius: 12.2692px"
                >
                    <div class="ms-4 mb-3">
                        <div class="pt-3 pb-3" style="font-weight: 700; font-size: 18.4038px">지역 선택</div>
                        <li v-for="sidoItem in sidoList" :key="sidoItem.id">
                            <a
                                class="dropdown-item pb-2 ps-0"
                                style="font-weight: 700; font-size: 14px"
                                :style="{ color: sidoName === sidoItem.name ? '#1769FF' : 'black' }"
                                href="#"
                                @click="updateSido(sidoItem)"
                                >{{ sidoItem.name }}
                            </a>
                        </li>
                    </div>
                </ul>
            </div>
            <div class="col-xl-4 col-lg-12 dropdown row ms-1 search-style search-item search-col">
                <label class="" style="color: #999999; font-weight: 700; font-size: 15">관광지 유형</label>
                <input
                    class="btn m-0 input-border"
                    style="font-size: 20px; font-weight: 700; border-radius: 0; text-align: left; border-color: #ffffff"
                    type="button"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    :style="{ color: category.length == 0 ? '#CCCCCC' : 'black' }"
                    :value="
                        category.length == 0
                            ? '관광지 유형을 선택해주세요'
                            : category.length == 7
                            ? '관광지 유형 전체'
                            : category.map((cat) => cat.name).join(', ')"
                    />
                <ul
                    class="dropdown-menu p-4"
                    style="
                        background: #ffffff;
                        box-shadow: 0px 4px 19.35px rgba(0, 0, 0, 0.25);
                        border-radius: 12.2692px;
                    "
                >
                    <div class="ms-4 me-4">
                        <div class="pt-3 pb-3" style="font-weight: 700; font-size: 18.4038px">관광지 유형 선택</div>
                        <div class="form-switch ps-0">
                            <input
                                class="form-check-input ms-1"
                                type="checkbox"
                                id="flexSwitchCheckChecked"
                                @change="toggleAllCategories"
                                :checked="category.length === categoryList.length"
                            />
                            <label
                                class="form-check-label mb-2"
                                style="color: #666666; font-weight: bold; margin-left: 10px !important"
                            >
                                전체 선택
                            </label>
                            <div class="row">
                                <div
                                    v-for="categoryItem in categoryList"
                                    :key="categoryItem.id"
                                    class="col-auto mt-2 mb-1"
                                >
                                    <input
                                        type="checkbox"
                                        class="btn-check"
                                        :id="'checkbox_' + categoryItem.id"
                                        @click="updateCategory(categoryItem)"
                                        :checked="category.some((cat) => cat.id === categoryItem.id)"
                                    />
                                    <label
                                        class="btn btn-outline-primary"
                                        :for="'checkbox_' + categoryItem.id"
                                        :class="{ active: category.some((cat) => cat.id === categoryItem.id) }"
                                        style="
                                            font-weight: 600;
                                            font-size: 16px;
                                            border: 1px solid;
                                            border-radius: 10px;
                                            border-color: #eeeeee;
                                            background-color: #ffffff;
                                            color: #666666;
                                        "
                                    >
                                        {{ categoryItem.name }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
            <div class="col-xl-3 col-lg-12 ms-3 pb-3 mt-3 search-item search-col search-atr">
                <label style="color: #999999; font-weight: 700; font-size: 15">관광지 검색</label>
                <CommonInput
                    class="border-0 ps-0"
                    style="font-size: 18px"
                    :height="40"
                    :placeholder="'키워드를 검색해보세요.'"
                    :icon="{ isStart: true, name: 'search' }"
                    v-model="keyword"
                />
            </div>
            <div class="col-xl-2 col-lg-12 d-flex justify-content-end">
                <CommonButton
                    class="search-button"
                    :height="50"
                    :value="'검색'"
                    :bgColors="['#1769FF', '#e1e1e1']"
                    :state="true"
                    :click="doSearch"
                />
            </div>
        </div>
        <ModalSearchResult
            :modalState="modalState"
            :isSucess="isSuccess"
            :result="result"
            @close="modalState = false"
        />
    </div>
</template>

<style scoped>
.dropdown-menu {
    transform: none !important;
}
.dropdown-item {
    background-color: #ffffff !important;
}
.input-group {
    margin-top: 30px;
    padding: 15px;
    width: 80%;
    background: #ffffff;
    border: 1.20907px solid #eeeeee;
    box-shadow: 0px 2.41814px 19.3451px rgba(0, 0, 0, 0.25);
    border-radius: 16.927px;
}

.search-button {
    margin: 0px !important;
    background: #1769ff;
    width: 100% !important;
    border-radius: 10px !important;
    color: #ffffff;
    font-weight: bold;
    font-size: 18.136px;
}
.active {
    background-color: #e9f0fe !important;
    color: #1769ff !important;
    border-color: #73afff !important;
}

@media (max-width: 1200px) {
    .search-style {
        border-right: 0px !important;
        padding: 10px !important;
    }

    .region-style {
        padding-left: 15px !important;
    }

    .search-item {
        padding-top: 10px;
    }

    .search-col {
        margin: 5px !important;
    }

    .input-border {
        border-bottom: 1px solid #cccccc !important;
        padding-bottom: 20px !important;
    }
    .search-atr {
        margin-left: 15px !important;
    }
}

@media (max-width: 2000px) {
    .search-style {
        border-right: 1px solid #cccccc;
    }

    .region-style {
        margin-left: 2px !important;
    }
}
</style>
