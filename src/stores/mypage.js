import { ref } from "vue";
import { defineStore } from "pinia";

export const useMyPageStore = defineStore("mypage", () => {
    /* states */
    const menu = ref("info");

    /* getters */

    /* actions */

    return {
        menu,
    };
});
