import { api } from "./interceptors";

export const attractionList = (region,category,keyword) => {
    return api({
        url: "/attraction",
        method: "get",
        params: {
            region: region,
            category: category,
            keyword: keyword
        }
    });
};

export const attractionDetail = (id) => {
    return api({
        url: `/attraction/${id}`,
        method: "get",
    });
};
