import { api } from "./interceptors";

export const qnaList = () => {
    return api({
        url: "/board/list",
        method: "get",
    });
};
