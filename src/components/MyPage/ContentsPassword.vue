<script setup>
import CommonInput2 from "@/components/common/CommonInput2.vue";
import CommonMessage from "@/components/common/CommonMessage.vue";
import CommonButton from "@/components/common/CommonButton.vue";
import { ref, computed, watch } from "vue";
import { passwordCheck, passwordChange } from "@/apis/userApi.js";
import { useUserInfoStore } from "@/stores/userInfo.js";

const store = useUserInfoStore();
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
        await passwordCheck(store.getUserInfo.id, before.value)
            .then((response) => {
                console.log(response.data);
                messages.value[0].state = true;
                messages.value[0].message = "";
            })
            .catch((error) => {
                console.log(error);
                messages.value[0].state = false;
                messages.value[0].message = "부정확한 비밀번호 입니다";
            });

        if (before.value == after.value) {
            messages.value[1].state = true;
            messages.value[1].message = "비밀번호가 일치합니다";
        } else {
            messages.value[1].state = false;
            messages.value[1].message = "비밀번호가 일치하지 않습니다";
        }
    }
});
watch(after, () => {
    if (after.value.length == 0) {
        messages.value[1].state = false;
        messages.value[1].message = "비밀번호를 입력해주세요";
    } else {
        if (after.value == before.value) {
            messages.value[1].state = true;
            messages.value[1].message = "비밀번호가 일치합니다";
        } else {
            messages.value[1].state = false;
            messages.value[1].message = "비밀번호가 일치하지 않습니다";
        }
    }
});
const doChangePassword = async () => {
    if (canChange.value == 2) {
        await passwordChange(store.getUserInfo.id, after.value)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
};
</script>

<template>
    <div class="col-7 mx-auto">
        <div class="fw-bold fs-5 text-center">비밀번호 변경</div>
        <div class="mt-5 d-flex flex-column row-gap-3">
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'8자 이상 소문자, 숫자'"
                    :title="'기존 비밀번호'"
                    :type="'password'"
                    v-model="before"
                />
                <CommonMessage :isSuccess="messages[0].state" :message="messages[0].message" />
            </div>
            <div>
                <CommonInput2
                    :height="60"
                    :placeholder="'8자 이상 소문자, 숫자'"
                    :title="'새로운 비밀번호'"
                    :type="'password'"
                    v-model="after"
                />
                <CommonMessage :isSuccess="messages[1].state" :message="messages[1].message" />
            </div>
        </div>
        <div class="mt-5 w-100 d-flex align-items-center">
            <CommonButton
                :height="50"
                :value="'비밀번호 변경'"
                :bgColors="['#1769ff', '#e1e1e1']"
                :state="canChange == 2"
                :click="doChangePassword"
            />
        </div>
    </div>
</template>

<style scoped></style>
