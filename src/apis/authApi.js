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

export const duplicateNickname = (nickname) => {
    return api({
        url: "",
        method: "get",
        params: {
            nickname: nickname,
        },
    });
};

export const passwordCheck = (id, password) => {
    return api({
        url: "",
        method: "post",
        data: {
            id: id,
            password: password,
        },
    });
};

export const passwordChange = (id, newPassword) => {
    return api({
        url: "",
        method: "post",
        data: {
            id: id,
            password: newPassword,
        },
    });
};
