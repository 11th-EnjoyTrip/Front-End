<script setup>
defineProps({
    title: String,
    contentTypeName: String,
    firstImage: String,
});
</script>

<template>
    <div
        class="card"
        style="
            padding: 1px;
            background-color: white;
            border: 0.64785px solid #eeeeee;
            box-shadow: 0px 2.5914px 2.5914px rgba(0, 0, 0, 0.25);
            border-radius: 9.71774px;
            display: flex;
            max-height: 400px;
            max-width: 210px;
        "
    >
        <div class="img-card">
            <img v-if="firstImage" :src="firstImage" style="border-radius: 8px 8px 0px 0px" />
            <img v-else src="@/assets/noPicture2.png" style="border-radius: 9px 9px 0px 0px" />
        </div>
        <div style="margin: 8px">
            <div class="">
                <div class="card-title">{{ title }}</div>
                <div class="content-type" style="">{{ contentTypeName }}</div>
            </div>
            <div class="d-flex align-items-center justify-content-center mt-2 info-text">
                <div style="margin-top: 2px">클릭시 상세보기</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-title {
    width: 100%;
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 0 !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

img {
    max-width: 200px;
    max-height: 200px;
    object-fit: fill;
}
.img-card {
    align-items: center;
    margin: auto;
}

.info-text {
    padding: 4px 6px;
    font-size: 12px;
    background: #eeeeee;
    border-radius: 5px;
}

.info-text:hover {
    background-color: #1769ff;
    color: white;
}

.info-icon:hover {
    background-color: #1769ff;
}

a {
    text-decoration: none;
}

.content-type {
    font-weight: 500;
    font-size: 12px;
    color: #666666;
}
</style>
