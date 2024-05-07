import { api } from "./interceptors";

export const doTest = () => {
    return api({
        url: "/todos/1",
        method: "get",
    });
};
