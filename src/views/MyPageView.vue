<script setup>
import NavComp from "@/components/Nav/NavComp.vue";
import MyPageSideMenu from "@/components/MyPage/MyPageSideMenu.vue";
import MyPageContents from "@/components/MyPage/MyPageContents.vue";
import MyPageSideMenuMobile from "@/components/MyPage/MyPageSideMenuMobile.vue";
import FooterComp from "@/components/Footer/FooterComp.vue";
import { ref } from "vue";

const menu = ref(0);
</script>

<template>
    <NavComp :withLower="false" />
    <div class="mobiles"><MyPageSideMenuMobile v-model="menu" /></div>
    <div class="row justify-content-between mx-auto px-1 contents desktops">
        <div class="col-3">
            <MyPageSideMenu v-model="menu" />
        </div>
        <div class="col-9 row">
            <MyPageContents :menu="menu" />
        </div>
    </div>
    <div class="mobiles">
        <MyPageContents :menu="menu" />
    </div>
    <FooterComp class="footer" />
</template>

<style scoped>
.contents {
    max-width: 1200px;
    margin-top: 60px;
}

.mobiles {
    display: none;
}

.footer {
    margin-top: 80px;
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
