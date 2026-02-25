<script setup lang="ts">
import { computed, h, onMounted, ref, resolveComponent, watch } from 'vue'
import type { TableColumn } from '@bitrix24/b24ui-nuxt'
import UserCallsModal from './UserCallsModal.vue'
import SelectComponent from '@/components/select/SelectComponent.vue'
import CalendarComponent from '@/components/element/calendar/CalendarComponent.vue'
import PopoverComponent from '@/components/overlay/popover/PopoverComponent.vue'
import ButtonComponent from '@/components/buttons/ButtonComponent.vue'
import { useCallsModal } from '@/composables/useCallsModal'
import { useDateRange } from '@/composables/useDateRange'
import { useUsersStore, useUsersStoreRefs } from '@/stores/users'
import { useReportSettingsStoreRefs } from '@/stores/reportSettings'
import {
  type TelephonyCallRecord,
  isOutgoingCallType,
  isIncomingCallType,
  isCallbackCallType,
  isMissedCall,
} from '@/api/calls'
import { getUserProfilePath, openInB24 } from '@/tools'

type Row = {
  id: string
  name: string
  photo?: string | null
  outgoing: number
  incoming: number
  missed: number
  callback: number
  duration: string
}

type Totals = {
  outgoing: number
  incoming: number
  missed: number
  callback: number
  duration: string
}

const props = withDefaults(
  defineProps<{
    rows?: Row[]
    totals?: Totals
    calls?: TelephonyCallRecord[]
  }>(),
  {
    rows: () => [],
    totals: () => ({ outgoing: 0, incoming: 0, missed: 0, callback: 0, duration: '00:00:00' }),
    calls: () => [],
  },
)

const usersStore = useUsersStore()
const { users: allUsers, usersById } = useUsersStoreRefs()
const { excludedEmployeeIds, minCallDurationSeconds } = useReportSettingsStoreRefs()

const calls = ref<TelephonyCallRecord[]>([])

watch(
  () => props.calls,
  (value) => {
    calls.value = Array.isArray(value) ? value : []
  },
  { immediate: true, deep: true },
)

const rowsFromCalls = computed<Row[]>(() => {
  if (!calls.value.length) return []
  const excluded = new Set((excludedEmployeeIds.value || []).map(String))
  const minDuration = Number(minCallDurationSeconds.value) || 0
  const map = new Map<string, Row & { _seconds: number }>()
  for (const call of calls.value) {
    const durationRaw = call.CALL_DURATION ?? call.DURATION ?? call.duration ?? 0
    const duration = Number(durationRaw)
    if (duration < minDuration) continue

    const userIdRaw =
      call.PORTAL_USER_ID ?? call.USER_ID ?? call.RESPONSIBLE_ID ?? call.ASSIGNED_BY_ID
    const userId = String(userIdRaw ?? '').trim()
    if (!userId || excluded.has(userId)) continue

    const callTypeRaw = call.CALL_TYPE ?? call.callType ?? call.TYPE ?? call.type
    const isMissed = isMissedCall(call)
    const failedCode = String(call.CALL_FAILED_CODE ?? call.call_failed_code ?? '').trim()
    const is304 = failedCode === '304'

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
        callback: 0,
        duration: '00:00:00',
        _seconds: 0,
      })
    }
    const row = map.get(userId)!
    if (isOutgoingCallType(callTypeRaw)) {
      row.outgoing += 1
    } else if (isIncomingCallType(callTypeRaw) && !is304) {
      row.incoming += 1
    } else if (isCallbackCallType(callTypeRaw) && !is304) {
      row.callback += 1
    }
    if (isMissed) {
      row.missed += 1
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
  if (!rowsFromCalls.value.length) {
    return (
      props.totals ?? {
        outgoing: 0,
        incoming: 0,
        missed: 0,
        callback: 0,
        duration: '00:00:00',
      }
    )
  }
  const totals = rowsFromCalls.value.reduce(
    (acc, row) => {
      acc.outgoing += row.outgoing
      acc.incoming += row.incoming
      acc.missed += row.missed
      acc.callback += row.callback
      const parts = row.duration.split(':').map(Number)
      const h = parts[0] ?? 0
      const m = parts[1] ?? 0
      const s = parts[2] ?? 0
      acc._seconds += h * 3600 + m * 60 + (s || 0)
      return acc
    },
    {
      outgoing: 0,
      incoming: 0,
      missed: 0,
      callback: 0,
      duration: '00:00:00',
      _seconds: 0,
    } as Totals & {
      _seconds: number
    },
  )
  const total = Math.max(0, totals._seconds)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  totals.duration = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return totals
})

