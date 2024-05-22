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
            userid: id,
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
    api.defaults.headers["refreshToken"] = localStorage.getItem("refreshToken");

    return api({
        url: "/member/refresh",
        method: "post",
    });
};

export const logout = () => {
    api.defaults.headers["Authorization"] = localStorage.getItem("accessToken");

    return api({
        url: "/member/logout",
        method: "get",
    });
};

export const passwordFind = (id, email) => {
    return api({
        url: "/member/findPwd",
        method: "post",
        data: {
            userid: id,
            email: email,
        },
    });
};

export const passwordCheck = (password) => {
    api.defaults.headers["Authorization"] = localStorage.getItem("accessToken");

    return api({
        url: "/member/checkpassword",
        method: "post",
        data: {
            password: password,
        },
    });
};

export const nicknameChange = (newNickname) => {
    return api({
        url: "/member/updateNickname",
        method: "patch",
        data: {
            nickname: newNickname,
        },
    });
};

export const passwordChange = (newPassword) => {
    api.defaults.headers["Authorization"] = localStorage.getItem("accessToken");

    return api({
        url: `/member/updatePassword/${newPassword}`,
        method: "patch",
    });
};

export const userQuit = () => {
    api.defaults.headers["Authorization"] = localStorage.getItem("accessToken");

    return api({
        url: "/member/deleteMember",
        method: "delete",
    });
};

export const tripPlanMy = (page) => {
    return api({
        url: "/plan",
        method: "get",
        params: {
            page: page,
        },
    });
};

export const tripPlanLike = (page) => {
    return api({
        url: "/plan/like",
        method: "get",
        params: {
            page: page,
        },
    });
};

export const reviewMy = () => {
    api.defaults.headers["Authorization"] = localStorage.getItem("accessToken");

    return api({
        url: "/review/written",
        method: "get",
    });
};

export const reviewLike = () => {
    api.defaults.headers["Authorization"] = localStorage.getItem("accessToken");

    return api({
        url: "/review/liked",
        method: "get",
    });
};
