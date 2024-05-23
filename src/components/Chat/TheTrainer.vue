<script setup>
import { computed, reactive } from 'vue';
import TheResult from '@/components/Chat/TheResult.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconSearch from '@/components/icons/IconSearch.vue';

import {
  createCompletion,
  createClient,
  ROLE_ASSISTANT,
  ROLE_SYSTEM,
  ROLE_USER,
} from '@/apis/openaiApi';

const DEFAULT_SYSTEM_MESSAGE = '어서오세요。\n';
const DEFAULT_USER_MESSAGE = '';
const DEFAULT_DRONE_HOST_MESSAGE = '';
const DEFAULT_DELAY_SECONDS = 1;
const DEFAULT_EXPECTED_MESSAGES = 5;

const emit = defineEmits(['showTrainer']);

const handleClick = () => {
  emit('showTrainer');
};

const data = reactive({
  error: '',
  key: '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',
  systemMessage: localStorage.getItem('systemMessage') || DEFAULT_SYSTEM_MESSAGE,
  // userMessage: localStorage.getItem('userMessage') || DEFAULT_USER_MESSAGE,
  userMessage:  DEFAULT_USER_MESSAGE,
  delaySeconds: Number(localStorage.getItem('delaySeconds')) || DEFAULT_DELAY_SECONDS,
  generatedMessages: [],
  loads: false,
});

class Message {
  role;
  content;

  constructor(role, content) {
    this.role = role;
    this.content = content.trim();
  }
}

const initMessages = computed(() => [
  new Message(ROLE_SYSTEM, data.systemMessage),
]);

const generatedMessages = computed(() => initMessages.value.concat(data.generatedMessages));

const remember = (key, value) => localStorage.setItem(key, value);

const rememberKey = () => localStorage.setItem('key', window.btoa(data.key));

const run = async () => {
  data.loads = true;
  const client = createClient(data.key);
  try {
    const userMessages = data.userMessage.split('\n').filter((userMessage) => !!userMessage);
    for await (const userMessage of userMessages) {
      data.generatedMessages.push(new Message(ROLE_USER, userMessage));
      data.userMessage = '';

      // 사용자가 로그인 하지 않은 경우
      if (localStorage.accessToken == undefined) {
        
        data.generatedMessages.push(new Message(ROLE_SYSTEM, '로그인 후 서비스를 이용하시기 바랍니다.'));
        await new Promise((resolve) => setTimeout(resolve, data.delaySeconds * 1000));
        data.loads = false;
      } else { // 로그인한 경우
        const result = await createCompletion(client)({
        messages: generatedMessages.value,
        });
        const { choices } = result.data;
        const [choice] = choices;
        const { message } = choice;
        data.generatedMessages.push(new Message(ROLE_ASSISTANT, message.content));
        await new Promise((resolve) => setTimeout(resolve, data.delaySeconds * 1000));
        data.loads = false;
      }
    }
  } catch (err) {
    data.error = err?.response?.data?.error?.message || err.message;
    data.loads = false;
  }
};
</script>

<template>
  <div>
    <v-snackbar
      v-if="data.error"
      color="indigo-lighten-1"
      model-value
      @update:modelValue="data.error = ''"
    >
      {{ data.error }}
    </v-snackbar>
    <v-row class="justify-center">
      <v-col cols="12" sm="10" md="6">
        <v-card class="floating-card ">
          <div class="p-3 d-flex pb-3 pt-3 justify-content-between" style="background-color:#eceff1;">
            <div class="d-flex">
              <div style="background-color: #ffffff; border-radius: 20px;">
                <img src="@/assets/chat/chatbot.png" width="38" height="38" style="padding: 3px;"/>
              </div>
              <div class="ms-2 mt-1" style="color:#666666; margin-top:2px; 
                font-size: larger; font-weight: 500">
                Travelog</div>
            </div>
            <IconClose :width="25" :height="25" :color="'#828282'" class="mt-1" @click="handleClick"  />
          </div>
          <v-card-item class="pa-5 pb-1 pt-3 bg-white">
            <TheResult :messages="generatedMessages" />
          </v-card-item>


          <div class="p-3 pt-2">
            <div class="loading " v-if="data.loads">
              <div class="loader2"></div>
          </div>
              <div class="input-group" style="">
                <input
                  type="text"
                  class="form-control custom-input"
                  v-model="data.userMessage"
                  placeholder="무엇이 궁금하신가요?"
                  @input="remember('userMessage', data.userMessage)"
                />
                <button class="btn" type="button" @click="run" style="border: 1px solid #eceff1;
                border-radius: 0px 15px 15px 0px; background-color: #eceff1;">
                  <IconSearch :width="23" :height="23" :color="'#666666'"/>
                </button>
              </div>
            </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
@import "@/assets/chat/loading.css";

.floating-card {
  position: fixed;
  bottom: 40px;
  right: 12%;
  width: 350px;
  max-width: calc(100% - 40px);
  height: 550px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  border-radius:15px;
}

@media (max-width: 1350px) {
  .floating-card {
    right: 6%;
  }
}

.custom-input:focus {
  border-color: #eceff1 !important;
  box-shadow: none !important;
  background-color: #eceff1;
}

.custom-input:hover {
  border-color: #eceff1 !important;
  background-color: #eceff1;
}

.custom-input{
  border: #eceff1;
  border-radius: 15px 0px 0px 15px;
  background-color: #eceff1;
}


</style>
