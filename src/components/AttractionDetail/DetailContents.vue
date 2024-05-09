<template>
    <div class="mx-auto detail-content pt-4">
        <div style="color: #646F7C; font-weight: 700;font-size: 20px;line-height: 29px; ">
            {{content.contentTypeName}} • {{content.sidoName}}</div>
        <div style="font-weight: 700; font-size: 30px; color: #374553;">
            {{ content.title }}
        </div>
        <div class="content-box">
            <div>
                <h5 style="font-weight: 700;font-size: 22px;line-height: 32px; color: #14181B;">
                    상세 정보</h5>
                <div class="mt-3 mb-4">
                    <div class="detail-info ">
                        <div class="sub-title">주소</div>
                        <div class="sub-content">{{ content.addr1 + content.addr2 }}</div>
                    </div>
                    <div class="detail-info">
                        <div class="sub-title">우편번호</div>
                        <div class="sub-content">{{ content.zipcode }}</div>
                    </div>
                    <div class="detail-info">
                        <div class="sub-title">전화번호</div>
                        <div class="sub-content">{{ content.tel }}</div>
                    </div>
                </div>
            </div>
            <hr style="border: 2px solid rgba(238, 238, 238, 0.933333);"/>
            <div>
                <h5 style="font-weight: 700;font-size: 22px;line-height: 32px; color: #14181B;">
                    관광지 소개</h5>
                <div style="padding-top: 3px !important;">
                    <IconQuote width="20" height="20" color="#CCCCCC" degree="0" />
                    <p class="overview">
                        {{ content.overview }}
                    </p>
                    <div style="width: 100%; text-align: right !important;">
                        <IconQuote width="20" height="20" color="#CCCCCC" degree="180" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import IconQuote from '@/components/icons/IconQuote.vue'

const props = defineProps({
    itemContent: Object
})
const content = props.itemContent
</script>
<style scoped>
.content-box{
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15) !important;
    border-radius: 15px !important;
    padding: 5%;
    margin-top: 5%;
}
.detail-info{
    display: flex;
    justify-items: left;
    margin-bottom: 5px;
}
.sub-title{
    margin-right: 10px;
    color: #374553;
    font-weight: 700 !important;
    font-size: 15px;
    line-height: 22px;
}
.sub-content{
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    color: #646F7C;
}
.overview{
    padding: 10px !important;
    margin-left: 10px;
    margin-right: 10px;
    font-weight: 400;
    font-size: 15.1141px;
    line-height: 22px;
    display: flex;
    align-items: center;
    text-align: justify;
    color: #646F7C;
}

</style>