// Всегда показываем результат запроса по выбранному периоду; при отсутствии данных — пустая таблица
const computedRows = computed(() => rowsFromCalls.value)
const tableTotals = computed(
  (): Totals =>
    rowsFromCalls.value.length
      ? totalsFromCalls.value
      : { outgoing: 0, incoming: 0, missed: 0, callback: 0, duration: '00:00:00' },
)

const data = computed(() => computedRows.value)

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
  () => `${formatDateMedium(dateValue.value.start)} — ${formatDateMedium(dateValue.value.end)}`,
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
    const failedCode = String(call.CALL_FAILED_CODE ?? call.call_failed_code ?? '').trim()
    const is304 = failedCode === '304'
    if (isOutgoingCallType(callTypeRaw)) {
      stat.outgoing += 1
    } else if (isIncomingCallType(callTypeRaw) && !is304) {
      stat.incoming += 1
    }
    if (isMissed) {
      stat.missed += 1
    }
  }
  return map
})

const getCallsForDay = (day: { day: number; month: number; year: number }): DayCallStats | null => {
  const key = `${day.year}-${String(day.month).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`
  return callsByDate.value.get(key) ?? null
}

const userOptions = computed(() => {
  const fromStore = (allUsers.value || []).map((u) => ({ label: u.name, value: u.id }))
  const fromRows = computedRows.value.map((row) => ({ label: row.name, value: row.id }))

  // Если список пользователей уже загрузили — используем его, иначе fallback на строки отчёта
  const items = fromStore.length ? fromStore : fromRows

  const excluded = new Set((excludedEmployeeIds.value || []).map(String))
  const filteredItems = items.filter((i) => !excluded.has(String(i.value)))

  return filteredItems
})

const {
  isCallsModalOpen,
  selectedUserName,
  selectedCallType,
  selectedCalls,
  selectedDateRange,
  crmNames,
  openCallsModal,
  openTotalsCallsModal,
} = useCallsModal(calls, usersById)

const currentDateRange = computed(() => getDateRange())

const B24Avatar = resolveComponent('B24Avatar')

