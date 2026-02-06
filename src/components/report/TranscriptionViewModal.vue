<script setup lang="ts">
import { ref, watch } from 'vue'
import ModalComponent from '@/components/modal/ModalComponent.vue'
import ButtonComponent from '@/components/buttons/ButtonComponent.vue'
import { telephonyCallGetTranscription, type TranscriptMessageItem } from '@/api/calls'
import type { Call } from '@/tools/calls'

const props = defineProps<{
  open: boolean
  call: Call | null
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'add-transcription'): void
}>()

const model = defineModel<boolean>('open', { default: false })

const loading = ref(false)
const messages = ref<TranscriptMessageItem[]>([])
const error = ref<string | null>(null)

watch(
  () => props.open && props.call,
  async (v) => {
    messages.value = []
    error.value = null
    if (!v || !props.call) return
    const call = props.call
    if (call.transcriptPending === 'Y' || call.transcriptPending === 'y') {
      error.value = 'Расшифровка в обработке. Попробуйте позже.'
      return
    }
    if (!call.transcriptId || String(call.transcriptId).trim() === '') {
      error.value = null
      return
    }
    loading.value = true
    try {
      const result = await telephonyCallGetTranscription(call.id, call.transcriptId)
      messages.value = result.messages ?? []
      if (messages.value.length === 0 && (call.transcriptId ?? '').trim() !== '') {
        error.value = 'Не удалось загрузить расшифровку. Возможно, метод API недоступен.'
      }
    } catch {
      error.value = 'Ошибка при загрузке расшифровки'
    } finally {
      loading.value = false
    }
  },
  { immediate: true }
)

function formatTime(sec: number): string {
  const s = Math.max(0, Math.floor(sec))
  const m = Math.floor(s / 60)
  return `${m}:${String(s % 60).padStart(2, '0')}`
}

function close() {
  model.value = false
  emit('update:open', false)
}

function openAddTranscription() {
  model.value = false
  emit('add-transcription')
}

const callLabel = () => (props.call ? `${props.call.time} — ${props.call.number}` : '')
const hasMessages = () => messages.value.length > 0 && messages.value.some(m => (m.MESSAGE ?? '').trim() !== '')
</script>

<template>
  <ModalComponent
    v-model:open="model"
    :title="`Расшифровка: ${callLabel()}`"
    overlay
    modal
    :close="true"
  >
    <template #body>
      <div class="space-y-4">
        <div v-if="loading" class="py-8 text-center text-gray-500 dark:text-gray-400">
          Загрузка расшифровки…
        </div>
        <template v-else>
          <div v-if="error" class="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
            {{ error }}
          </div>
          <div v-else-if="hasMessages()" class="space-y-3">
            <div
              v-for="(msg, idx) in messages"
              :key="idx"
              class="rounded-lg border border-gray-200 p-3 dark:border-gray-700"
              :class="msg.SIDE === 'Client' ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'"
            >
              <div class="mb-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span class="font-medium">{{ msg.SIDE === 'Client' ? 'Клиент' : 'Сотрудник' }}</span>
                <span v-if="msg.START_TIME != null || msg.STOP_TIME != null">
                  {{ formatTime(msg.START_TIME ?? 0) }} – {{ formatTime(msg.STOP_TIME ?? 0) }}
                </span>
              </div>
              <p class="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">{{ msg.MESSAGE ?? '' }}</p>
            </div>
          </div>
          <div v-else class="rounded-lg border border-dashed border-gray-300 bg-gray-50/50 py-8 text-center text-gray-500 dark:border-gray-600 dark:bg-gray-800/30 dark:text-gray-400">
            Расшифровка отсутствует.
            <div class="mt-3">
              <ButtonComponent color="light-border" size="sm" @click="openAddTranscription">
                Добавить расшифровку
              </ButtonComponent>
            </div>
          </div>
        </template>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end">
        <ButtonComponent color="light-border" @click="close">
          Закрыть
        </ButtonComponent>
      </div>
    </template>
  </ModalComponent>
</template>
