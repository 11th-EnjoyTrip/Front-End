<script setup>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { ref, onMounted } from "vue";
import HomeRankReviewCard from "@/components/Home/Review/HomeRankReviewCard.vue";
import { useHomeInfoStore } from "@/stores/homeMenu";
import { storeToRefs } from "pinia";

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
        itemsToShow: 2,
        snapAlign: "center",
    },
});

const store = useHomeInfoStore();
const { reviews } = storeToRefs(store);
const { queryReviews } = store;
onMounted(async () => {
    await queryReviews();
});
</script>

<template>
    <div class="w-100 mx-auto mt-4">
        <Carousel v-bind="settings" :breakpoints="breakpoints" :wrap-around="true" :autoplay="3000">
            <Slide v-for="review in reviews" :key="review.review_id">
                <HomeRankReviewCard :review="review" />
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
