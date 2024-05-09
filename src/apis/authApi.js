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

export const userQuit = (id) => {
    return api({
        url: "",
        method: "patch",
        data: {
            id: id,
        },
    });
};

export const passwordFind = (id, name, email) => {
    return api({
        url: "",
        method: "post",
        data: {
            id: id,
            name: name,
            email: email,
        },
    });
};
