<script setup>
import IconLike from "@/components/icons/IconLike.vue";
import IconEye from "@/components/icons/IconEye.vue";

defineProps({
    day: Number,
    idx: Number,
});
</script>

<template>
    <div class="d-flex">
        <img src="@/assets/noPicture2.png" alt="이미지" width="100" height="100" class="object-fit-cover" />
        <div class="row-gap-2 d-flex flex-column justify-content-center ps-3 w-100">
            <div class="d-flex align-items-center justify-content-between column-gap-1 card-header-title">
                <div>금오산</div>
                <div class="d-flex column-gap-2">
                    <IconLike :width="16" :height="16" :color="'#ff2c51'" :isLike="true" />
                    <IconEye :width="16" :height="16" :color="['#374553', '#999999']" :day="day" :idx="idx" />
                </div>
            </div>
            <div class="card-header-address">경북 구미시 남통동 228-2</div>
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
