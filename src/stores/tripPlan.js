import { ref } from "vue";
import { defineStore } from "pinia";
import { tripPlanDetail, tripPlanList, tripPlanSearch } from "@/apis/tripPlanApi.js";

export const useTripPlanStore = defineStore("tripPlan", () => {
    /* states */
    const plans = ref([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    const planDetail = ref(null);

    /* getters */

    /* actions */
    const getTripPlanList = async () => {
        await tripPlanList()
            .then((response) => {
                plans.value = [...response.data];
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getTripPlan = async (keyword) => {
        await tripPlanSearch(keyword)
            .then((response) => {
                plans.value = [...response.data];
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getTripPlanDetail = async (id) => {
        await tripPlanDetail(id)
            .then((response) => {
                planDetail.value = { ...response.data };
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return {
        plans,
        planDetail,
        getTripPlanList,
        getTripPlan,
        getTripPlanDetail,
    };
});
