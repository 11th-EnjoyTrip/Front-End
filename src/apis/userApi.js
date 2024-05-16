import { api } from "./interceptors";

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
        url: "/member/regist",
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

export const getUserInfo = () => {
    api.defaults.headers["Authorization"] = localStorage.getItem("accessToken");

    return api({
        url: `/member/info`,
        method: "get",
    });
};

export const regenerateAccess = () => {
    api.defaults.headers["Authorization"] = localStorage.getItem("accessToken");

    return api({
        url: "/member/refresh",
        method: "post",
    });
};

export const logout = () => {
    api.defaults.headers["Authorization"] = localStorage.getItem("accessToken");

    return api({
        url: `/member/logout`,
        method: "get",
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

export const nicknameChange = (newNickname) => {
    return api({
        url: `/member/updateNickname/${newNickname}`,
        method: "get",
    });
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
