<script setup>
import NavComp from "@/components/Nav/NavComp.vue";
import MyPageSideMenu from "@/components/MyPage/MyPageSideMenu.vue";
import MyPageContents from "@/components/MyPage/MyPageContents.vue";
import { ref } from "vue";

const menu = ref(0);
</script>

<template>
    <NavComp :withLower="false" />
    <div class="mobiles">이건 메뉴입니다</div>
    <div class="row mx-auto px-3 contents desktops">
        <div class="col-3">
            <MyPageSideMenu v-model="menu" />
        </div>
        <div class="col-9 row">
            <MyPageContents :menu="menu" />
        </div>
    </div>
    <div class="mobiles"><MyPageContents /></div>
</template>

<style scoped>
.contents {
    max-width: 1200px;
    margin-top: 60px;
}

.mobiles {
    display: none;
}

@media (max-width: 767.98px) {
    .mobiles {
        display: block;
    }

    .desktops {
        display: none;
    }
}
</style>
