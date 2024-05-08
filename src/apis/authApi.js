import { api } from "./interceptors";

export const login = (loginInfo) => {
    return api({
        url: "",
        method: "post",
        data: { ...loginInfo },
    });
};
