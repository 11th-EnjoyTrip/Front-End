import { api } from "./interceptors";

export const qnaList = () => {
    return api({
        url: "/board/list",
        method: "get",
    });
};

export const qnaDetail = (id) => {
    return api({
        url: `/board/view/${id}`,
        method: "get",
    });
};

export const qnaEdit = (newQnA) => {
    return api({
        url: `/board/${newQnA.id}`,
        method: "put",
        data: { ...newQnA },
    });
};

export const qnaDelete = (id) => {
    return api({
        url: `/board/${id}`,
        method: "delete",
    });
};

export const qnaSearch = (keyword) => {
    return api({
        url: `/board/search/${keyword}`,
        method: "get",
    });
};
