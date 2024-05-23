import { api } from "./interceptors";

export const rankAttraction = () => {
    return api({
        url: "/attraction",
        method: "get",
        params: {
            region: 0,
            category: "12,14,15,28,32,38,39",
            keyword: "",
            page: 0,
            sort: "likes",
        },
    });
};

export const rankPlan = () => {
    api.defaults.headers["Authorization"] = localStorage.getItem("accessToken");

    return api({
        url: "/plan/shared",
        method: "get",
        params: {
            keyword: "",
            sort: "likes",
        },
    });
};

export const rankReview = () => {
    return api({
        url: "/review/best",
        method: "get",
    });
};
