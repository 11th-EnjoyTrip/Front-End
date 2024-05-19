<script setup>
import NavComp from "@/components/Nav/NavComp.vue";
import CommonButton from "@/components/common/CommonButton.vue";
import CommonInput2 from "@/components/common/CommonInput2.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
import SignUpPreferContents from "@/components/Auth/SignUp/SignUpPreferContents.vue";
import ModalSignUpResult from "@/components/Modal/ModalSignUpResult.vue";
import { ref, computed, watch } from "vue";
import { idCheck, nicknameCheck, emailCheck, signup } from "@/apis/userApi.js";

const inputId = ref("");
const inputPwd = ref("");
const inputCheck = ref("");
const inputName = ref("");
const inputNickname = ref("");
const inputEmail = ref("");
const inputPrefers = ref(["대구"]);
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
    {
        state: false,
        message: "",
    },
]);
const modalState = ref(false);
const isSuccess = ref(false);
const canSignup = computed(() => {
    return messages.value.filter((item) => item.state).length;
});

watch(inputId, async () => {
    const regex = /^[a-z0-9]+$/g;
    if (!regex.test(inputId.value)) {
        messages.value[0].state = false;
        messages.value[0].message = "소문자와 숫자만 입력 가능합니다";
    } else {
        await idCheck(inputId.value)
            .then(() => {
                messages.value[0].state = true;
                messages.value[0].message = "사용 가능한 아이디 입니다";
            })
            .catch(() => {
                messages.value[0].state = false;
                messages.value[0].message = "중복된 아이디 입니다";
            });
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

    if (inputPwd.value != inputCheck.value) {
        messages.value[2].state = false;
        messages.value[2].message = "비밀번호가 일치하지 않습니다";
    } else {
        messages.value[2].state = true;
        messages.value[2].message = "비밀번호가 일치합니다";
    }
});
watch(inputCheck, () => {
    if (inputCheck.value.length == 0) {
        messages.value[2].state = false;
        messages.value[2].message = "비밀번호를 입력해주세요";
    } else {
        if (inputCheck.value != inputPwd.value) {
            messages.value[2].state = false;
            messages.value[2].message = "비밀번호가 일치하지 않습니다";
        } else {
            messages.value[2].state = true;
            messages.value[2].message = "비밀번호가 일치합니다";
        }
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
watch(inputNickname, async () => {
    if (inputNickname.value.length == 0) {
        messages.value[4].state = false;
        messages.value[4].message = "닉네임을 입력해주세요";
    } else {
        await nicknameCheck(inputNickname.value)
            .then(() => {
                messages.value[4].state = true;
                messages.value[4].message = "사용 가능한 닉네임 입니다";
            })
            .catch(() => {
                messages.value[4].state = false;
                messages.value[4].message = "중복된 닉네임 입니다";
            });
    }
});
watch(inputEmail, async () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
    if (!regex.test(inputEmail.value)) {
        messages.value[5].state = false;
        messages.value[5].message = "이메일 형식에 맞지 않습니다";
    } else {
        await emailCheck(inputEmail.value)
            .then(() => {
                messages.value[5].state = true;
                messages.value[5].message = "사용 가능한 이메일 입니다";
            })
            .catch(() => {
                messages.value[5].state = false;
                messages.value[5].message = "중복된 이메일 입니다";
            });
    }
});

const doSignup = async () => {
    if (canSignup.value == 6) {
        const signupInfo = {
            userid: inputId.value,
            password: inputPwd.value,
            username: inputName.value,
            nickname: inputNickname.value,
            email: inputEmail.value,
            location: "대구",
        };

        await signup(signupInfo)
            .then(() => {
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
            <div class="h-auto mx-auto d-flex flex-column col-8 col-sm-9 signup">
                <div class="mx-auto fw-bold title">회원가입</div>
                <div class="row-gap-4 mt-5 d-flex flex-column">
                    <div>
                        <CommonInput2 :height="40" :placeholder="'소문자, 숫자'" :title="'아이디'" v-model="inputId" />
                        <CommonMessage :isSuccess="messages[0].state" :message="messages[0].message" />
                    </div>
                    <div>
                        <CommonInput2
                            :height="40"
                            :placeholder="'8자 이상 소문자, 숫자'"
                            :title="'비밀번호'"
                            :type="'password'"
                            v-model="inputPwd"
                        />
                        <CommonMessage :isSuccess="messages[1].state" :message="messages[1].message" />
                    </div>
                    <div>
                        <CommonInput2
                            :height="40"
                            :placeholder="'비밀번호 재입력'"
                            :title="'비밀번호 확인'"
                            :type="'password'"
                            v-model="inputCheck"
                        />
                        <CommonMessage :isSuccess="messages[2].state" :message="messages[2].message" />
                    </div>
                    <div>
                        <CommonInput2 :height="40" :placeholder="'이름'" :title="'이름'" v-model="inputName" />
                        <CommonMessage :isSuccess="messages[3].state" :message="messages[3].message" />
                    </div>
                    <div>
                        <CommonInput2 :height="40" :placeholder="'닉네임'" :title="'닉네임'" v-model="inputNickname" />
                        <CommonMessage :isSuccess="messages[4].state" :message="messages[4].message" />
                    </div>
                    <div>
                        <CommonInput2
                            :height="40"
                            :placeholder="'email@domain.com'"
                            :title="'이메일'"
                            v-model="inputEmail"
                        />
                        <CommonMessage :isSuccess="messages[5].state" :message="messages[5].message" />
                    </div>
                    <div><SignUpPreferContents v-model="inputPrefers" /></div>
                </div>
                <div class="px-5 mt-4">
                    <CommonButton
                        :height="40"
                        :value="'회원가입'"
                        :bgColors="['#1769ff', '#e1e1e1']"
                        :state="canSignup == 6"
                        :click="doSignup"
                    />
                </div>
            </div>
        </div>
    </Transition>
    <ModalSignUpResult :modalState="modalState" :isSuccess="isSuccess" @close="modalState = false" />
</template>

<style scoped>
.signup {
    max-width: 440px;
    margin-top: 60px;
}

.title {
    font-size: 24px;
    color: #374553;
}

.content-box {
    border-color: #374553 !important;
    height: 60px;
}

.prefer-title {
    color: #646f7c;
    font-size: 14px;
}

.title-icon {
    display: none !important;
}

.contents {
    color: #374553;
    font-size: 14px;
}

.dropdown-items {
    box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.05);
    animation: moveDown 0.3s ease forwards;
}

.item {
    font-size: 14px;
    color: #374559;
}

.item:hover {
    color: #1769ff;
    font-weight: bold;
    background-color: #f7f7f7;
}

@keyframes moveDown {
    0% {
        top: 0px;
    }
    100% {
        top: 32px;
    }
}

@media (max-width: 575.98px) {
    .prefer-title {
        display: none !important;
    }

    .title-icon {
        display: flex !important;
        align-items: center;
    }
}

.bounce-enter-active {
    animation: bounce 0.5s;
}

.bounce-leave-active {
    animation: bounce 0.5s reverse;
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
