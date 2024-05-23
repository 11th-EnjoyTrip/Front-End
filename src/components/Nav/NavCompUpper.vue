<script setup>
import UpperItems from "@/components/Nav/UpperItems.vue";
import UpperDropdown from "@/components/Nav/UpperDropdown.vue";
import TravelogLogoTitle from "@/components/icons/TravelogLogoTitle.vue";
</script>

<template>
    <div class="row mx-auto nav-upper">
        <div class="col my-auto">
            <div class="d-flex align-items-center" @click="$router.push('/')">
                <img src="@/assets/travelog_logo.gif" alt="로고" width="60" height="60" />
                <TravelogLogoTitle :width="120" :height="30" :color="'#374553'" />
            </div>
        </div>
        <div class="col my-auto d-flex justify-content-end">
            <UpperItems class="user-state" />
            <UpperDropdown />
        </div>
    </div>
</template>

<style scoped>
.nav-upper {
    max-width: 1200px;
    height: 64px;
}

@media (max-width: 575.98px) {
    .user-state {
        display: none !important;
    }
}
</style>
