<script setup>
import NavComp from "@/components/Nav/NavComp.vue";
import CommonButton from "@/components/common/CommonButton.vue";
import CommonInput2 from "@/components/common/CommonInput2.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
import { ref, computed, watch } from "vue";
import { useUserInfoStore } from "@/stores/userInfo.js";

const inputId = ref("");
const inputPwd = ref("");
const inputCheck = ref("");
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
    {
        state: false,
        message: "",
    },
    {
        state: false,
        message: "",
    },
]);
const canSignup = computed(() => {
    return messages.value.filter((item) => item.state).length;
});

watch(inputId, () => {
    const regex = /^[a-z0-9]+$/g;
    if (!regex.test(inputId.value)) {
        messages.value[0].state = false;
        messages.value[0].message = "소문자와 숫자만 입력 가능합니다";
    } else {
        messages.value[0].state = true;
        messages.value[0].message = "사용 가능한 아이디 입니다";
    }
});
watch(inputPwd, () => {
    const regex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/g;
    if (!regex.test(inputPwd.value)) {
        messages.value[1].state = false;
        messages.value[1].message = "비밀번호 형식에 맞지 않습니다";
    } else {
        messages.value[1].state = true;
        messages.value[1].message = "사용 가능한 비밀번호 입니다";
    }
});
watch(inputCheck, () => {
    if (inputCheck.value != inputPwd.value) {
        messages.value[2].state = false;
        messages.value[2].message = "비밀번호가 일치하지 않습니다";
    } else {
        messages.value[2].state = true;
        messages.value[2].message = "비밀번호가 일치합니다";
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
        messages.value[4].message = "사용 가능한 이메일 입니다";
    }
});

const doSignup = () => {
    if (canSignup.value == 5) {
        const store = useUserInfoStore();
        const signupInfo = {
            id: inputId.value,
            password: inputPwd.value,
            name: inputName.value,
            email: inputEmail.value,
        };
        store.doSignup(signupInfo);
    }
};
</script>

<template>
    <NavComp :withLower="false" />
    <div class="row">
        <div class="d-flex flex-column h-auto col-10 col-sm-12 mx-auto signup">
            <div class="mx-auto fw-bold title">회원가입</div>
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
                    <CommonInput2
                        :height="50"
                        :placeholder="'8자 이상 소문자, 숫자'"
                        :title="'비밀번호'"
                        :type="password"
                        v-model="inputPwd"
                    />
                    <CommonMessage :isSuccess="messages[1].state" :message="messages[1].message" />
                </div>
                <div>
                    <CommonInput2
                        :height="50"
                        :placeholder="'비밀번호 재입력'"
                        :title="'비밀번호 확인'"
                        v-model="inputCheck"
                    />
                    <CommonMessage :isSuccess="messages[2].state" :message="messages[2].message" />
                </div>
                <div>
                    <CommonInput2 :height="50" :placeholder="'이름'" :title="'이름'" v-model="inputName" />
                    <CommonMessage :isSuccess="messages[3].state" :message="messages[3].message" />
                </div>

                <div>
                    <CommonInput2
                        :height="50"
                        :placeholder="'email@domain.com'"
                        :title="'이메일'"
                        v-model="inputEmail"
                    />
                    <CommonMessage :isSuccess="messages[4].state" :message="messages[4].message" />
                </div>
            </div>
            <div class="mt-4 px-5">
                <CommonButton
                    :height="50"
                    :value="'회원가입'"
                    :bgColors="['#1769ff', '#e1e1e1']"
                    :state="canSignup == 5"
                    :click="doSignup"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.signup {
    max-width: 480px;
    margin-top: 60px;
}

.title {
    font-size: 36px;
    color: #374553;
}
</style>
