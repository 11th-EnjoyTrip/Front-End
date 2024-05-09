<script setup>
import { useUserInfoStore } from "@/stores/userInfo";

defineProps({
    modalState: Boolean,
    result: String,
});

const store = useUserInfoStore();
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div
                v-if="modalState"
                class="position-fixed top-0 left-0 w-100 h-100 row justify-content-center align-items-center modal-background"
            >
                <div class="col-9 col-sm-6 bg-white rounded-3 modal-container">
                    <div class="fw-semibold">
                        <span class="fw-bold fs-5 modal-title">{{ store.getUserInfo.nickname }}</span> 님의 비밀번호는
                    </div>
                    <div class="fw-semibold mt-3 px-3">
                        <span class="fw-bold fs-5">" {{ result }} "</span> 입니다
                    </div>
                    <button class="mt-3 modal-default-button" @click="$emit('close')">close button</button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-background {
    z-index: 9998;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
}

.modal-container {
    padding: 30px 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-title {
    color: #1769ff;
}

.modal-default-button {
    /* close button section style */
}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
