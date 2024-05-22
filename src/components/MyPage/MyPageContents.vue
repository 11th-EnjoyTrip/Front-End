<script setup>
import ContentsUser from "@/components/MyPage/ContentsUser.vue";
import ContentsPassword from "@/components/MyPage/ContentsPassword.vue";
import ContentsPlan from "@/components/MyPage/ContentsPlan.vue";
import ContentsReview from "@/components/MyPage/ContentsReview.vue";
import ContentsQuit from "@/components/MyPage/ContentsQuit.vue";

defineProps({
    menu: Number,
});
</script>

<template>
    <div class="col-10 mx-auto scrolls">
        <div class="position-relative w-100">
            <Transition name="come">
                <ContentsUser v-if="menu == 0" />
            </Transition>
            <Transition name="come">
                <ContentsPassword v-if="menu == 1" />
            </Transition>
            <Transition name="come">
                <ContentsPlan v-if="menu == 2" />
            </Transition>
            <Transition name="come">
                <ContentsReview v-if="menu == 3" />
            </Transition>
            <Transition name="come">
                <ContentsQuit v-if="menu == 4" />
            </Transition>
        </div>
    </div>
</template>

<style scoped>
.come-enter-active {
    animation: come-in 0.3s ease-in-out forwards;
}

.come-leave-active {
    animation: come-out 0.3s ease-in-out forwards;
}

@keyframes come-in {
    0% {
        transform: translateX(5%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}
@keyframes come-out {
    0% {
        transform: translateX(0);
        opacity: 1;
    }
    100% {
        transform: translateX(5%);
        opacity: 0;
    }
}
</style>
