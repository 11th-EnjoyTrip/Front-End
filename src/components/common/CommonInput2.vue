<script setup>
import IconPerson from "@/components/icons/IconPerson.vue";
import IconLock from "@/components/icons/IconLock.vue";
import IconTag from "@/components/icons/IconTag.vue";
import IconMail from "@/components/icons/IconMail.vue";

defineProps({
    height: Number,
    placeholder: String,
    title: String,
    type: String,
});
</script>

<template>
    <div class="row border-bottom input-border" :style="{ height: height + 'px' }">
        <div class="col-3 d-flex align-items-center fw-bold title">{{ title }}</div>
        <div class="col-3 title-icon">
            <IconPerson v-if="title == '아이디'" :width="32" :height="32" :color="'#374559'" />
            <IconLock
                v-if="title == '비밀번호' || title == '비밀번호 확인'"
                :width="32"
                :height="32"
                :color="'#374559'"
            />
            <IconTag v-if="title == '이름'" :width="32" :height="32" :color="'#374559'" />
            <IconMail v-if="title == '이메일'" :width="32" :height="32" :color="'#374559'" />
        </div>
        <div class="col-9">
            <input :type="type" class="w-100 h-100 border-0" :placeholder="placeholder" />
        </div>
    </div>
</template>

<style scoped>
.input-border {
    border-color: #374553 !important;
}

.title {
    color: #374553;
}

.title-icon {
    display: none !important;
}

input::placeholder {
    color: #999999;
}

input:focus {
    outline: none;
}

@media (max-width: 575.98px) {
    .title {
        display: none !important;
    }

    .title-icon {
        display: flex !important;
        align-items: center;
    }
}
</style>
