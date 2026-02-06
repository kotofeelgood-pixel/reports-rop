<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import AvatarComponent from '@/components/avatar/AvatarComponent.vue'
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
import { telephonyCallList, type TelephonyCallRecord, isOutgoingCallType, isIncomingCallType, isMissedCall } from '@/api/calls'
import { getUserProfileUrl } from '@/tools'

type Row = {
  id: string
  name: string
  photo?: string | null
  outgoing: number
  incoming: number
  missed: number
  duration: string
}

type Totals = {
  outgoing: number
  incoming: number
  missed: number
  duration: string
}

const props = withDefaults(
  defineProps<{
    rows?: Row[]
    totals?: Totals
  }>(),
  {
    rows: () => [],
    totals: () => ({ outgoing: 0, incoming: 0, missed: 0, duration: '00:00:00' }),
  }
)

const usersStore = useUsersStore()
const { users: allUsers, usersById } = useUsersStoreRefs()
const { excludedEmployeeIds, minCallDurationSeconds } = useReportSettingsStoreRefs()

const calls = ref<TelephonyCallRecord[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const rowsFromCalls = computed<Row[]>(() => {
  if (!calls.value.length) return []
  const excluded = new Set((excludedEmployeeIds.value || []).map(String))
  const minDuration = Number(minCallDurationSeconds.value) || 0
  const map = new Map<string, Row & { _seconds: number }>()
  for (const call of calls.value) {
    const durationRaw = call.CALL_DURATION ?? call.DURATION ?? call.duration ?? 0
    const duration = Number(durationRaw)
    if (duration < minDuration) continue

    const userIdRaw = call.PORTAL_USER_ID ?? call.USER_ID ?? call.RESPONSIBLE_ID ?? call.ASSIGNED_BY_ID
    const userId = String(userIdRaw ?? '').trim()
    if (!userId || excluded.has(userId)) continue

    const callTypeRaw = call.CALL_TYPE ?? call.callType ?? call.TYPE ?? call.type
    const isMissed = isMissedCall(call)

    const user = usersById.value.get(userId)
    const name = user?.name ?? `#${userId}`
    const photo = user?.photo ?? null

    if (!map.has(userId)) {
      map.set(userId, {
        id: userId,
        name,
        photo,
        outgoing: 0,
        incoming: 0,
        missed: 0,
        duration: '00:00:00',
        _seconds: 0,
      })
    }
    const row = map.get(userId)!
    if (isOutgoingCallType(callTypeRaw)) {
      row.outgoing += 1
    } else if (isIncomingCallType(callTypeRaw)) {
      row.incoming += 1
      if (isMissed) row.missed += 1
    }
    // Если CALL_TYPE не распознан (не 1,2,3,4), пропускаем или обрабатываем как входящий

    if (Number.isFinite(duration) && duration > 0) {
      row._seconds += duration
    }
  }

  for (const row of Array.from(map.values())) {
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
  if (!rowsFromCalls.value.length) return props.totals ?? { outgoing: 0, incoming: 0, missed: 0, duration: '00:00:00' }
  const totals = rowsFromCalls.value.reduce((acc, row) => {
    acc.outgoing += row.outgoing
    acc.incoming += row.incoming
    acc.missed += row.missed
    const parts = row.duration.split(':').map(Number)
    const h = parts[0] ?? 0
    const m = parts[1] ?? 0
    const s = parts[2] ?? 0
    acc._seconds += (h * 3600) + (m * 60) + (s || 0)
    return acc
  }, { outgoing: 0, incoming: 0, missed: 0, duration: '00:00:00', _seconds: 0 } as Totals & { _seconds: number })
  const total = Math.max(0, totals._seconds)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  totals.duration = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return totals
})

// Всегда показываем результат запроса по выбранному периоду; при отсутствии данных — пустая таблица
const computedRows = computed(() => rowsFromCalls.value)
const tableTotals = computed((): Totals =>
  rowsFromCalls.value.length ? totalsFromCalls.value : { outgoing: 0, incoming: 0, missed: 0, duration: '00:00:00' }
)

const { sortBy, sortDir, setSort, sortedRows } = useTableSort(computedRows)

const {
  dateRange,
  dateValue,
  isDatePickerOpen,
  showDatePicker,
  dateRangeOptions,
  formatB24DateFilter,
  getDateRange,
} = useDateRange()

const selectedUsers = ref<string[]>([])

const dateFormatter = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'medium' })

