import { api } from "./interceptors";

export const attractionList = (region, category, keyword, page) => {
    return api({
        url: "/attraction",
        method: "get",
        params: {
            region: region,
            category: category,
            keyword: keyword,
            page: page,
        },
    });
};

export const attractionDetail = (id) => {
    return api({
        url: `/attraction/${id}`,
        method: "get",
    });
};

export const attractionReview = (contentId, page) => {
    api.defaults.headers["Authorization"] = localStorage.getItem("accessToken");

    return api({
        url: `/review/read/${contentId}`,
        method: "get",
        params: {
            page: page,
        },
    });
};
