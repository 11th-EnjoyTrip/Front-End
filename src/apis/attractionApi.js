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
    return api({
        url: `/review/read/${contentId}`,
        method: "get",
        params: {
            page: page,
        },
    });
};

export const attractionLike = (contentId) => {
    return api({
        url: "/attraction/like",
        method: "post",
        data: {
            contentId: contentId,
        },
    });
};

export const attractionLikeCancel = (contentId) => {
    return api({
        url: "/attraction/like",
        method: "delete",
        data: {
            contentId: contentId,
        },
    });
};
