<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import AvatarComponent from '@/components/avatar/AvatarComponent.vue'
import LinkComponent from '@/components/navigation/link/LinkComponent.vue'
import UserCallsModal from './UserCallsModal.vue'
import SelectComponent from '@/components/select/SelectComponent.vue'
import CalendarComponent from '@/components/element/calendar/CalendarComponent.vue'
import PopoverComponent from '@/components/overlay/popover/PopoverComponent.vue'
import ButtonComponent from '@/components/buttons/ButtonComponent.vue'
import { useTableSort } from '@/composables/useTableSort'
import { useCallsModal } from '@/composables/useCallsModal'
import { useDateRange } from '@/composables/useDateRange'
import { useUsersStore, useUsersStoreRefs } from '@/stores/users'
import { useReportSettingsStoreRefs } from '@/stores/reportSettings'
import { telephonyCallList, type TelephonyCallRecord } from '@/api/calls'

type Row = {
  id: string
  name: string
  outgoing: number
  incoming: number
  missed: number
  processedMissed: number
  duration: string
}

type Totals = {
  outgoing: number
  incoming: number
  missed: number
  processedMissed: number
  duration: string
}

const props = defineProps<{
  rows: Row[]
  totals: Totals
}>()

const usersStore = useUsersStore()
const { users: allUsers, usersById } = useUsersStoreRefs()
const { excludedEmployeeIds } = useReportSettingsStoreRefs()

const calls = ref<TelephonyCallRecord[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const rowsFromCalls = computed<Row[]>(() => {
  if (!calls.value.length) return []
  const excluded = new Set((excludedEmployeeIds.value || []).map(String))
  const map = new Map<string, Row & { _seconds: number }>()
  for (const call of calls.value) {
    const userIdRaw = call.PORTAL_USER_ID ?? call.USER_ID ?? call.RESPONSIBLE_ID ?? call.ASSIGNED_BY_ID
    const userId = String(userIdRaw ?? '').trim()
    if (!userId || excluded.has(userId)) continue

    const callTypeRaw = call.CALL_TYPE ?? call.callType ?? call.TYPE ?? call.type
    const callTypeNum = Number(callTypeRaw)
    const durationRaw = call.CALL_DURATION ?? call.DURATION ?? call.duration ?? 0
    const duration = Number(durationRaw)
    const isMissed = duration <= 0 || Boolean(call.CALL_FAILED_CODE ?? call.call_failed_code)

    const user = usersById.value.get(userId)
    const name = user?.name ?? `#${userId}`

    if (!map.has(userId)) {
      map.set(userId, {
        id: userId,
        name,
        outgoing: 0,
        incoming: 0,
        missed: 0,
        processedMissed: 0,
        duration: '00:00:00',
        _seconds: 0,
      })
    }
    const row = map.get(userId)!
    if (callTypeNum === 1) row.outgoing += 1
    else row.incoming += 1
    if (isMissed) row.missed += 1

    if (Number.isFinite(duration) && duration > 0) {
      row._seconds += duration
    }
  }

  for (const row of map.values()) {
    const total = Math.max(0, row._seconds)
    const h = Math.floor(total / 3600)
    const m = Math.floor((total % 3600) / 60)
    const s = total % 60
    row.duration = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    delete (row as { _seconds?: number })._seconds
  }

  return Array.from(map.values())
})

const totalsFromCalls = computed<Totals>(() => {
  if (!rowsFromCalls.value.length) return props.totals
  const totals = rowsFromCalls.value.reduce((acc, row) => {
    acc.outgoing += row.outgoing
    acc.incoming += row.incoming
    acc.missed += row.missed
    acc.processedMissed += row.processedMissed
    const parts = row.duration.split(':').map(Number)
    const h = parts[0] ?? 0
    const m = parts[1] ?? 0
    const s = parts[2] ?? 0
    acc._seconds += (h * 3600) + (m * 60) + (s || 0)
    return acc
  }, { outgoing: 0, incoming: 0, missed: 0, processedMissed: 0, duration: '00:00:00', _seconds: 0 } as Totals & { _seconds: number })
  const total = Math.max(0, totals._seconds)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  totals.duration = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return totals
})

const computedRows = computed(() => (rowsFromCalls.value.length ? rowsFromCalls.value : props.rows))
const tableTotals = computed(() => (rowsFromCalls.value.length ? totalsFromCalls.value : props.totals))

const { sortBy, sortDir, setSort, sortedRows } = useTableSort(computedRows)

const {
  dateRange,
  dateValue,
  isDatePickerOpen,
  showDatePicker,
  dateRangeOptions,
} = useDateRange()

const selectedUser = ref<string | null>(null)

const dateFormatter = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'medium' })

