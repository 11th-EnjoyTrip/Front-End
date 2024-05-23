<script setup>
import { computed, reactive } from 'vue';
import TheResult from '@/components/Chat/TheResult.vue';

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

const data = reactive({
  error: '',
  key: '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',
  systemMessage: localStorage.getItem('systemMessage') || DEFAULT_SYSTEM_MESSAGE,
  userMessage: localStorage.getItem('userMessage') || DEFAULT_USER_MESSAGE,
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
          <div class="pa-5 d-flex pb-3 pt-4" style="background-color:#eceff1;">
              <a-avatar style="color: #1769FF; background-color: #B4D4FF">U</a-avatar>
              <div class="text-h6 font-weight-bold ms-2" style="color:#666666; margin-top:2px;">Travelog</div>
              <CloseOutlined />
          </div>
          <v-card-item class="pa-5 pb-4 pt-3 bg-white">
            <TheResult :messages="generatedMessages" />
          </v-card-item>

          <div class="loading " v-if="data.loads">
              <div class="loader2"></div>
          </div>
          <v-card-text style="padding-top:2px;">
            <v-text-field
              v-model="data.userMessage"
              :loading="loading"
              append-inner-icon="mdi-magnify"
              density="compact"
              label="무엇이 궁금하신가요?"
              variant="solo"
              hide-details
              single-line
              rounded
              no-resize
              @input="remember('userMessage', data.userMessage)"
              ref="msg"
              @click:append-inner="run"
            ></v-text-field>
          </v-card-text>
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
  /* background-color: #eceff1; */
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  border-radius:15px;
}

@media (max-width: 1350px) {
  .floating-card {
    right: 6%;
  }
}
</style>
