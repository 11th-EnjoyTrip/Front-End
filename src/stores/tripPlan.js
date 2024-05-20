import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { tripPlanDetail, tripPlanList, tripPlanSearch } from "@/apis/tripPlanApi.js";

export const useTripPlanStore = defineStore("tripPlan", () => {
    /* states */
    const plans = ref([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    const planDetail = ref(null);
    const days = ref([3, 5, 4]);
    const listItem = ref(["1", "1", "1"]);
    const markerList = ref([
        [true, true, true],
        [true, true, true, true, true],
        [true, true, true, true],
    ]);
    const latis = ref([
        [37.514575, 36.35218384, 35.13995836],
        [37.514575, 36.35218384, 35.13995836, 35.20916389, 35.8715],
        [37.514575, 36.35218384, 35.13995836, 35.20916389],
    ]);
    const longs = ref([
        [127.0495556, 127.4170933, 126.793668],
        [127.0495556, 127.4170933, 126.793668, 128.9829083, 128.6017],
        [127.0495556, 127.4170933, 126.793668, 128.9829083],
    ]);
    const pinLat = ref(0);
    const pinLng = ref(0);

    /* getters */
    const getLat = computed(() => {
        return pinLat.value;
    });
    const getLng = computed(() => {
        return pinLng.value;
    });

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
        days,
        listItem,
        markerList,
        latis,
        longs,
        pinLat,
        pinLng,
        getLat,
        getLng,
        getTripPlanList,
        getTripPlan,
        getTripPlanDetail,
    };
});
