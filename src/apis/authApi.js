import { api } from "./interceptors";

export const login = (loginInfo) => {
    return api({
        url: "",
        method: "post",
        data: { ...loginInfo },
    });
};

export const signup = (signupInfo) => {
    return api({
        url: "",
        method: "post",
        data: { ...signupInfo },
    });
};