const formatDateMedium = (value: { day: number; month: number; year: number } | null): string => {
  if (!value) return '—'
  const date = new Date(value.year, value.month - 1, value.day)
  return dateFormatter.format(date)
}

const dateRangeDisplay = computed(
  () => `${formatDateMedium(dateValue.value.start)} — ${formatDateMedium(dateValue.value.end)}`
)

type DayCallStats = { outgoing: number; incoming: number; missed: number }
const callsByDate = computed(() => {
  const map = new Map<string, DayCallStats>()
  const minDuration = Number(minCallDurationSeconds.value) || 0
  for (const call of calls.value) {
    const duration = Number(call.CALL_DURATION ?? call.DURATION ?? call.duration ?? 0)
    if (duration < minDuration) continue
    const raw = call.CALL_START_DATE ?? call.call_start_date ?? ''
    const dateStr = String(raw).slice(0, 10)
    if (!dateStr || dateStr.length < 10) continue
    if (!map.has(dateStr)) {
      map.set(dateStr, { outgoing: 0, incoming: 0, missed: 0 })
    }
    const stat = map.get(dateStr)!
    const callTypeRaw = call.CALL_TYPE ?? call.callType ?? call.TYPE ?? call.type
    const isMissed = isMissedCall(call)
    if (isOutgoingCallType(callTypeRaw)) {
      stat.outgoing += 1
    } else if (isIncomingCallType(callTypeRaw)) {
      stat.incoming += 1
      if (isMissed) stat.missed += 1
    }
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

  return filteredItems
})

const { isCallsModalOpen, selectedUserName, selectedCallType, selectedCalls, crmNames, openCallsModal, openTotalsCallsModal } = useCallsModal(calls, usersById)

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
    if (selectedUsers.value.length > 0) {
      // Для мультивыбора в Bitrix24 используется оператор @ перед полем
      // Если выбран один пользователь, используем обычный фильтр, иначе @ для мультивыбора
      if (selectedUsers.value.length === 1) {
        filter.PORTAL_USER_ID = selectedUsers.value[0]
      } else {
        filter['@PORTAL_USER_ID'] = selectedUsers.value
      }
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

watch([dateRange, dateValue, selectedUsers], () => {
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
        <div class="space-y-1.5">
          <label class="block text-xs font-medium text-gray-800 dark:text-gray-200">Дата</label>
          <div class="flex gap-2">
            <SelectComponent
              v-model="dateRange"
              :items="dateRangeOptions"
              :class="[dateRange === 'custom' ? '!w-auto min-w-[200px]' : '!w-full', 'text-xs']"
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
                color="light-border"
                size="md"
                class="w-full text-xs"
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
        <div class="space-y-1.5">
          <label class="block text-xs font-medium text-gray-800 dark:text-gray-200">Пользователи</label>
          <SelectComponent
            v-model="selectedUsers"
            :items="userOptions"
            multiple
            placeholder="Все пользователи"
            class="!w-full text-xs"
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
                <AvatarComponent
                  :name="row.name"
                  :src="row.photo ?? undefined"
                  :userId="row.id"
                  size="sm"
                />
                <a
                  :href="getUserProfileUrl(row.id)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[#2563eb] hover:underline"
                >
                  {{ row.name }}
                </a>
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
      :crm-names="crmNames"
    />
  </section>
</template>

