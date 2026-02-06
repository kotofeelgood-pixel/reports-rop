<script setup lang="ts">
import { ref, watch } from 'vue'
import ModalComponent from '@/components/modal/ModalComponent.vue'
import ButtonComponent from '@/components/buttons/ButtonComponent.vue'
import { telephonyCallAttachTranscription, type TranscriptMessage } from '@/api/calls'
import type { Call } from '@/tools/calls'

const props = defineProps<{
  open: boolean
  call: Call | null
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'success'): void
}>()

const model = defineModel<boolean>('open', { default: false })

type MessageRow = { SIDE: 'User' | 'Client'; START_TIME: number; STOP_TIME: number; MESSAGE: string }
const messages = ref<MessageRow[]>([
  { SIDE: 'User', START_TIME: 0, STOP_TIME: 0, MESSAGE: '' },
  { SIDE: 'Client', START_TIME: 0, STOP_TIME: 0, MESSAGE: '' },
])
const sending = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

watch(
  () => props.open && props.call,
  (v) => {
    if (v) {
      messages.value = [
        { SIDE: 'User', START_TIME: 0, STOP_TIME: 0, MESSAGE: '' },
        { SIDE: 'Client', START_TIME: 0, STOP_TIME: 0, MESSAGE: '' },
      ]
      error.value = null
      success.value = false
    }
  },
  { immediate: true }
)

function addRow() {
  messages.value.push({ SIDE: 'User', START_TIME: 0, STOP_TIME: 0, MESSAGE: '' })
}

function removeRow(index: number) {
  if (messages.value.length <= 1) return
  messages.value.splice(index, 1)
}

function toTranscriptMessages(): TranscriptMessage[] {
  return messages.value
    .filter((r) => String(r.MESSAGE ?? '').trim() !== '')
    .map((r) => ({
      SIDE: r.SIDE,
      START_TIME: Number(r.START_TIME) || 0,
      STOP_TIME: Number(r.STOP_TIME) || 0,
      MESSAGE: String(r.MESSAGE ?? '').trim(),
    }))
}

async function submit() {
  const call = props.call
  if (!call?.id) return
  const list = toTranscriptMessages()
  if (list.length === 0) {
    error.value = 'Добавьте хотя бы одну реплику с текстом'
    return
  }
  error.value = null
  sending.value = true
  try {
    const ok = await telephonyCallAttachTranscription({ callId: call.id, messages: list })
    if (ok) {
      success.value = true
      setTimeout(() => {
        model.value = false
        emit('success')
      }, 800)
    } else {
      error.value = 'Не удалось сохранить расшифровку'
    }
  } catch {
    error.value = 'Ошибка при отправке'
  } finally {
    sending.value = false
  }
}

function close() {
  model.value = false
  emit('update:open', false)
}

const callLabel = () => (props.call ? `${props.call.time} — ${props.call.number}` : '')
</script>

<template>
  <ModalComponent
    v-model:open="model"
    :title="`Расшифровка звонка: ${callLabel()}`"
    overlay
    modal
    :close="true"
  >
    <template #body>
      <div class="space-y-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Укажите реплики разговора: участник (User — сотрудник, Client — клиент), время начала и окончания в секундах, текст.
        </p>
        <div v-if="error" class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
          {{ error }}
        </div>
        <div v-if="success" class="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300">
          Расшифровка добавлена к звонку.
        </div>
        <div class="space-y-3">
          <div
            v-for="(row, index) in messages"
            :key="index"
            class="flex flex-wrap items-start gap-2 rounded-lg border border-gray-200 p-3 dark:border-gray-700"
          >
            <select
              v-model="row.SIDE"
              class="rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="User">User (сотрудник)</option>
              <option value="Client">Client (клиент)</option>
            </select>
            <input
              v-model.number="row.START_TIME"
              type="number"
              min="0"
              placeholder="Нач. (сек)"
              class="w-20 rounded border border-gray-300 px-2 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <input
              v-model.number="row.STOP_TIME"
              type="number"
              min="0"
              placeholder="Кон. (сек)"
              class="w-20 rounded border border-gray-300 px-2 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <input
              v-model="row.MESSAGE"
              type="text"
              placeholder="Текст реплики"
              class="min-w-[200px] flex-1 rounded border border-gray-300 px-2 py-1.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <button
              type="button"
              class="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-700 dark:hover:text-red-400"
              :disabled="messages.length <= 1"
              aria-label="Удалить реплику"
              @click="removeRow(index)"
            >
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <ButtonComponent color="light-border" size="sm" @click="addRow">
            + Добавить реплику
          </ButtonComponent>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2">
        <ButtonComponent color="light-border" @click="close">
          Закрыть
        </ButtonComponent>
        <ButtonComponent color="primary" :disabled="sending" @click="submit">
          {{ sending ? 'Отправка…' : 'Добавить расшифровку' }}
        </ButtonComponent>
      </div>
    </template>
  </ModalComponent>
</template>
