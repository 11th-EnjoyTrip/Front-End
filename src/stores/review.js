import { defineStore } from "pinia";
import { reviewLike, reviewLikeCancel, reviewAdd, reviewEdit, reviewDelete } from "@/apis/reviewApi";

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

    const editReview = async (review_id, newText) => {
        await reviewEdit(review_id, newText);
    };

    const deleteReview = async (review_id) => {
        await reviewDelete(review_id);
    };

    return {
        doLikeReview,
        doCancelReviewLike,
        addReview,
        editReview,
        deleteReview,
    };
});
