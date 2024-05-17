<script setup>
import CommonInput2 from "@/components/common/CommonInput2.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
import CommonButton from "@/components/common/CommonButton.vue";
import { ref, computed, watch } from "vue";
import { passwordChange, passwordCheck } from "@/apis/userApi.js";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const before = ref("");
const after = ref("");
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
const canChange = computed(() => {
    return messages.value.filter((item) => item.state).length;
});

watch(before, async () => {
    if (before.value.length == 0) {
        messages.value[0].state = false;
        messages.value[0].message = "비밀번호를 입력해주세요";
        messages.value[1].message = "";
    } else {
        await passwordCheck(before.value)
            .then(() => {
                messages.value[0].state = true;
                messages.value[0].message = "비밀번호가 정상적으로 입력되었습니다";
            })
            .catch(() => {
                messages.value[0].state = false;
                messages.value[0].message = "일치하지 않는 비밀번호입니다";
            });
    }
});
watch(after, () => {
    if (after.value.length == 0) {
        messages.value[1].state = false;
        messages.value[1].message = "비밀번호를 입력해주세요";
    } else {
        if (after.value == before.value) {
            messages.value[1].state = false;
            messages.value[1].message = "비밀번호가 일치합니다";
        } else {
            const regex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/g;
            if (!regex.test(after.value)) {
                messages.value[1].state = false;
                messages.value[1].message = "비밀번호 형식에 맞지 않습니다";
            } else {
                messages.value[1].state = true;
                messages.value[1].message = "사용 가능한 비밀번호 입니다";
            }
        }
    }
});
const doChangePassword = async () => {
    if (canChange.value == 2) {
        await passwordChange(after.value)
            .then(() => {
                message.success("비밀번호 변경에 성공했습니다");
                router.go(0);
            })
            .catch(() => {
                message.error("비밀번호 변경에 실패했습니다");
            });
    } else {
        message.warn("모든 항목을 제대로 입력해주세요");
    }
};
</script>

<template>
    <div class="position-absolute w-100">
        <div class="fw-bold fs-5 text-center">비밀번호 변경</div>
        <div class="mt-5 d-flex flex-column row-gap-3">
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'기존 비밀번호'"
                    :title="'기존 비밀번호'"
                    :type="'password'"
                    v-model="before"
                />
                <CommonMessage :isSuccess="messages[0].state" :message="messages[0].message" />
            </div>
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'새로운 비밀번호'"
                    :title="'새로운 비밀번호'"
                    :type="'password'"
                    v-model="after"
                />
                <CommonMessage :isSuccess="messages[1].state" :message="messages[1].message" />
            </div>
        </div>
        <div class="mt-5 w-75 mx-auto d-flex align-items-center">
            <CommonButton
                :height="40"
                :value="'비밀번호 변경'"
                :bgColors="['#1769ff', '#e1e1e1']"
                :state="canChange == 2"
                :click="doChangePassword"
            />
        </div>
    </div>
</template>

<style scoped></style>
