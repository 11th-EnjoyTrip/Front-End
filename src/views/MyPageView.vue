<script setup>
import NavComp from "@/components/Nav/NavComp.vue";
import MyPageSideMenu from "@/components/MyPage/MyPageSideMenu.vue";
</script>

<template>
    <NavComp :withLower="false" />
    <div class="row mx-auto contents">
        <div class="col-3">
            <MyPageSideMenu />
        </div>
        <div class="col-9"></div>
    </div>
</template>

<style scoped>
.contents {
    max-width: 1200px;
    margin-top: 60px;
}
</style>
