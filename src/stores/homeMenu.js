import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { attractionList, contentsList } from "@/apis/homeApi";

const categoryList = [
    { name: "관광지", id: 0 },
    { name: "문화시설", id: 1 },
    { name: "숙박", id: 2 },
    { name: "행사 / 공연 / 축제", id: 3 },
    { name: "레포츠", id: 4 },
    { name: "쇼핑", id: 5 },
    { name: "음식점", id: 6 },
];

export const useHomeInfoStore = defineStore("homeInfo", () => {
    /* states */
    const attractions = ref([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    const contents = ref([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    const contentType = ref("");

    /* getters */
    const getAttractions = computed(() => {
        return attractions.value;
    });
    const getContents = computed(() => {
        return contents.value;
    });
    const getContentType = computed(() => {
        return contentType.value;
    });
    const getContentTypeId = computed(() => {
        return categoryList.filter((category) => category.name == contentType.value)[0].id;
    });

    /* actions */
    const queryAttractions = async () => {
        await attractionList()
            .then((response) => {
                attractions.value = [...response.data];
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const queryContents = async (contentTypeId) => {
        await contentsList(contentTypeId)
            .then((response) => {
                contents.value = [...response.data];
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const changeContentType = (newContentType) => {
        contentType.value = newContentType;
    };

    return {
        attractions,
        contents,
        getAttractions,
        getContents,
        getContentType,
        getContentTypeId,
        queryAttractions,
        queryContents,
        changeContentType,
    };
});
