<script setup>
import { useRouter } from "vue-router";
defineProps({
    modalState: Boolean,
    isSuccess: Boolean,
});
const emit = defineEmits(["close"]);
const router = useRouter();
const move = () => {
    emit("close");
    router.replace("/auth/login");
};
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div
                v-if="modalState"
                class="position-fixed top-0 left-0 w-100 h-100 row justify-content-center align-items-center modal-background"
            >
                <div v-if="isSuccess" class="col-6 col-sm-4 bg-white rounded-3 modal-container">
                    <div class="fw-semibold modal-body">
                        회원가입에 <span class="success">성공</span>했습니다<br />로그인 화면으로 이동합니다
                    </div>
                    <button
                        class="w-100 mt-4 py-2 text-white fw-bold border-0 rounded-3 modal-default-button"
                        @click="move"
                    >
                        확인
                    </button>
                </div>
                <div
                    v-else
                    class="col-7 col-sm-4 bg-white rounded-3 d-flex flex-column justify-content-center align-items-center modal-container"
                >
                    <div class="fw-semibold modal-body">회원가입에 <span class="fail">실패</span>했습니다</div>
                    <button
                        class="w-100 mt-4 py-2 text-white fw-bold border-0 rounded-3 modal-default-button"
                        @click="emit('close')"
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

.success {
    color: #1769ff;
    font-weight: 700;
    font-size: 16px;
}

.fail {
    color: #ff2c51;
    font-weight: 700;
    font-size: 16px;
}

.modal-default-button {
    background-color: #ff2c51;
    font-size: 14px;
    color: white;
}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
}
</style>
