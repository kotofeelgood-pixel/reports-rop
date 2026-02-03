<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import ModalComponent from '@/components/modal/ModalComponent.vue'
import ButtonComponent from '@/components/buttons/ButtonComponent.vue'
import type { Call } from '@/tools/calls'

type Props = {
  userName: string
  callType: string
  calls: Call[]
}

const props = defineProps<Props>()
const model = defineModel<boolean>('open', { default: false })

const modalTitle = computed(() => `${props.userName} — ${props.callType}`)

const currentPlayingCall = ref<Call | null>(null)

const modalBodyClass = computed(() => ({
  body: currentPlayingCall.value ? 'pb-40' : ''
}))

watch(model, (newVal) => {
  // Сбросить плеер при закрытии модалки
  if (!newVal) {
    currentPlayingCall.value = null
  }
})

const playRecording = (call: Call) => {
  currentPlayingCall.value = call
}

const closePlayer = () => {
  console.log('Closing player')
  currentPlayingCall.value = null
}

const exportToExcel = () => {
  console.log('Экспорт в Excel')
}
</script>

<template>
  <ModalComponent
    v-model:open="model"
    :title="modalTitle"
    fullscreen
    overlay
    modal
    :close="true"
    :b24ui="modalBodyClass"
  >
    <template #body>
      <div class="space-y-4">
        <!-- Таблица звонков -->
        <div>
          <table class="w-full text-left text-base">
            <thead class="bg-[#e0f7fc] text-gray-700 dark:bg-[#1e3a47] dark:text-gray-300">
              <tr>
                <th class="px-4 py-4 font-semibold">ВРЕМЯ</th>
                <th class="px-4 py-4 font-semibold">НОМЕР</th>
                <th class="px-4 py-4 font-semibold">ТИП</th>
                <th class="px-4 py-4 font-semibold">ДЛИТ.</th>
                <th class="px-4 py-4 font-semibold">CRM</th>
                <th class="px-4 py-4 text-center font-semibold">Запись</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="call in calls"
                :key="call.id"
                class="border-t border-gray-100 hover:bg-gray-50/80 dark:border-gray-700 dark:hover:bg-gray-800/50"
              >
                <td class="px-4 py-4 text-gray-700 dark:text-gray-300">{{ call.time }}</td>
                <td class="px-4 py-4 text-gray-700 dark:text-gray-300">{{ call.number }}</td>
                <td class="px-4 py-4 text-gray-700 dark:text-gray-300">{{ call.type }}</td>
                <td class="px-4 py-4 text-gray-700 dark:text-gray-300">{{ call.duration }}</td>
                <td class="px-4 py-4">
                  <span class="text-blue-600 hover:underline dark:text-blue-400">{{ call.crm }}</span>
                </td>
                <td class="px-4 py-4 text-center">
                  <button
                    v-if="call.hasRecording"
                    class="text-blue-600 hover:underline dark:text-blue-400"
                    @click="playRecording(call)"
                  >
                    Прослушать
                  </button>
                  <span v-else class="text-gray-400">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Кнопка экспорта -->
        <div class="flex justify-start">
          <ButtonComponent
            color="light-border"
            size="md"
            @click="exportToExcel"
          >
            XLSX
          </ButtonComponent>
        </div>
      </div>
    </template>

    <!-- Аудио-плеер внутри модалки, но с position: fixed -->
    <template v-if="currentPlayingCall" #footer>
      <div
        class="audio-player-fixed fixed bottom-0 left-0 right-0 border-t border-gray-300 bg-white shadow-2xl dark:border-gray-700 dark:bg-[#2a2a2a]"
        style="z-index: 999999 !important; position: fixed !important;"
      >
      <div class="flex w-full items-center gap-4 px-6 py-4">
        <!-- Информация о звонке -->
        <div class="flex w-48 shrink-0 items-center gap-3">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-800 dark:bg-gray-700">
            <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <div class="truncate text-sm font-medium text-gray-900 dark:text-white">
              {{ currentPlayingCall.crm }}
            </div>
            <div class="truncate text-xs text-gray-500 dark:text-gray-400">
              {{ currentPlayingCall.number }}
            </div>
          </div>
        </div>

        <!-- Управление -->
        <div class="flex shrink-0 items-center gap-2">
          <button class="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
            </svg>
          </button>

          <button class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
            </svg>
          </button>

          <button class="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
            </svg>
          </button>
        </div>

        <!-- Прогресс бар -->
        <div class="flex min-w-0 flex-1 items-center gap-3">
          <span class="shrink-0 text-xs text-gray-500 dark:text-gray-400">0:00</span>
          <div class="min-w-0 flex-1">
            <input
              type="range"
              min="0"
              max="100"
              value="0"
              class="h-1 w-full cursor-pointer appearance-none rounded-full bg-gray-300 accent-gray-900 dark:bg-gray-600 dark:accent-white"
            />
          </div>
          <span class="shrink-0 text-xs text-gray-500 dark:text-gray-400">{{ currentPlayingCall.duration }}</span>
        </div>

        <!-- Кнопка закрыть -->
        <button
          type="button"
          class="shrink-0 rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          @click.stop="closePlayer"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
        </div>
      </div>
    </template>
  </ModalComponent>
</template>

<style scoped>
/* Гарантируем, что плеер всегда поверх модалки */
:deep([style*="z-index: 999999"]) {
  z-index: 999999 !important;
}
</style>

