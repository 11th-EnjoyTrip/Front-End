import { defineStore } from "pinia";
import { reviewLike, reviewLikeCancel, reviewAdd } from "@/apis/reviewApi";

export const useReviewStore = defineStore("review", () => {
    /* states */

    /* getters */

    /* actions */
    const doLikeReview = async (review_id) => {
        await reviewLike(review_id);
    };

    const doCancelReviewLike = async (review_id) => {
        await reviewLikeCancel(review_id);
    };

    const addReview = async (newReview) => {
        await reviewAdd(newReview);
    };

    return {
        doLikeReview,
        doCancelReviewLike,
        addReview,
    };
});
