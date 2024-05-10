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

export const idCheck = (id) => {
    return api({
        url: "",
        method: "get",
        params: {
            id: id,
        },
    });
};

export const nicknameCheck = (nickname) => {
    return api({
        url: "",
        method: "get",
        params: {
            nickname: nickname,
        },
    });
};

export const emailCheck = (email) => {
    return api({
        url: "",
        method: "get",
        params: {
            email: email,
        },
    });
};

export const passwordFind = (id, email) => {
    return api({
        url: "",
        method: "post",
        data: {
            id: id,
            email: email,
        },
    });
};
