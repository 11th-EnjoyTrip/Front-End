<script setup>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { ref } from "vue";
import HomeRecommendCard from "@/components/Home/HomeRecommendCard.vue";
import { useHomeInfoStore } from "@/stores/homeMenu";

const settings = ref({
    itemsToShow: 1,
    snapAlign: "center",
});

const breakpoints = ref({
    576: {
        itemsToShow: 1.5,
        snapAlign: "center",
    },

    768: {
        itemsToShow: 2,
        snapAlign: "center",
    },

    1200: {
        itemsToShow: 3,
        snapAlign: "center",
    },
});

const store = useHomeInfoStore();
</script>

<template>
    <div class="w-100 mx-auto mt-3">
        <Carousel v-bind="settings" :breakpoints="breakpoints" :wrap-around="true" :autoplay="3000">
            <Slide v-for="content in store.getContents" :key="content.contentId">
                <HomeRecommendCard :content="content" />
            </Slide>

            <template #addons>
                <Navigation />
            </template>
        </Carousel>
    </div>
</template>

<style scoped>
.carousel__slide {
    border-radius: 15px;
    margin: 5px 0px;
}

.carousel__viewport {
    perspective: 1000px;
}

.carousel__track {
    transform-style: preserve-3d;
}

.carousel__slide--sliding {
    transition: 0.3s;
}

.carousel__slide--prev {
    opacity: 0.75;
    transform: scale(0.9);
}

.carousel__slide--next {
    opacity: 0.75;
    transform: scale(0.9);
}

.carousel__slide--active {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
}
</style>
