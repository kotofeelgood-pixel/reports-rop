<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AvatarComponent from '@/components/avatar/AvatarComponent.vue'
import ProgressComponent from '@/components/progress/ProgressComponent.vue'
import UserCallsModal from './UserCallsModal.vue'
import { useReportSettingsStoreRefs } from '@/stores/reportSettings'
import { useUsersStore, useUsersStoreRefs } from '@/stores/users'
import { telephonyCallList, type TelephonyCallRecord } from '@/api/calls'

const { layoutType } = useReportSettingsStoreRefs()
const usersStore = useUsersStore()
const { usersById } = useUsersStoreRefs()

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

const calls = ref<TelephonyCallRecord[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const normalizeUserId = (call: TelephonyCallRecord): string => {
  const id = call.PORTAL_USER_ID ?? call.USER_ID ?? call.RESPONSIBLE_ID ?? call.ASSIGNED_BY_ID
  return String(id ?? '').trim()
}

const normalizeDuration = (call: TelephonyCallRecord): number => {
  const raw = call.CALL_DURATION ?? call.DURATION ?? call.duration ?? 0
  const val = Number(raw)
  return Number.isFinite(val) ? val : 0
}

const isMissedCall = (call: TelephonyCallRecord): boolean => {
  const duration = normalizeDuration(call)
  if (duration <= 0) return true
  if (call.CALL_FAILED_CODE ?? call.call_failed_code) return true
  const statusRaw = String(call.CALL_STATUS ?? call.STATUS ?? call.status ?? '').toLowerCase()
  if (!statusRaw) return false
  return /(missed|no\s*answer|failed|busy|cancel|reject)/i.test(statusRaw)
}

const buildTopList = (predicate: (call: TelephonyCallRecord) => boolean) => {
  const counts = new Map<string, number>()
  for (const call of calls.value) {
    if (!predicate(call)) continue
    const userId = normalizeUserId(call)
    if (!userId) continue
    counts.set(userId, (counts.get(userId) ?? 0) + 1)
  }

  const items = Array.from(counts.entries()).map(([userId, count]) => {
    const user = usersById.value.get(String(userId))
    const name = user?.name ?? `#${userId}`
    return { name, count }
  })

  items.sort((a, b) => b.count - a.count)
  const top = items.slice(0, 5)
  const max = top[0]?.count ?? 1
  return top.map(item => ({ ...item, max }))
}

const isOutgoingCall = (call: TelephonyCallRecord): boolean => {
  const callTypeRaw = call.CALL_TYPE ?? call.callType ?? call.TYPE ?? call.type
  return Number(callTypeRaw) === 1
}

const completedCalls = computed(() =>
  buildTopList(call => isOutgoingCall(call))
)

const missedCalls = computed(() =>
  buildTopList(call => isMissedCall(call))
)

const fetchCalls = async () => {
  isLoading.value = true
  error.value = null
  try {
    const data = await telephonyCallList()
    calls.value = Array.isArray(data) ? data : []
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
    calls.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  void usersStore.fetchUsers()
  void fetchCalls()
})
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

