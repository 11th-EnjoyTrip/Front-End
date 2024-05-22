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

const loads = false;

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
  // data.generatedMessages = [];
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
      // document.getElementById('input-9').focus();
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
    <div >
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
            <v-card
                color="blue-grey-lighten-5"
                height="700px"
                style="width:400px;"
            >
                <v-card-item class="pa-8 pb-4">
                  <div class="text-h5 mb-4 font-weight-bold text-indigo">
                      문의내용
                  </div>
                  <div>
                      <TheResult :messages="generatedMessages" />
                  </div>
                </v-card-item>
                <v-card-item class="ps-8 pe-8">
                  <div class="loading" v-if="data.loads">
                      <div class="loader2"></div>
                  </div>
                  <div class="my-4">
                      <div class="text-subtitle-2 mb-2">
                      User Messages
                      </div>
                      <div>
                        <v-textarea
                            v-model="data.userMessage"
                            color="indigo"
                            hide-details
                            no-resize
                            rows="1"
                            variant="outlined"
                            @input="remember('userMessage', data.userMessage)"
                            ref="msg"
                        />
                      </div>
                  </div>
                </v-card-item>
                <v-card-actions class="justify-end pa-8 pt-0">
                <v-btn
                    block
                    color="indigo"
                    variant="outlined"
                    @click="run"
                >
                    문의보내기
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<style>
  @import "@/assets/chat/loading.css";
</style>