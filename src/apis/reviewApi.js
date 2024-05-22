import { api } from "@/apis/interceptors";

export const reviewLike = (review_id) => {
    api.defaults.headers["Authorization"] = localStorage.getItem("accessToken");

    return api({
        url: "/review/addLike",
        method: "post",
        data: {
            review_id: review_id,
        },
    });
};

export const reviewLikeCancel = (review_id) => {
    api.defaults.headers["Authorization"] = localStorage.getItem("accessToken");

    return api({
        url: "/review/deleteLike",
        method: "delete",
        data: {
            review_id: review_id,
        },
    });
};

export const reviewAdd = (newReview) => {
    api.defaults.headers["Authorization"] = localStorage.getItem("accessToken");

    return api({
        url: "/review/write",
        method: "post",
        data: newReview,
    });
};
