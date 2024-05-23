import { ref } from "vue";
import { defineStore } from "pinia";
import { rankAttraction, rankPlan, rankReview } from "@/apis/homeApi";

export const useHomeInfoStore = defineStore("homeInfo", () => {
    /* states */
    const attractions = ref([{}]);
    const plans = ref([{}]);
    const reviews = ref([{}]);
    const contentType = ref("");

    /* getters */

    /* actions */
    const queryAttractions = async () => {
        await rankAttraction()
            .then((response) => {
                attractions.value = response.data.splice(0, 5);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const queryPlans = async () => {
        if (localStorage.getItem("accessToken")) {
            await rankPlan()
                .then((response) => {
                    plans.value = [];
                    for (let i = 0; i < 5; i++) {
                        let obj = response.data[i];
                        obj.contents = JSON.parse(response.data[i].contents);
                        plans.value.push(obj);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    const queryReviews = async () => {
        await rankReview()
            .then((response) => {
                reviews.value = response.data["best reviews"];
                console.log(reviews.value);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const changeContentType = (newContentType) => {
        contentType.value = newContentType;
    };

    return {
        attractions,
        plans,
        reviews,
        queryAttractions,
        queryPlans,
        queryReviews,
        changeContentType,
    };
});
