import { api } from "./interceptors";

export const getUserInfo = (id) => {
    return api({
        url: `/member/info/${id}`,
        method: "get",
    });
};

export const regenerateAccess = (id) => {
    return api({
        url: "/member/refresh",
        method: "post",
        data: {
            id: id,
        },
    });
};

export const logout = (id) => {
    return api({
        url: `/member/logout/${id}`,
        method: "get",
    });
};

export const idCheck = (id) => {
    return api({
        url: `/member/checkId/${id}`,
        method: "get",
    });
};

export const nicknameCheck = (nickname) => {
    return api({
        url: `/member/checkNickname/${nickname}`,
        method: "get",
    });
};

export const emailCheck = (email) => {
    return api({
        url: `/member/checkEmail/${email}`,
        method: "get",
    });
};

export const signup = (signupInfo) => {
    return api({
        url: `/member/regist`,
        method: "post",
        data: { ...signupInfo },
    });
};

export const login = (id, password) => {
    return api({
        url: "/member/login",
        method: "post",
        data: {
            id: id,
            password: password,
        },
    });
};

export const passwordFind = (id, email) => {
    return api({
        url: "/member/findPwd",
        method: "post",
        data: {
            id: id,
            email: email,
        },
    });
};

export const nicknameChange = () => {
    return api({});
};
export const passwordChange = () => {
    return api({});
};
export const passwordCheck = () => {
    return api({});
};
export const userQuit = () => {
    return api({});
};
