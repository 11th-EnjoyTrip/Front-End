<script setup>
defineProps({
    width: Number,
    height: Number,
    color: String,
});
</script>

<template>
    <svg :width="width" :height="height" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_226_17)">
        <path d="M27.7817 13.6212L17.0298 24.373M17.0298 13.6212L27.7817 24.373" :stroke="color" stroke-width="3.09654" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M22.4053 36.2002C31.9063 36.2002 39.6084 28.4981 39.6084 18.9972C39.6084 9.49623 31.9063 1.79419 22.4053 1.79419C12.9042 1.79419 5.20215 9.49623 5.20215 18.9972C5.20215 28.4981 12.9042 36.2002 22.4053 36.2002Z" :stroke="color" stroke-width="3.09654" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M43.9093 40.5009L34.6626 31.2543" :stroke="color" stroke-width="3.09654" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
        <filter id="filter0_d_226_17" x="0.55727" y="0.245911" width="47.9968" height="47.9963" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="3.09654"/>
        <feGaussianBlur stdDeviation="1.54827"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_226_17"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_226_17" result="shape"/>
        </filter>
        </defs>
    </svg>

</template>

<style scoped></style>
