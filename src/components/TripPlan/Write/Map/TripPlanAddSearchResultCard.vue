<script setup>
import IconLike from "@/components/icons/IconLike.vue";
import IconPin from "@/components/icons/IconPin.vue";
import IconTrash from "@/components/icons/IconTrash.vue";

defineProps({
    type: String,
});
</script>

<template>
    <div class="add-search-result-card" @click="changeLatLng">
        <img src="@/assets/noPicture2.png" alt="이미지" class="add-search-result-card-img" />
        <div class="d-flex justify-content-between align-items-center w-100 px-2">
            <div>
                <div class="d-flex align-items-center column-gap-2 fw-bold">
                    <div class="mb-1">금오산</div>
                    <IconLike :width="14" :height="14" :color="'#ff2c51'" :isLike="true" />
                </div>
                <div class="add-search-result-card-address">경북 구미시 남통동 288-2</div>
            </div>
            <IconPin v-if="type == 'add'" :width="20" :height="20" :color="'#1769ff'" />
            <IconTrash v-else :width="20" :height="20" :color="'#1769ff'" />
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
