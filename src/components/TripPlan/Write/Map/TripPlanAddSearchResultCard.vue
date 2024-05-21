<script setup>
import IconLike from "@/components/icons/IconLike.vue";
import IconPin from "@/components/icons/IconPin.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import { useEditTripPlanStore } from "@/stores/editTripPlan";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { attractionDetail } from "@/apis/attractionApi";
import { message } from "ant-design-vue";

const props = defineProps({
    item: Object,
    type: String,
    idx: Number,
});

const store = useEditTripPlanStore();
const { selected, daysSelected } = storeToRefs(store);
const address = ref("");
const isLike = ref(false);

onMounted(async () => {
    await attractionDetail(props.item.contentId)
        .then((response) => {
            address.value = response.data.addr1;
            isLike.value = response.data.isLikedAttraction;
        })
        .catch((error) => {
            console.log(error);
        });
});
const selecting = () => {
    let res = true;
    selected.value.forEach((v) => {
        if (v.contentId == props.item.contentId) {
            message.warn("이미 등록된 관광지 입니다", 2);
            res = false;
        }
    });

    daysSelected.value.forEach((day, idx) => {
        day.forEach((v, i) => {
            if (v.contentId == props.item.contentId) {
                message.warn("이미 등록된 관광지 입니다", 2);
                res = false;
            }
        });
    });

    if (res) selected.value.push(props.item);
};
const deleting = () => {
    selected.value.forEach((v, i) => {
        if (v.contentId == props.item.contentId) {
            selected.value.splice(i, 1);
        }
    });

    daysSelected.value.forEach((day, idx) => {
        day.forEach((v, i) => {
            if (v.contentId == props.item.contentId) {
                daysSelected.value[idx].splice(i, 1);
            }
        });
    });
};
</script>

<template>
    <div class="add-search-result-card" @click="changeLatLng">
        <img :src="item.firstImage2" alt="이미지" class="add-search-result-card-img" />
        <div class="d-flex justify-content-between align-items-center w-100 px-2">
            <div>
                <div class="d-flex align-items-center column-gap-2 fw-bold">
                    <div class="mb-1">{{ item.title }}</div>
                    <IconLike :width="14" :height="14" :color="'#ff2c51'" :isLike="isLike" />
                </div>
                <div class="add-search-result-card-address">{{ address }}</div>
            </div>
            <IconPin v-if="type == 'add'" :width="20" :height="20" :color="'#1769ff'" @click="selecting" />
            <IconTrash v-else :width="20" :height="20" :color="'#1769ff'" @click="deleting" />
        </div>
    </div>
</template>

<style scoped>
.add-search-result-card {
    display: flex;
    width: 100%;
    height: 100px;
    margin-top: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
}

.add-search-result-card:hover {
    transform: scale(1.05);
}

.add-search-result-card-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
}

.add-search-result-card-address {
    font-weight: 600;
    font-size: 12px;
}
</style>
