<script setup>
import IconPerson from "@/components/icons/IconPerson.vue";
import IconLock from "@/components/icons/IconLock.vue";
import IconDeparture from "@/components/icons/IconDeparture.vue";
import IconPlace from "@/components/icons/IconPlace.vue";
import IconStar from "@/components/icons/IconStar.vue";
import IconQuit from "@/components/icons/IconQuit.vue";

defineProps({
    type: String,
    menu: Number,
    idx: Number,
    title: String,
});
</script>

<template>
    <div
        v-if="type == 'desktop'"
        class="d-flex align-items-center justify-content-center column-gap-3 w-75 mt-4 border-bottom items"
        :style="{
            'border-color': menu == idx ? '#374553 !important' : '#999999 !important',
            'margin-bottom': idx == 4 ? '40px' : '',
        }"
    >
        <IconPerson v-if="idx == 0" :width="24" :height="24" :color="menu == idx ? '#1769ff' : '#999999'" />
        <IconLock v-if="idx == 1" :width="24" :height="24" :color="menu == idx ? '#1769ff' : '#999999'" />
        <IconDeparture v-if="idx == 2" :width="24" :height="24" :color="menu == idx ? '#1769ff' : '#999999'" />
        <IconStar v-if="idx == 3" :width="24" :height="24" :color="menu == idx ? '#1769ff' : '#999999'" />
        <IconQuit v-if="idx == 4" :width="24" :height="24" :color="menu == idx ? '#1769ff' : '#999999'" />
        <div class="fw-medium item-title" :style="{ color: menu == idx ? '#374553' : '#999999' }">
            {{ title }}
        </div>
    </div>
    <div v-else>
        <div class="d-flex flex-column align-items-center row-gap-2 menu-items">
            <div class="d-flex align-items-center justify-content-center rounded-5 icons">
                <IconPerson v-if="idx == 0" :width="24" :height="24" :color="menu == idx ? '#1769ff' : '#999999'" />
                <IconLock v-if="idx == 1" :width="24" :height="24" :color="menu == idx ? '#1769ff' : '#999999'" />
                <IconDeparture v-if="idx == 2" :width="24" :height="24" :color="menu == idx ? '#1769ff' : '#999999'" />
                <IconStar v-if="idx == 3" :width="24" :height="24" :color="menu == idx ? '#1769ff' : '#999999'" />
                <IconQuit v-if="idx == 4" :width="24" :height="24" :color="menu == idx ? '#1769ff' : '#999999'" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.items {
    height: 40px;
}

.icons {
    width: 50px;
    height: 50px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

@media (max-width: 991.98px) {
    .item-title {
        font-weight: 400;
        font-size: 14px;
    }
}

@media (max-width: 767.98px) {
    .item-title {
        font-weight: 400;
        font-size: 12px;
    }
}
</style>
