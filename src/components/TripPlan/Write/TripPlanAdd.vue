<script setup>
import TripPlanAddMap from "@/components/TripPlan/Write/Map/TripPlanAddMap.vue";
import TripPlanAddInfo from "@/components/TripPlan/Write/Info/TripPlanAddInfo.vue";
import TripPlanAddDays from "@/components/TripPlan/Write/Days/TripPlanAddDays.vue";
import { useEditTripPlanStore } from "@/stores/editTripPlan";
import { storeToRefs } from "pinia";
import { tripPlanAdd } from "@/apis/tripPlanApi";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useEditTripPlanStore();
const { canEdit, quill, daysSelected, tripPlanInfo, attractionInfos } = storeToRefs(store);
const addPlan = async () => {
    if (tripPlanInfo.value.title.trim() == "") message.warn("계획 제목을 입력해주세요!!!", 3);
    else if (tripPlanInfo.value.startDate == "" || tripPlanInfo.value.endDate == "")
        message.warn("출발 / 복귀일을 모두 입력해주세요!!!", 3);
    else if (quill.value.root.innerHTML == "<p></p>") message.warn("계획 설명을 입력해주세요!!!", 3);
    else {
        let res = true;
        daysSelected.value.forEach((day) => {
            if (day.length == 0) {
                message.warn("계획이 없는 일정은 추가할 수 없습니다!!!", 3);
                res = false;
            }
        });
        attractionInfos.value.forEach((attractions) => {
            attractions.forEach((val) => {
                if (val.arrivalTime == "" || val.departureTime == "") {
                    message.warn("도착 / 출발 시간을 모두 입력해주세요!!!", 3);
                    res = false;
                } else if (val.memo.trim() == "") {
                    message.warn("메모를 모두 입력해주세요!!!", 3);
                    res = false;
                }
            });
        });

        if (res) {
            const start = new Date(tripPlanInfo.value.startDate);
            const end = new Date(tripPlanInfo.value.endDate);
            let dayPlanList = [];
            attractionInfos.value.forEach((attr, idx) => {
                let detailPlanList = [];
                attr.forEach((v, i) => {
                    detailPlanList.push({
                        sequence: i + 1,
                        memo: v.memo.trim(),
                        departureTime: v.departureTime,
                        arrivalTime: v.arrivalTime,
                        distance: 1000,
                        transportation: v.transportation == "자동차" ? "CAR" : "WALK",
                        contentId: daysSelected.value[idx][i].contentId,
                    });
                });
                dayPlanList.push({
                    day: idx + 1,
                    detailPlanList: detailPlanList,
                });
            });

            let newPlan = {
                startDate: `${start.getFullYear()}-${
                    start.getMonth() + 1 < 10 ? "0" + (start.getMonth() + 1) : start.getMonth() + 1
                }-${start.getDate() < 10 ? "0" + start.getDate() : start.getDate()}`,
                endDate: `${end.getFullYear()}-${
                    end.getMonth() + 1 < 10 ? "0" + (end.getMonth() + 1) : end.getMonth() + 1
                }-${end.getDate() < 10 ? "0" + end.getDate() : end.getDate()}`,
                title: tripPlanInfo.value.title.trim(),
                intro: quill.value.root.innerHTML,
                isShared: false,
                dayPlanList: dayPlanList,
            };

            await tripPlanAdd(newPlan)
                .then(() => {
                    router.replace("/plan/list");
                })
                .catch((error) => console.log(error));
        }
    }
};
</script>

<template>
    <TripPlanAddMap />
    <div class="row">
        <div class="col-9 add-info">
            <TripPlanAddInfo />
        </div>
    </div>
    <div class="row">
        <div class="col-9 add-info">
            <TripPlanAddDays v-if="canEdit" />
        </div>
    </div>
    <div class="d-flex justify-content-center add-info" v-if="canEdit">
        <button class="add-btn" @click="addPlan">여행 계획 추가</button>
    </div>
</template>

<style scoped>
.add-info {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
}

.add-btn {
    width: 50%;
    height: 60px;
    border: 0;
    border-radius: 30px;
    font-weight: 600;
}

.add-btn:hover {
    background-color: #1769ff;
    color: white;
}
</style>
