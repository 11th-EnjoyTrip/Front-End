<script setup>
defineProps({
    modalState: Boolean,
    isSuccess: Boolean,
    result: String,
});

const emit = defineEmits(["close"]);
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div
                v-if="modalState"
                class="position-fixed top-0 left-0 w-100 h-100 row justify-content-center align-items-center modal-background"
            >
                <div
                    class="col-9 col-sm-6 bg-white d-flex flex-column justify-content-center align-items-center modal-container"
                >
                    <div class="fw-semibold">
                        <span class="fw-bold modal-title" v-html="result"></span>
                    </div>
                    <button
                        class="w-100 mt-4 py-2 text-white fw-bold border-0 modal-default-button"
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
    padding-top: 40px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    transition: all 0.3s ease;
    width: 30%;
    min-width: 300px;
    max-width: 400px;
}

.modal-title {
    text-align: center;
    font-size: 100%;
    display: flex;
}

.modal-default-button {
    background-color: #73afff;
    border-radius: 10px;
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
