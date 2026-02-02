<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import ModalComponent from '@/components/modal/ModalComponent.vue'
import ButtonComponent from '@/components/buttons/ButtonComponent.vue'

type Call = {
  id: string
  time: string
  number: string
  type: string
  duration: string
  status: string
  crm: string
  hasRecording: boolean
}

type Props = {
  userName: string
  callType: string
  calls: Call[]
}

const props = defineProps<Props>()
const model = defineModel<boolean>('open', { default: false })

const modalTitle = computed(() => `${props.userName} — ${props.callType}`)

const currentPlayingCall = ref<Call | null>(null)

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
    size="xxl"
    overlay
    modal
    :close="true"
    class="user-calls-modal"
  >
    <template #body>
      <div class="space-y-4">
        <!-- Таблица звонков -->
        <div>
          <table class="w-full text-left text-sm">
            <thead class="bg-[#e0f7fc] text-gray-700 dark:bg-[#1e3a47] dark:text-gray-300">
              <tr>
                <th class="px-4 py-3 font-semibold">ВРЕМЯ</th>
                <th class="px-4 py-3 font-semibold">НОМЕР</th>
                <th class="px-4 py-3 font-semibold">ТИП ЗВОНКА</th>
                <th class="px-4 py-3 font-semibold">ДЛИТЕЛЬНОСТЬ</th>
                <th class="px-4 py-3 font-semibold">СТАТУС</th>
                <th class="px-4 py-3 font-semibold">CRM</th>
                <th class="px-4 py-3 font-semibold">Запись</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="call in calls"
                :key="call.id"
                class="border-t border-gray-100 hover:bg-gray-50/80 dark:border-gray-700 dark:hover:bg-gray-800/50"
              >
                <td class="px-4 py-3 text-gray-700 dark:text-gray-300">{{ call.time }}</td>
                <td class="px-4 py-3 text-gray-700 dark:text-gray-300">{{ call.number }}</td>
                <td class="px-4 py-3 text-gray-700 dark:text-gray-300">{{ call.type }}</td>
                <td class="px-4 py-3 text-gray-700 dark:text-gray-300">{{ call.duration }}</td>
                <td class="px-4 py-3 text-gray-700 dark:text-gray-300">{{ call.status }}</td>
                <td class="px-4 py-3">
                  <span class="text-blue-600 hover:underline dark:text-blue-400">{{ call.crm }}</span>
                </td>
                <td class="px-4 py-3">
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
  </ModalComponent>

  <!-- Аудио-плеер внизу экрана -->
  <Teleport to="body">
    <div
      v-if="currentPlayingCall"
      class="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-300 bg-white shadow-2xl dark:border-gray-700 dark:bg-[#2a2a2a]"
    >
      <div class="mx-auto flex max-w-[1400px] items-center gap-4 px-6 py-4">
        <!-- Информация о звонке -->
        <div class="flex min-w-0 flex-1 items-center gap-4">
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-800 dark:bg-gray-700">
            <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <div class="truncate text-sm font-medium text-gray-900 dark:text-white">
              {{ currentPlayingCall.crm }}
            </div>
            <div class="truncate text-xs text-gray-500 dark:text-gray-400">
              {{ currentPlayingCall.number }} • {{ currentPlayingCall.time }}
            </div>
          </div>
        </div>

        <!-- Управление -->
        <div class="flex flex-1 items-center gap-3">
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

          <button class="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <!-- Прогресс бар -->
        <div class="flex flex-1 items-center gap-3">
          <span class="text-xs text-gray-500 dark:text-gray-400">0:00</span>
          <div class="flex-1">
            <input
              type="range"
              min="0"
              max="100"
              value="0"
              class="h-1 w-full cursor-pointer appearance-none rounded-full bg-gray-300 accent-gray-900 dark:bg-gray-600 dark:accent-white"
            />
          </div>
          <span class="text-xs text-gray-500 dark:text-gray-400">{{ currentPlayingCall.duration }}</span>
        </div>

        <!-- Дополнительные кнопки -->
        <div class="flex shrink-0 items-center gap-2">
          <button class="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <button class="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clip-rule="evenodd" />
            </svg>
          </button>

          <button
            class="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            @click="closePlayer"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style>
.user-calls-modal :deep(.b24-modal__dialog),
.user-calls-modal :deep([class*="modal"]) {
  max-width: 1400px !important;
  width: 95vw !important;
}
</style>
