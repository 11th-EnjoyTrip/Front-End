import { api } from "./interceptors";

export const attractionList = () => {
    return api({
        url: "",
        method: "get",
    });
};

export const contentsList = (contentTypeId) => {
    return api({
        url: "",
        method: "get",
        params: {
            contentTypeId: contentTypeId,
        },
    });
};
