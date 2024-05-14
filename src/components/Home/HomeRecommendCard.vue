<script setup>
import IconPhone from "@/components/icons/IconPhone.vue";
import IconHomepage from "@/components/icons/IconHomepage.vue";

defineProps({
    content: Object,
});
</script>

<template>
    <div class="w-100 h-100 card-tour">
        <div class="position-relative w-100 card-img">
            <img src="@/assets/noPicture2.png" class="w-100 h-100 object-fit-cover" />
            <div class="position-absolute start-0 px-2 py-1 ms-2 rounded-2 text-white card-sido">경상북도</div>
        </div>
        <div class="w-100 d-flex flex-column justify-content-center px-3 card-info">
            <div class="d-flex align-items-center">
                <span class="fw-bold info-title">라마다 호텔</span>
                <span class="fw-medium ms-2 info-address">경상북도 구미시 인동중앙로3길 41</span>
            </div>
            <div class="fw-medium text-start mt-2 info-description">
                <div>
                    <IconPhone :width="16" :height="16" :color="'#646f7c'" /><span class="fw-semibold ms-2 info-ment"
                        >054-000-0000</span
                    >
                </div>
                <div class="mt-1">
                    <IconHomepage :width="16" :height="16" :color="'#646f7c'" /><span class="fw-semibold ms-2 info-ment"
                        >https://www.ramada.com/...</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-tour {
    min-height: 300px;
    max-height: 300px;
}

.card-img {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    height: 65%;
}

.card-sido {
    bottom: calc(-5%);
    font-size: 12px;
    background-color: #1769ff;
}

.card-info {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    height: 35%;
}

.info-title {
    color: #1769ff;
}

.info-address {
    color: #374553;
    font-size: 12px;
}

.info-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    font-size: 12px;
    font-weight: 500;
    color: #646f7c;
}

.info-ment {
    font-size: 12px;
    color: #646f7c;
}
</style>