const columns: TableColumn<Row>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Имя',
    cell: ({ row }) => {
      const original = row.original as Row

      return h('div', { class: 'flex items-center gap-2' }, [
        h(B24Avatar as any, {
          src: original.photo ?? undefined,
          size: 'sm',
        }),
        h(
          'button',
          {
            type: 'button',
            class:
              'text-[#2563eb] hover:underline text-left bg-transparent border-0 cursor-pointer p-0 font-inherit',
            onClick: () => openInB24(getUserProfilePath(original.id)),
          },
          original.name,
        ),
      ])
    },
  },
  {
    accessorKey: 'outgoing',
    header: 'Исх.',
    cell: ({ row }) => {
      const original = row.original as Row

      return h(
        'button',
        {
          type: 'button',
          class:
            'cursor-pointer font-medium text-green-600 transition-all hover:underline hover:opacity-80 dark:text-green-400 bg-transparent border-0 p-0',
          onClick: () =>
            openCallsModal(original.id, original.name, 'исходящие', currentDateRange.value),
        },
        String(row.getValue('outgoing') ?? 0),
      )
    },
    footer: () =>
      h(
        'button',
        {
          type: 'button',
          class:
            'cursor-pointer text-green-600 transition-all hover:underline hover:opacity-80 dark:text-green-400 bg-transparent border-0 p-0',
          onClick: () => openTotalsCallsModal('исходящие', currentDateRange.value),
        },
        String(tableTotals.value.outgoing),
      ),
  },
  {
    accessorKey: 'incoming',
    header: 'Вх.',
    cell: ({ row }) => {
      const original = row.original as Row

      return h(
        'button',
        {
          type: 'button',
          class:
            'cursor-pointer font-medium text-[#2563eb] transition-all hover:underline hover:opacity-80 dark:text-blue-400 bg-transparent border-0 p-0',
          onClick: () =>
            openCallsModal(original.id, original.name, 'входящие', currentDateRange.value),
        },
        String(row.getValue('incoming') ?? 0),
      )
    },
    footer: () =>
      h(
        'button',
        {
          type: 'button',
          class:
            'cursor-pointer text-[#2563eb] transition-all hover:underline hover:opacity-80 dark:text-blue-400 bg-transparent border-0 p-0',
          onClick: () => openTotalsCallsModal('входящие', currentDateRange.value),
        },
        String(tableTotals.value.incoming),
      ),
  },
  {
    accessorKey: 'missed',
    header: 'Проп.',
    cell: ({ row }) => {
      const original = row.original as Row

      return h(
        'button',
        {
          type: 'button',
          class:
            'cursor-pointer font-medium text-red-600 transition-all hover:underline hover:opacity-80 dark:text-red-400 bg-transparent border-0 p-0',
          onClick: () =>
            openCallsModal(original.id, original.name, 'пропущенные', currentDateRange.value),
        },
        String(row.getValue('missed') ?? 0),
      )
    },
    footer: () =>
      h(
        'button',
        {
          type: 'button',
          class:
            'cursor-pointer text-red-600 transition-all hover:underline hover:opacity-80 dark:text-red-400 bg-transparent border-0 p-0',
          onClick: () => openTotalsCallsModal('пропущенные', currentDateRange.value),
        },
        String(tableTotals.value.missed),
      ),
  },
  {
    accessorKey: 'callback',
    header: 'Обрат.',
    cell: ({ row }) => {
      const original = row.original as Row

      return h(
        'button',
        {
          type: 'button',
          class:
            'cursor-pointer font-medium text-orange-500 transition-all hover:underline hover:opacity-80 dark:text-orange-400 bg-transparent border-0 p-0',
          onClick: () =>
            openCallsModal(original.id, original.name, 'обратные', currentDateRange.value),
        },
        String(row.getValue('callback') ?? 0),
      )
    },
    footer: () =>
      h(
        'button',
        {
          type: 'button',
          class:
            'cursor-pointer text-orange-500 transition-all hover:underline hover:opacity-80 dark:text-orange-400 bg-transparent border-0 p-0',
          onClick: () => openTotalsCallsModal('обратные', currentDateRange.value),
        },
        String(tableTotals.value.callback),
      ),
  },
  {
    accessorKey: 'duration',
    header: 'Время',
    cell: ({ row }) => String(row.getValue('duration') ?? ''),
    footer: () => tableTotals.value.duration,
  },
]

onMounted(() => {
  void usersStore.fetchUsers()
})
</script>

<template>
  <B24Card>
    <template #header>
      <div class="flex items-center justify-between">
        <p>Пользователи</p>
        <div class="flex items-center gap-2">
          <SelectComponent
            v-model="dateRange"
            :items="dateRangeOptions"
            :class="[dateRange === 'custom' ? '!w-auto min-w-[200px]' : '!w-full', 'text-xs']"
            :style="
              dateRange === 'custom'
                ? 'width: auto !important; min-width: 200px;'
                : 'width: 100% !important;'
            "
          />
          <PopoverComponent
            v-if="showDatePicker"
            v-model:open="isDatePickerOpen"
            side="bottom"
            align="start"
            class="flex-1"
          >
            <ButtonComponent color="light-border" size="md" class="w-full text-xs">
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
          <SelectComponent
            v-model="selectedUsers"
            :items="userOptions"
            multiple
            placeholder="Все пользователи"
            class="!w-full text-xs"
            style="width: 100% !important"
          />
        </div>
      </div>
    </template>
    <section class="flex min-w-0 flex-1 flex-col">
      <B24Table :data="data" :columns="columns" class="flex-1" />
      <UserCallsModal
        v-if="isCallsModalOpen"
        v-model:open="isCallsModalOpen"
        :user-name="selectedUserName"
        :call-type="selectedCallType"
        :calls="selectedCalls"
        :crm-names="crmNames"
        :date-range="selectedDateRange"
      />
    </section>
  </B24Card>
</template>
