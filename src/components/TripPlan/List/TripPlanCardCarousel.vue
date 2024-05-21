<script setup>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { ref } from "vue";

defineProps({
    titles: Array,
    images: Array,
});

const settings = ref({
    itemsToShow: 1,
    snapAlign: "center",
});
const breakpoints = ref({
    0: {
        itemsToShow: 1,
        snapAlign: "center",
    },
});
</script>

<template>
    <div class="h-auto">
        <Carousel :settings="settings" :breakpoints="breakpoints" :wrap-around="true">
            <Slide v-for="(title, idx) in titles" :key="idx">
                <div class="position-relative rounded-top-3 carousel__item">
                    <img
                        class="position-absolute w-100 h-100 object-fit-cover top-0 end-0 rounded-top-3"
                        :src="images[idx]"
                        :alt="'관광지 이미지'"
                    />
                    <div class="position-absolute bg-black bg-opacity-25 text-white fw-bold px-2 py-1 rounded-2 title">
                        {{ title }}
                    </div>
                </div>
            </Slide>

            <template #addons>
                <Navigation />
            </template>
        </Carousel>
    </div>
</template>

<style scoped>
.carousel__item {
    width: 100%;
    min-height: 200px;
}

.title {
    font-size: 14px;
    top: 5px;
    right: 5px;
}
</style>
