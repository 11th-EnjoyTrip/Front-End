import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";
import { attractionDetail } from "@/apis/attractionApi";

export const useAttractionStore = defineStore("attraction", () => {
    /* states */
    const attractionId = ref(0);
    const content = ref({});
    const curLatLng = ref({
        lat: 0,
        lng: 0,
    });

    /*getters */
    const getAttractionId = computed(() => {
        return attractionId.value;
    });

    const getContent = computed(() => {
        return content.value;
    });

    /*actions*/
    const changeAttrId = (newId) => (attractionId.value = newId);
    watch(attractionId, async () => {
        console.log(111);
        await attractionDetail(attractionId.value)
            .then((response) => {
                console.log(response.data);
                content.value = { ...response.data };
            })
            .catch((error) => {
                console.log(error);
            });
    });

    const changeAttraction = async (id) => {
        if (id.value) {
            await attractionDetail(id.value)
                .then((response) => {
                    console.log(response.data);
                    content.value = { ...response.data };
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log("this is what?");
        }
    };
    return {
        attractionId,
        content,
        curLatLng,
        getAttractionId,
        getContent,
        changeAttraction,
        changeAttrId,
    };
});
