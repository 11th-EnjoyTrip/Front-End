<script setup>
import NavComp from "@/components/Nav/NavComp.vue";
import { ref, computed, watch } from "vue";
import CommonInput2 from "@/components/common/CommonInput2.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
import CommonButton from "@/components/common/CommonButton.vue";
import { passwordFind } from "@/apis/userApi.js";
import ModalPasswordFindResult from "@/components/Modal/ModalPasswordFindResult.vue";

const inputId = ref("");
const inputEmail = ref("");
const messages = ref([
    {
        state: false,
        message: "",
    },
    {
        state: false,
        message: "",
    },
]);
const canFind = computed(() => {
    return messages.value.filter((item) => item.state).length;
});
const modalState = ref(false);
const isSuccess = ref(false);
const result = ref("");

watch(inputId, () => {
    if (inputId.value.length == 0) {
        messages.value[0].state = false;
        messages.value[0].message = "아이디를 입력해주세요";
    } else {
        messages.value[0].state = true;
        messages.value[0].message = "";
    }
});
watch(inputEmail, () => {
    if (inputEmail.value.length == 0) {
        messages.value[1].state = false;
        messages.value[1].message = "이메일을 입력해주세요";
    } else {
        messages.value[1].state = true;
        messages.value[1].message = "";
    }
});

const doFind = async () => {
    if (canFind.value == 2) {
        await passwordFind(inputId.value, inputEmail.value)
            .then((response) => {
                result.value = response.data.pwd;
                modalState.value = true;
                isSuccess.value = true;
            })
            .catch(() => {
                modalState.value = true;
                isSuccess.value = false;
            });
    }
};
</script>

<template>
    <NavComp :withLower="false" />
    <Transition name="bounce" appear>
        <div class="row">
            <div class="d-flex flex-column h-auto col-8 col-sm-9 mx-auto find">
                <div class="mx-auto fw-bold title">비밀번호 찾기</div>
                <div class="d-flex flex-column row-gap-3 mt-5">
                    <div>
                        <CommonInput2 :height="40" :placeholder="'소문자, 숫자'" :title="'아이디'" v-model="inputId" />
                        <CommonMessage :isSuccess="messages[0].state" :message="messages[0].message" />
                    </div>
                    <div>
                        <CommonInput2
                            :height="40"
                            :placeholder="'email@domain.com'"
                            :title="'이메일'"
                            v-model="inputEmail"
                        />
                        <CommonMessage :isSuccess="messages[1].state" :message="messages[1].message" />
                    </div>
                </div>
                <div class="mt-4 px-5">
                    <CommonButton
                        :height="40"
                        :value="'비밀번호 찾기'"
                        :bgColors="['#1769ff', '#e1e1e1']"
                        :state="canFind == 2"
                        :click="doFind"
                    />
                </div>
            </div>
        </div>
    </Transition>
    <ModalPasswordFindResult
        :modalState="modalState"
        :isSuccess="isSuccess"
        :id="inputId"
        :result="result"
        @close="modalState = false"
    />
</template>

<style scoped>
.find {
    max-width: 440px;
    margin-top: 60px;
}

.title {
    font-size: 24px;
    color: #374553;
}

.bounce-enter-active {
    animation: bounce 0.5s;
}

@keyframes bounce {
    0% {
        transform: scale(0.975);
    }
    100% {
        transform: scale(1);
    }
}
</style>
