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
        url: `/member/regist`,
        method: "post",
        data: { ...signupInfo },
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

export const login = (loginInfo) => {
    return api({
        url: "",
        method: "post",
        data: { ...loginInfo },
    });
};
