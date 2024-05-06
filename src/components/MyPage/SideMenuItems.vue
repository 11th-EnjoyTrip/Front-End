<script setup>
import IconPerson from "@/components/icons/IconPerson.vue";
import IconLock from "@/components/icons/IconLock.vue";
import IconDeparture from "@/components/icons/IconDeparture.vue";
import IconPlace from "@/components/icons/IconPlace.vue";
import IconQuit from "@/components/icons/IconQuit.vue";

defineProps({
    menu: Number,
    idx: Number,
    title: String,
});
</script>

<template>
    <div
        class="d-flex align-items-center justify-content-center column-gap-3 w-75 mt-4 border-bottom items"
        :style="{
            'border-color': menu == idx ? '#374553 !important' : '#999999 !important',
            'margin-bottom': idx == 4 ? '40px' : '',
        }"
    >
        <IconPerson v-if="idx == 0" :width="24" :height="24" :color="menu == idx ? '#1769ff' : '#999999'" />
        <IconLock v-if="idx == 1" :width="24" :height="24" :color="menu == idx ? '#1769ff' : '#999999'" />
        <IconDeparture v-if="idx == 2" :width="24" :height="24" :color="menu == idx ? '#1769ff' : '#999999'" />
        <IconPlace v-if="idx == 3" :width="24" :height="24" :color="menu == idx ? '#1769ff' : '#999999'" />
        <IconQuit v-if="idx == 4" :width="24" :height="24" :color="menu == idx ? '#1769ff' : '#999999'" />
        <div class="fw-medium" :style="{ color: menu == idx ? '#374553' : '#999999' }">
            {{ title }}
        </div>
    </div>
</template>

<style scoped>
.items {
    height: 40px;
}

.item-title {
    font-weight: 500;
    font-size: 18px;
}
</style>
