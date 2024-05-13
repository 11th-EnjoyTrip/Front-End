import { api } from "./interceptors";

export const nicknameChange = (id, nickname) => {
    return api({
        url: "",
        method: "post",
        data: {
            id: id,
            nickname: nickname,
        },
    });
};

export const preferChange = (newPrefers) => {
    return api({
        url: "",
        method: "put",
        data: {
            prefer: [...newPrefers],
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
