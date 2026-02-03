<script setup lang="ts">
import { ref } from 'vue'
import AvatarComponent from '@/components/avatar/AvatarComponent.vue'
import ProgressComponent from '@/components/progress/ProgressComponent.vue'
import UserCallsModal from './UserCallsModal.vue'
import { useReportSettingsStoreRefs } from '@/stores/reportSettings'

const { layoutType } = useReportSettingsStoreRefs()

type Call = {
  id: string
  userId: string
  time: string
  number: string
  type: string
  duration: string
  status: string
  crm: string
  hasRecording: boolean
}

const isCallsModalOpen = ref(false)
const selectedUserName = ref('')
const selectedCallType = ref('')
const selectedCalls = ref<Call[]>([])

function openCallsModal(userName: string, callType: string) {
  selectedUserName.value = userName
  selectedCallType.value = callType
  // Тестовые данные
  selectedCalls.value = [
    {
      id: '1',
      userId: userName,
      time: '09:15:32',
      number: '79161234567',
      type: 'Исходящий',
      duration: '00:03:45',
      status: 'Завершен',
      crm: 'Иван Петров',
      hasRecording: true,
    },
    {
      id: '2',
      userId: userName,
      time: '10:22:18',
      number: '79267894561',
      type: 'Входящий',
      duration: '00:05:12',
      status: 'Завершен',
      crm: 'Мария Сидорова',
      hasRecording: true,
    },
    {
      id: '3',
      userId: userName,
      time: '11:20:19',
      number: '79640774400',
      type: 'Исходящий',
      duration: '00:00:00',
      status: 'Вызов отменен',
      crm: 'Евгений',
      hasRecording: false,
    },
    {
      id: '4',
      userId: userName,
      time: '12:45:08',
      number: '79151239876',
      type: 'Входящий',
      duration: '00:02:33',
      status: 'Завершен',
      crm: 'Алексей Козлов',
      hasRecording: true,
    },
    {
      id: '5',
      userId: userName,
      time: '13:10:55',
      number: '79039876543',
      type: 'Пропущенный',
      duration: '00:00:00',
      status: 'Не отвечен',
      crm: 'Ольга Смирнова',
      hasRecording: false,
    },
    {
      id: '6',
      userId: userName,
      time: '14:33:21',
      number: '79267771234',
      type: 'Исходящий',
      duration: '00:01:15',
      status: 'Завершен',
      crm: 'Дмитрий Волков',
      hasRecording: true,
    },
    {
      id: '7',
      userId: userName,
      time: '15:52:44',
      number: '79121234567',
      type: 'Входящий',
      duration: '00:04:28',
      status: 'Завершен',
      crm: 'Елена Новикова',
      hasRecording: true,
    },
  ]
  isCallsModalOpen.value = true
}

const completedCalls = [
  { name: 'Кудрявцев Арсений', count: 26, max: 26 },
  { name: 'Петрова Евгения', count: 13, max: 26 },
  { name: 'Попова София', count: 8, max: 26 },
  { name: 'Семенова Анастасия', count: 7, max: 26 },
  { name: 'Лебедева Мария', count: 6, max: 26 },
]

const missedCalls = [
  { name: 'Лебедева Мария', count: 11, max: 11 },
  { name: 'Семенова Анастасия', count: 6, max: 11 },
  { name: 'Кудрявцев Арсений', count: 3, max: 11 },
  { name: 'Попова София', count: 2, max: 11 },
]
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-[#252525]">
    <h2 class="text-base font-semibold text-gray-900 dark:text-white">Рейтинг сотрудников</h2>
    <div :class="layoutType === 'rows' ? 'flex flex-col gap-4' : 'grid grid-cols-2 gap-4'">
      <div class="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-2 bg-[#2fc6f6] px-3 py-2">
          <span class="text-xs font-semibold uppercase tracking-wide text-white">Совершенные звонки</span>
          <span class="flex size-5 shrink-0 items-center justify-center rounded-full border border-white/80 bg-transparent text-[10px] text-white" aria-hidden="true">?</span>
        </div>
        <ul class="space-y-2 p-2">
          <li
            v-for="item in completedCalls"
            :key="item.name"
            class="flex cursor-pointer items-center justify-between gap-2 rounded-lg bg-gray-100 px-2 py-2 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            @click="openCallsModal(item.name, 'совершенные звонки')"
          >
            <div class="flex min-w-0 items-center gap-2">
              <AvatarComponent :name="item.name" size="sm" />
              <span class="min-w-0 truncate text-sm text-gray-900 dark:text-white">{{ item.name }}</span>
            </div>
            <div class="flex shrink-0 items-center gap-2">
              <div class="w-[100px]">
                <ProgressComponent
                  :model-value="item.count"
                  :max="item.max"
                  color="air-primary-success"
                  size="sm"
                  class="w-full"
                />
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ item.count }}</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="bg-[#2fc6f6] px-3 py-2">
          <span class="text-xs font-semibold uppercase tracking-wide text-white">Пропущенные</span>
        </div>
        <ul class="space-y-2 p-2">
          <li
            v-for="item in missedCalls"
            :key="item.name"
            class="flex cursor-pointer items-center justify-between gap-2 rounded-lg bg-gray-100 px-2 py-2 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            @click="openCallsModal(item.name, 'пропущенные')"
          >
            <div class="flex min-w-0 items-center gap-2">
              <AvatarComponent :name="item.name" size="sm" />
              <span class="min-w-0 truncate text-sm text-gray-900 dark:text-white">{{ item.name }}</span>
            </div>
            <div class="flex shrink-0 items-center gap-2">
              <div class="w-[100px]">
                <ProgressComponent
                  :model-value="item.count"
                  :max="item.max"
                  color="air-primary-alert"
                  size="sm"
                  class="w-full"
                />
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ item.count }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <UserCallsModal
      v-model:open="isCallsModalOpen"
      :user-name="selectedUserName"
      :call-type="selectedCallType"
      :calls="selectedCalls"
    />
  </div>
</template>