const formatDate = (value: { day: number; month: number; year: number } | null): string => {
  if (!value) return '—'
  const d = String(value.day).padStart(2, '0')
  const m = String(value.month).padStart(2, '0')
  const y = String(value.year).slice(-2)
  return `${d}.${m}.${y}`
}

const formatDateMedium = (value: { day: number; month: number; year: number } | null): string => {
  if (!value) return '—'
  const date = new Date(value.year, value.month - 1, value.day)
  return dateFormatter.format(date)
}

const startDateDisplay = computed(() => formatDate(dateValue.value.start))
const endDateDisplay = computed(() => formatDate(dateValue.value.end))
const dateRangeDisplay = computed(
  () => `${formatDateMedium(dateValue.value.start)} — ${formatDateMedium(dateValue.value.end)}`
)

type DayCallStats = { outgoing: number; incoming: number; missed: number }
const callsByDate = computed(() => {
  const map = new Map<string, DayCallStats>()
  for (const call of calls.value) {
    const raw = call.CALL_START_DATE ?? call.call_start_date ?? ''
    const dateStr = String(raw).slice(0, 10)
    if (!dateStr || dateStr.length < 10) continue
    if (!map.has(dateStr)) {
      map.set(dateStr, { outgoing: 0, incoming: 0, missed: 0 })
    }
    const stat = map.get(dateStr)!
    const callTypeNum = Number(call.CALL_TYPE ?? call.callType ?? call.TYPE ?? call.type)
    const duration = Number(call.CALL_DURATION ?? call.DURATION ?? call.duration ?? 0)
    const isMissed = duration <= 0 || Boolean(call.CALL_FAILED_CODE ?? call.call_failed_code)
    if (callTypeNum === 1) stat.outgoing += 1
    else stat.incoming += 1
    if (isMissed) stat.missed += 1
  }
  return map
})

const getCallsForDay = (day: { day: number; month: number; year: number }): DayCallStats | null => {
  const key = `${day.year}-${String(day.month).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`
  return callsByDate.value.get(key) ?? null
}

const userOptions = computed(() => {
  const fromStore = (allUsers.value || []).map(u => ({ label: u.name, value: u.id }))
  const fromRows = computedRows.value.map(row => ({ label: row.name, value: row.id }))

  // Если список пользователей уже загрузили — используем его, иначе fallback на строки отчёта
  const items = fromStore.length ? fromStore : fromRows

  const excluded = new Set((excludedEmployeeIds.value || []).map(String))
  const filteredItems = items.filter(i => !excluded.has(String(i.value)))

  return [
    { label: 'Все пользователи', value: null },
    ...filteredItems,
  ]
})

const { isCallsModalOpen, selectedUserName, selectedCallType, selectedCalls, openCallsModal, openTotalsCallsModal } = useCallsModal(computedRows)

const formatB24Date = (d: Date): string => d.toISOString()

const getDateRange = () => {
  const now = new Date()
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
  const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999)
  const startOfWeek = (d: Date) => {
    const day = d.getDay() || 7
    const diff = day - 1
    const out = new Date(d)
    out.setDate(d.getDate() - diff)
    return startOfDay(out)
  }
  const endOfWeek = (d: Date) => {
    const start = startOfWeek(d)
    const out = new Date(start)
    out.setDate(start.getDate() + 6)
    return endOfDay(out)
  }

  switch (dateRange.value) {
    case 'today':
      return { start: startOfDay(now), end: endOfDay(now) }
    case 'yesterday': {
      const d = new Date(now)
      d.setDate(d.getDate() - 1)
      return { start: startOfDay(d), end: endOfDay(d) }
    }
    case 'this_week':
      return { start: startOfWeek(now), end: endOfWeek(now) }
    case 'last_week': {
      const d = new Date(now)
      d.setDate(d.getDate() - 7)
      return { start: startOfWeek(d), end: endOfWeek(d) }
    }
    case 'this_month': {
      const start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0)
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
      return { start, end }
    }
    case 'last_month': {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0)
      const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)
      return { start, end }
    }
    case 'custom': {
      const range = dateValue.value
      if (range?.start && range?.end) {
        const start = new Date(range.start.year, range.start.month - 1, range.start.day, 0, 0, 0, 0)
        const end = new Date(range.end.year, range.end.month - 1, range.end.day, 23, 59, 59, 999)
        return { start, end }
      }
      return null
    }
    default:
      return null
  }
}

