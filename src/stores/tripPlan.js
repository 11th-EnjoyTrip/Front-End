import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { tripPlanDetail, tripPlanLike, tripPlanLikeCancel } from "@/apis/tripPlanApi.js";
import { useRouter } from "vue-router";

const router = useRouter();
export const useTripPlanStore = defineStore("tripPlan", () => {
    /* states */
    const planDetail = ref({});
    const listItem = ref(["1", "1", "1"]);
    const markerList = ref([[true], [true], [true]]);
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
    const getTripPlanDetail = async (id) => {
        await tripPlanDetail(id)
            .then((response) => {
                planDetail.value = response.data;
                planDetail.value.dayPlanList = JSON.parse(planDetail.value.dayPlanList);

                listItem.value = [];
                markerList.value = [];
                planDetail.value.dayPlanList.forEach((dayPlan) => {
                    listItem.value.push("1");

                    let lst = [];
                    dayPlan.detailPlanList.forEach(() => lst.push(true));
                    markerList.value.push(lst);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const likeTripPlanDetail = async (id) => {
        await tripPlanLike(id)
            .then(async () => {
                await getTripPlanDetail(id);
                router.go();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const cancelLikeTripPlanDetail = async (id) => {
        await tripPlanLikeCancel(id)
            .then(async () => {
                await getTripPlanDetail(id);
                router.go();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return {
        planDetail,
        listItem,
        markerList,
        pinLat,
        pinLng,
        getLat,
        getLng,
        getTripPlanDetail,
        likeTripPlanDetail,
        cancelLikeTripPlanDetail,
    };
});
