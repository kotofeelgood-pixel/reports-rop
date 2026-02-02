<script setup lang="ts">
import { computed, watch } from 'vue'
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

watch(model, (newVal) => {
  console.log('UserCallsModal open state:', newVal)
  console.log('Props:', props)
})

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
</template>

<style>
.user-calls-modal :deep(.b24-modal__dialog),
.user-calls-modal :deep([class*="modal"]) {
  max-width: 1400px !important;
  width: 95vw !important;
}
</style>