const fetchCalls = async () => {
  isLoading.value = true
  error.value = null
  try {
    const range = getDateRange()
    const filter: Record<string, unknown> = {}
    if (selectedUser.value) {
      filter.PORTAL_USER_ID = selectedUser.value
    }
    if (range?.start && range?.end) {
      filter['>=CALL_START_DATE'] = formatB24Date(range.start)
      filter['<=CALL_START_DATE'] = formatB24Date(range.end)
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

watch([dateRange, dateValue, selectedUser], () => {
  void fetchCalls()
}, { deep: true })
</script>

<template>
  <section class="flex min-w-0 flex-1 flex-col rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-[#252525]">
    <h2 class="border-b border-gray-200 bg-white px-4 py-3 text-base font-semibold text-gray-900 dark:border-gray-700 dark:bg-[#252525] dark:text-white">Пользователи</h2>

    <!-- Фильтры -->
    <div class="border-b border-gray-200 px-4 py-4 dark:border-gray-700">
      <div class="flex gap-2">
        <!-- Фильтр по дате -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">Дата</label>
          <div class="flex gap-2">
            <SelectComponent
              v-model="dateRange"
              :items="dateRangeOptions"
              :class="dateRange === 'custom' ? '!w-auto min-w-[200px]' : '!w-full'"
              :style="dateRange === 'custom' ? 'width: auto !important; min-width: 200px;' : 'width: 100% !important;'"
            />
            <PopoverComponent
              v-if="showDatePicker"
              v-model:open="isDatePickerOpen"
              side="bottom"
              align="start"
              class="flex-1"
            >
              <ButtonComponent
                icon="calendar"
                color="light-border"
                size="md"
                class="w-full"
              >
                {{ dateRangeDisplay }}
              </ButtonComponent>
              <template #content>
                <div class="p-4">
                  <CalendarComponent
                    v-model="dateValue"
                    range
                    locale="ru-RU"
                    :number-of-months="2"
                    year-controls
                  >
                    <template #day="{ day }">
                      <div class="flex flex-col items-center gap-0.5">
                        <span>{{ day?.day ?? '' }}</span>
                        <div
                          v-if="day && getCallsForDay(day)"
                          class="flex items-center justify-center gap-0.5"
                        >
                          <span
                            v-if="getCallsForDay(day)!.outgoing > 0"
                            class="size-1.5 rounded-full bg-green-500"
                            :title="`Исходящие: ${getCallsForDay(day)!.outgoing}`"
                          />
                          <span
                            v-if="getCallsForDay(day)!.incoming > 0"
                            class="size-1.5 rounded-full bg-[#2fc6f6]"
                            :title="`Входящие: ${getCallsForDay(day)!.incoming}`"
                          />
                          <span
                            v-if="getCallsForDay(day)!.missed > 0"
                            class="size-1.5 rounded-full bg-red-500"
                            :title="`Пропущенные: ${getCallsForDay(day)!.missed}`"
                          />
                        </div>
                      </div>
                    </template>
                  </CalendarComponent>
                </div>
              </template>
            </PopoverComponent>
          </div>
        </div>

        <!-- Фильтр по пользователям -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">Пользователи</label>
          <SelectComponent
            v-model="selectedUser"
            :items="userOptions"
            placeholder="ОТВЕТСТВЕННЫЙ"
            class="!w-full"
            style="width: 100% !important;"
          />
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-auto">
      <table class="w-full text-left text-sm">
        <thead class="sticky top-0 z-10 bg-[#e0f7fc] text-gray-700 dark:bg-[#1e3a47] dark:text-gray-300">
          <tr>
            <th
              class="cursor-pointer select-none px-4 py-3 font-medium hover:bg-[#bae6fd]/80 dark:hover:bg-[#2a4a5a]"
              role="button"
              tabindex="0"
              @click="setSort('name')"
              @keydown.enter="setSort('name')"
            >
              <span class="inline-flex items-center gap-1 text-xs">
                ОТВЕТСТВЕННЫЙ
                <span v-if="sortBy === 'name'" class="text-gray-900">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
              </span>
            </th>
            <th
              class="cursor-pointer select-none px-4 py-3 font-medium hover:bg-[#bae6fd]/80 dark:hover:bg-[#2a4a5a]"
              role="button"
              tabindex="0"
              @click="setSort('outgoing')"
              @keydown.enter="setSort('outgoing')"
            >
              <span class="inline-flex items-center gap-1 text-xs">
                <span class="inline-block size-3 rounded bg-green-500/80" />
                ИСХ.
                <span v-if="sortBy === 'outgoing'" class="text-gray-900">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
              </span>
            </th>
            <th
              class="cursor-pointer select-none px-4 py-3 font-medium hover:bg-[#bae6fd]/80 dark:hover:bg-[#2a4a5a]"
              role="button"
              tabindex="0"
              @click="setSort('incoming')"
              @keydown.enter="setSort('incoming')"
            >
              <span class="inline-flex items-center gap-1 text-xs">
                <span class="inline-block size-3 rounded bg-[#2fc6f6]/80" />
                ВХОД.
                <span v-if="sortBy === 'incoming'" class="text-gray-900">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
              </span>
            </th>
            <th
              class="cursor-pointer select-none px-4 py-3 font-medium hover:bg-[#bae6fd]/80 dark:hover:bg-[#2a4a5a]"
              role="button"
              tabindex="0"
              @click="setSort('missed')"
              @keydown.enter="setSort('missed')"
            >
              <span class="inline-flex items-center gap-1 text-xs">
                <span class="inline-block size-3 rounded bg-red-500/80" />
                ПР.
                <span v-if="sortBy === 'missed'" class="text-gray-900">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
              </span>
            </th>
            <th
              class="cursor-pointer select-none px-4 py-3 font-medium hover:bg-[#bae6fd]/80 dark:hover:bg-[#2a4a5a]"
              role="button"
              tabindex="0"
              @click="setSort('processedMissed')"
              @keydown.enter="setSort('processedMissed')"
            >
              <span class="inline-flex items-center gap-1 text-xs">
                <span class="inline-block size-3 rounded bg-orange-500/80" />
                ОБ. ПР.
                <span v-if="sortBy === 'processedMissed'" class="text-gray-900">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
              </span>
            </th>
            <th
              class="cursor-pointer select-none px-4 py-3 font-medium hover:bg-[#bae6fd]/80 dark:hover:bg-[#2a4a5a]"
              role="button"
              tabindex="0"
              @click="setSort('duration')"
              @keydown.enter="setSort('duration')"
            >
              <span class="inline-flex items-center gap-1 text-xs">
                ДЛИТЕЛЬНОСТЬ
                <span v-if="sortBy === 'duration'" class="text-gray-900">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in sortedRows"
            :key="row.id"
            class="border-t border-gray-100 hover:bg-gray-50/80 dark:border-gray-700 dark:hover:bg-gray-800/50"
          >
            <td class="px-4 py-2">
              <div class="flex items-center gap-2">
                <AvatarComponent :name="row.name" size="sm" />
                <LinkComponent :to="`#user-${row.id}`" class="text-[#2563eb] hover:underline">
                  {{ row.name }}
                </LinkComponent>
              </div>
            </td>
            <td
              class="cursor-pointer px-4 py-2 font-medium text-green-600 transition-all hover:underline hover:opacity-80 dark:text-green-400"
              @click="openCallsModal(row.id, row.name, 'исходящие')"
            >
              {{ row.outgoing }}
            </td>
            <td
              class="cursor-pointer px-4 py-2 font-medium text-[#2563eb] transition-all hover:underline hover:opacity-80 dark:text-blue-400"
              @click="openCallsModal(row.id, row.name, 'входящие')"
            >
              {{ row.incoming }}
            </td>
            <td
              class="cursor-pointer px-4 py-2 font-medium text-red-600 transition-all hover:underline hover:opacity-80 dark:text-red-400"
              @click="openCallsModal(row.id, row.name, 'пропущенные')"
            >
              {{ row.missed }}
            </td>
            <td
              class="cursor-pointer px-4 py-2 font-medium text-orange-600 transition-all hover:underline hover:opacity-80 dark:text-orange-400"
              @click="openCallsModal(row.id, row.name, 'обработанные пропущенные')"
            >
              {{ row.processedMissed }}
            </td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300">{{ row.duration }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="border-t-2 border-gray-200 bg-[#e0f7fc] font-medium dark:border-gray-600 dark:bg-[#1e3a47]">
            <td class="px-4 py-2 dark:text-gray-300">ИТОГИ:</td>
            <td
              class="cursor-pointer px-4 py-2 text-green-600 transition-all hover:underline hover:opacity-80 dark:text-green-400"
              @click="openTotalsCallsModal('исходящие')"
            >
              {{ tableTotals.outgoing }}
            </td>
            <td
              class="cursor-pointer px-4 py-2 text-[#2563eb] transition-all hover:underline hover:opacity-80 dark:text-blue-400"
              @click="openTotalsCallsModal('входящие')"
            >
              {{ tableTotals.incoming }}
            </td>
            <td
              class="cursor-pointer px-4 py-2 text-red-600 transition-all hover:underline hover:opacity-80 dark:text-red-400"
              @click="openTotalsCallsModal('пропущенные')"
            >
              {{ tableTotals.missed }}
            </td>
            <td
              class="cursor-pointer px-4 py-2 text-orange-600 transition-all hover:underline hover:opacity-80 dark:text-orange-400"
              @click="openTotalsCallsModal('обработанные пропущенные')"
            >
              {{ tableTotals.processedMissed }}
            </td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300">{{ tableTotals.duration }}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <UserCallsModal
      v-model:open="isCallsModalOpen"
      :user-name="selectedUserName"
      :call-type="selectedCallType"
      :calls="selectedCalls"
    />
  </section>
</template>

