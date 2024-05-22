import { defineStore } from "pinia";
import { reviewLike, reviewLikeCancel } from "@/apis/reviewApi";

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

    return {
        doLikeReview,
        doCancelReviewLike,
    };
});
