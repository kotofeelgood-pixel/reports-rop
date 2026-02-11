<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import AvatarComponent from '@/components/avatar/AvatarComponent.vue'
import ProgressComponent from '@/components/progress/ProgressComponent.vue'
import UserCallsModal from './UserCallsModal.vue'
import { useReportSettingsStoreRefs } from '@/stores/reportSettings'
import { useUsersStore, useUsersStoreRefs } from '@/stores/users'
import { useDateRange } from '@/composables/useDateRange'
import { useCallsModal } from '@/composables/useCallsModal'
import { telephonyCallList, type TelephonyCallRecord, isMissedCall as isMissedCallRecord } from '@/api/calls'

const { layoutType, minCallDurationSeconds } = useReportSettingsStoreRefs()
const usersStore = useUsersStore()
const { usersById } = useUsersStoreRefs()
const { dateRange, dateValue, getDateRange, formatB24DateFilter } = useDateRange()

const calls = ref<TelephonyCallRecord[]>([])
const { isCallsModalOpen, selectedUserName, selectedCallType, selectedCalls, selectedDateRange, crmNames, openCallsModal, openTotalsCallsModal } = useCallsModal(calls, usersById)

const currentDateRange = computed(() => getDateRange())

function openRatingCallsModal(userId: string, userName: string, callTypeLabel: string) {
  const callType = callTypeLabel === 'совершенные звонки' ? 'исходящие' : 'пропущенные'
  openCallsModal(userId, userName, callType, currentDateRange.value)
}

function openRatingTotalsModal(callTypeLabel: string) {
  const callType = callTypeLabel === 'совершенные звонки' ? 'исходящие' : 'пропущенные'
  openTotalsCallsModal(callType, currentDateRange.value)
}

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
  // Пропущенный — только входящий звонок, на который не ответили
  if (isOutgoingCall(call)) return false
  const duration = normalizeDuration(call)
  if (duration <= 0) return true
  if (isMissedCallRecord(call)) return true
  const statusRaw = String(call.CALL_STATUS ?? call.STATUS ?? call.status ?? '').toLowerCase()
  if (!statusRaw) return false
  return /(missed|no\s*answer|failed|busy|cancel|reject)/i.test(statusRaw)
}

const buildTopList = (predicate: (call: TelephonyCallRecord) => boolean) => {
  const counts = new Map<string, number>()
  const minDuration = Number(minCallDurationSeconds.value) || 0
  for (const call of calls.value) {
    const duration = normalizeDuration(call)
    if (duration < minDuration) continue
    if (!predicate(call)) continue
    const userId = normalizeUserId(call)
    if (!userId) continue
    counts.set(userId, (counts.get(userId) ?? 0) + 1)
  }

  const items = Array.from(counts.entries()).map(([userId, count]) => {
    const user = usersById.value.get(String(userId))
    const name = user?.name ?? `#${userId}`
    const photo = user?.photo ?? null
    return { userId: String(userId), name, photo, count }
  })

  items.sort((a, b) => b.count - a.count)
  const top = items.slice(0, 5)
  const max = top[0]?.count ?? 1
  return top.map(item => ({ ...item, max }))
}

import { isOutgoingCallType, isIncomingCallType } from '@/api/calls'

const isOutgoingCall = (call: TelephonyCallRecord): boolean => {
  const callTypeRaw = call.CALL_TYPE ?? call.callType ?? call.TYPE ?? call.type
  return isOutgoingCallType(callTypeRaw)
}

const completedCalls = computed(() =>
  buildTopList(call => isOutgoingCall(call))
)

const missedCalls = computed(() =>
  buildTopList(call => isMissedCall(call))
)

const hasRatingData = computed(
  () => completedCalls.value.length > 0 || missedCalls.value.length > 0
)

const fetchCalls = async () => {
  const range = getDateRange()
  if (!range?.start || !range?.end) {
    calls.value = []
    return
  }
  isLoading.value = true
  error.value = null
  try {
    const filter: Record<string, unknown> = {
      '>=CALL_START_DATE': formatB24DateFilter(range.start, 'start'),
      '<=CALL_START_DATE': formatB24DateFilter(range.end, 'end'),
    }
    const data = await telephonyCallList({ filter, sort: 'CALL_START_DATE', order: 'DESC' })
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

watch([dateRange, dateValue], () => {
  void fetchCalls()
}, { deep: true })
</script>

<template>
  <div
    v-if="hasRatingData"
    class="flex flex-1 flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-[#252525]"
  >
    <h2 class="text-base font-semibold text-gray-900 dark:text-white">Рейтинг сотрудников</h2>
    <div :class="layoutType === 'rows' ? 'flex flex-col gap-4' : 'grid grid-cols-2 gap-4'">
      <div class="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-2 bg-[#2fc6f6] px-3 py-2">
          <span class="text-xs font-semibold uppercase tracking-wide text-white">Совершенные звонки</span>
        </div>
        <ul class="space-y-2 p-2">
          <li
            v-for="item in completedCalls"
            :key="item.userId"
            class="flex cursor-pointer items-center justify-between gap-2 rounded-lg bg-gray-100 px-2 py-2 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            @click="openRatingCallsModal(item.userId, item.name, 'совершенные звонки')"
          >
            <div class="flex min-w-0 items-center gap-2">
              <AvatarComponent :name="item.name" :src="item.photo ?? undefined" size="sm" />
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
            :key="item.userId"
            class="flex cursor-pointer items-center justify-between gap-2 rounded-lg bg-gray-100 px-2 py-2 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            @click="openRatingCallsModal(item.userId, item.name, 'пропущенные')"
          >
            <div class="flex min-w-0 items-center gap-2">
              <AvatarComponent :name="item.name" :src="item.photo ?? undefined" size="sm" />
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
      v-if="isCallsModalOpen"
      v-model:open="isCallsModalOpen"
      :user-name="selectedUserName"
      :call-type="selectedCallType"
      :calls="selectedCalls"
      :crm-names="crmNames"
      :date-range="selectedDateRange"
    />
  </div>
</template>

