<script setup>
import { useUserInfoStore } from "@/stores/userInfo";

defineProps({
    modalState: Boolean,
    isSuccess: Boolean,
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
                <div v-if="isSuccess" class="col-6 col-sm-4 bg-white rounded-3 modal-container">
                    <div class="fw-semibold">
                        <span class="fw-bold fs-5 modal-title">{{ store.getUserInfo.nickname }}</span> 님의 비밀번호는
                    </div>
                    <div class="fw-semibold mt-3 px-3">
                        <span class="fw-bold fs-5">" {{ result }} "</span> 입니다.
                    </div>
                    <button
                        class="w-100 mt-4 py-2 text-white fw-bold border-0 rounded-3 modal-default-button"
                        @click="$emit('close')"
                    >
                        확인
                    </button>
                </div>

                <div
                    v-else
                    class="col-7 col-sm-4 bg-white rounded-3 d-flex flex-column justify-content-center align-items-center modal-container"
                >
                    <div class="modal-body"><span class="modal-title">유효하지 않은 사용자</span> 입니다.</div>
                    <button
                        class="w-100 mt-4 py-2 text-white fw-bold border-0 rounded-3 modal-default-button"
                        @click="$emit('close')"
                    >
                        확인
                    </button>
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
    padding-top: 30px;
    padding-bottom: 20px;
    padding-left: 30px;
    padding-right: 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-body {
    color: #374559;
    font-weight: 500;
    font-size: 14px;
}

.modal-title {
    color: #1769ff;
    font-weight: 700;
    font-size: 16px;
}

.modal-default-button {
    background-color: #73afff;
    font-size: 14px;
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
