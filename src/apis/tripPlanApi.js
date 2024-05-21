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
        url: "",
        method: "get",
    });
};
