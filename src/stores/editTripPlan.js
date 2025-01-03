import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { attractionList } from "@/apis/attractionApi";

export const useEditTripPlanStore = defineStore("editTripPlan", () => {
    /* states */
    const type = ref("");
    const curSido = ref(0);
    const curType = ref(0);
    const curKeyword = ref("");
    const curPage = ref(0);

    const searchList = ref([]);
    const pinned = ref([37.514575, 127.0495556]);
    const selected = ref([]);
    const daysSelected = ref([[]]);
    const tripPlanInfo = ref({
        title: "",
        startDate: "",
        endDate: "",
        startTime: "",
        startPlace: "",
        intro: "",
    });
    const listItems = ref(["1"]);
    const markerLists = ref([[true]]);
    const attractionInfos = ref([
        [
            {
                arrivalTime: "",
                departureTime: "",
                transportation: "자동차",
                memo: "",
            },
        ],
    ]);
    const canEdit = ref(false);
    const quill = ref("<p></p>");

    /* getters */

    /* actions */
    const getSearchList = async ($state) => {
        try {
            const category = curType.value == 0 ? "12,14,32,15,28,38,39" : "" + curType.value;
            const response = await attractionList(curSido.value, category, curKeyword.value, curPage.value);
            const jsonData = response.data;

            if (curPage.value == 0) searchList.value = jsonData;
            else searchList.value = [...searchList.value, ...jsonData];

            if (jsonData.length < 20) $state.complete();
            else $state.loaded();

            curPage.value++;
        } catch (error) {
            console.log("Error fetching search list : ", error);
            $state.error();
        }
    };
    const editingTripPlan = async (originalPlan) => {
        tripPlanInfo.value.title = originalPlan.title;
        tripPlanInfo.value.startDate = "";
        tripPlanInfo.value.endDate = "";
        tripPlanInfo.value.intro = originalPlan.intro;
        tripPlanInfo.value.startPlace = originalPlan.dayPlanList[0].detailPlanList[0].title;

        attractionInfos.value = [];
        daysSelected.value = [];
        listItems.value = [];
        markerLists.value = [];
        originalPlan.dayPlanList.forEach((day) => {
            let newAI = [];
            let newDays = [];
            let newML = [];
            day.detailPlanList.forEach((detail) => {
                let obj = {
                    arrivalTime: detail.arrivalTime,
                    departureTime: detail.departureTime,
                    transportation: detail.transportation == "CAR" ? "자동차" : "도보",
                    memo: detail.memo,
                };
                newAI.push(obj);
                newDays.push(detail);
                newML.push(true);
            });
            listItems.value.push("1");
            markerLists.value.push(newML);
            daysSelected.value.push(newDays);
            attractionInfos.value.push(newAI);
        });
        canEdit.value = true;
    };
    watch(selected.value, () => (canEdit.value = false));
    watch(daysSelected.value, () => {
        listItems.value = new Array(daysSelected.value.length);
        listItems.value.fill("1");

        markerLists.value = [];
        daysSelected.value.forEach((day) => {
            let arr = new Array(day.length);
            arr.fill(true);
            markerLists.value.push(arr);
        });

        attractionInfos.value = [];
        daysSelected.value.forEach((day) => {
            let arr = [];
            day.forEach(() => {
                let obj = {
                    arrivalTime: "",
                    departureTime: "",
                    transportation: "자동차",
                    memo: "",
                };
                arr.push(obj);
            });
            attractionInfos.value.push(arr);
        });
    });

    return {
        type,
        curSido,
        curType,
        curKeyword,
        curPage,
        searchList,
        pinned,
        selected,
        daysSelected,
        tripPlanInfo,
        listItems,
        markerLists,
        canEdit,
        attractionInfos,
        quill,
        getSearchList,
        editingTripPlan,
    };
});
