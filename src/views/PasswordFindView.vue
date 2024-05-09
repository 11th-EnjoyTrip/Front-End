<script setup>
import NavComp from "@/components/Nav/NavComp.vue";
import { ref, computed, watch } from "vue";
import { useUserInfoStore } from "@/stores/userInfo.js";
import CommonInput2 from "@/components/common/CommonInput2.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
import CommonButton from "@/components/common/CommonButton.vue";

const inputId = ref("");
const inputName = ref("");
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
    {
        state: false,
        message: "",
    },
]);
const canFind = computed(() => {
    return messages.value.filter((item) => item.state).length;
});

watch(inputId, () => {
    const regex = /^[a-z0-9]+$/g;
    if (!regex.test(inputId.value)) {
        messages.value[0].state = false;
        messages.value[0].message = "소문자와 숫자만 입력 가능합니다";
    } else {
        messages.value[0].state = true;
        messages.value[0].message = "";
    }
});
watch(inputName, () => {
    if (inputName.value.length == 0) {
        messages.value[3].state = false;
        messages.value[3].message = "이름을 입력해주세요";
    } else {
        messages.value[3].state = true;
        messages.value[3].message = "";
    }
});
watch(inputEmail, () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
    if (!regex.test(inputEmail.value)) {
        messages.value[4].state = false;
        messages.value[4].message = "이메일 형식에 맞지 않습니다";
    } else {
        messages.value[4].state = true;
        messages.value[4].message = "";
    }
});

const doFind = async () => {
    if (canFind.value == 3) {
        const store = useUserInfoStore();
        await store.findPassword(inputId.value, inputName.value, inputEmail.value);
    }
};
</script>

<template>
    <NavComp :withLower="false" />
    <div class="row">
        <div class="d-flex flex-column h-auto col-10 col-sm-12 mx-auto find">
            <div class="mx-auto fw-bold title">비밀번호 찾기</div>
            <div class="d-flex flex-column row-gap-3 mt-5">
                <div>
                    <CommonInput2
                        :height="50"
                        :placeholder="'소문자, 숫자'"
                        :title="'아이디'"
                        :type="text"
                        v-model="inputId"
                    />
                    <CommonMessage :isSuccess="messages[0].state" :message="messages[0].message" />
                </div>
                <div>
                    <CommonInput2 :height="50" :placeholder="'이름'" :title="'이름'" v-model="inputName" />
                    <CommonMessage :isSuccess="messages[1].state" :message="messages[1].message" />
                </div>
                <div>
                    <CommonInput2
                        :height="50"
                        :placeholder="'email@domain.com'"
                        :title="'이메일'"
                        v-model="inputEmail"
                    />
                    <CommonMessage :isSuccess="messages[2].state" :message="messages[2].message" />
                </div>
            </div>
            <div class="mt-4 px-5">
                <CommonButton
                    :height="50"
                    :value="'비밀번호 찾기'"
                    :bgColors="['#1769ff', '#e1e1e1']"
                    :state="canFind == 3"
                    :click="doFind"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.find {
    max-width: 480px;
    margin-top: 60px;
}

.title {
    font-size: 36px;
    color: #374553;
}
</style>
