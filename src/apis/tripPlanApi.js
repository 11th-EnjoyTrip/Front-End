import { api } from "@/apis/interceptors.js";

export const tripPlanList = (keyword, page) => {
    return api({
        url: "/plan/shared",
        method: "get",
        params: {
            keyword: keyword,
            page: page,
        },
    });
};

export const tripPlanDetail = (id) => {
    return api({
        url: `/plan/${id}`,
        method: "get",
    });
};

export const tripPlanLike = (id) => {
    return api({
        url: "/plan/like",
        method: "post",
        data: {
            tripPlanId: id,
        },
    });
};

export const tripPlanLikeCancel = (id) => {
    return api({
        url: "/plan/like",
        method: "delete",
        data: {
            tripPlanId: id,
        },
    });
};

export const tripPlanShare = (id) => {
    return api({
        url: `/plan/shared/${id}`,
        method: "patch",
    });
};

export const tripPlanAdd = (newPlan) => {
    return api({
        url: "/plan",
        method: "post",
        data: newPlan,
    });
};

export const tripPlanDelete = (id) => {
    return api({
        url: `/plan/${id}`,
        method: "patch",
    });
};
