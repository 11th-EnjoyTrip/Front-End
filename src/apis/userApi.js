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
