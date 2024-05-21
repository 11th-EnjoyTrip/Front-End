<script setup>
import IconLike from "@/components/icons/IconLike.vue";
import IconEye from "@/components/icons/IconEye.vue";
import { useTripPlanStore } from "@/stores/tripPlan.js";
import { useEditTripPlanStore } from "@/stores/editTripPlan";
import { storeToRefs } from "pinia";
import { attractionDetail } from "@/apis/attractionApi";
import { ref, onMounted } from "vue";

const props = defineProps({
    day: Number,
    idx: Number,
    type: String,
});

const store = useTripPlanStore();
const stores = useEditTripPlanStore();
const { planDetail } = storeToRefs(store);
const { daysSelected } = storeToRefs(stores);
const address = ref("");
onMounted(async () => {
    await attractionDetail(
        props.type == "read"
            ? planDetail.value.dayPlanList[props.day].detailPlanList[props.idx].contentId
            : daysSelected.value[props.day][props.idx].contentId
    )
        .then((response) => {
            address.value = response.data.addr1;
        })
        .catch((error) => {
            console.log(error);
        });
});
</script>

<template>
    <div class="d-flex">
        <img src="@/assets/noPicture2.png" alt="이미지" width="100" height="100" class="object-fit-cover" />
        <div class="row-gap-2 d-flex flex-column justify-content-center ps-3 w-100">
            <div class="d-flex align-items-center justify-content-between column-gap-1 card-header-title">
                <div>
                    {{
                        type == "read"
                            ? planDetail.dayPlanList[day].detailPlanList[idx].title
                            : daysSelected[day][idx].title
                    }}
                </div>
                <div class="d-flex column-gap-2">
                    <IconLike
                        :width="16"
                        :height="16"
                        :color="'#ff2c51'"
                        :isLike="
                            type == 'read'
                                ? planDetail.dayPlanList[day].detailPlanList[idx].isLikedAttraction
                                : daysSelected[day][idx].isLikedAttraction
                        "
                    />
                    <IconEye
                        :width="16"
                        :height="16"
                        :color="['#374553', '#999999']"
                        :day="day"
                        :idx="idx"
                        :type="type"
                    />
                </div>
            </div>
            <div class="card-header-address">{{ address }}</div>
        </div>
    </div>
</template>

<style scoped>
.card-header-title {
    font-weight: 600;
    color: #374553;
    font-size: 16px;
}

.card-header-address {
    font-size: 14px;
    color: #646f7c;
}
</style>
