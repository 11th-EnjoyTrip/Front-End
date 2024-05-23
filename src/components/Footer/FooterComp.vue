<script setup>
import TravelogLogoTitle from "@/components/icons/TravelogLogoTitle.vue";
</script>
<template>
    <div style="background-color: #eeeeee">
        <footer
            style="max-width: 1200px"
            class="mx-auto d-flex flex-wrap justify-content-between py-3 my-4 border-top p-4 pb-4"
        >
            <div class="col-md-6 text-body-secondary align-items-center">
                <div class="d-flex align-items-center column-gap-2">
                    <img class="" src="@/assets/travelog_logo.png" width="60px" height="55px" />
                    <TravelogLogoTitle :width="140" :height="35" :color="'#374553'" />
                </div>
                <p class="footer-first">대표 : 구미 5반 김정인, 최요하, 남경민</p>
                <p class="footer-first">사업자번호 : 123-4567-987</p>
                <p class="footer-first">
                    주소: 302, 3 Industrial Complex 3, Gumi-si, Gyeongsangbuk-do, Republic of Korea
                </p>
                <p class="mb-0" style="font-size: 60%">&copy; SSAFY Gumi 5. Travelog</p>
            </div>

            <div class="col-md-5 d-flex pt-2" style="flex-direction: column; align-content: space-between">
                <ul class="nav d-flex footer-content data-style" style="flex-grow: 1">
                    <li class="nav-item">
                        <a href="#" class="nav-link px-2 text-body-secondary footer-second">이용약관</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link px-2 text-body-secondary footer-second">개인정보처리방침</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link px-2 text-body-secondary footer-second">공지사항</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link px-2 text-body-secondary pt-0 pb-0" style="font-size: 70%"
                            >문의하기</a
                        >
                    </li>
                </ul>
                <div class="d-flex footer-content">
                    <a href="https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp"
                        ><img src="@/assets/trip/ssafy.png" height="40" style="margin-top: 10px; margin-left: 0px"
                    /></a>
                    <a href="https://api.visitkorea.or.kr/#/"
                        ><img src="@/assets/trip/tourapi.png" height="25" style="margin-top: 20px"
                    /></a>
                    <a href="https://knto.or.kr/index"
                        ><img
                            src="@/assets/trip/korea_tourism_organization.png"
                            style="margin-top: 7px; margin-left: 5px"
                            height="45"
                    /></a>
                    <a href="https://www.mcst.go.kr/kor/main.jsp"
                        ><img src="@/assets/trip/sports_and_tourism.png" style="margin-left: 5px"
                    /></a>
                </div>
            </div>
        </footer>
    </div>
</template>
<style scoped>
.footer-first {
    margin-bottom: 0px;
    font-size: 70%;
}
.footer-second {
    font-size: 70%;
    border-right: 1px solid #666666 !important;
    padding-top: 0px;
    padding-bottom: 0px;
}

.footer-content {
    justify-content: end;
}

@media (max-width: 765px) {
    .footer-content {
        justify-content: start;
    }
    .data-style {
        margin-bottom: 10px;
        margin-top: 5px;
    }
}
</style>
