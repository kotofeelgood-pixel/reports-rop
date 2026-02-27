<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ReportHeader from '@/components/report/ReportHeader.vue'
import CalendarComponent from '@/components/element/calendar/CalendarComponent.vue'
import PopoverComponent from '@/components/overlay/popover/PopoverComponent.vue'
import ButtonComponent from '@/components/buttons/ButtonComponent.vue'
import SelectComponent from '@/components/select/SelectComponent.vue'
import { useAnalyticsCalls } from '@/composables/useAnalyticsCalls'
import { useDateRange } from '@/composables/useDateRange'
import { useReportSettingsStoreRefs } from '@/stores/reportSettings'
import { useUsersStore, useUsersStoreRefs } from '@/stores/users'
import {
  type TelephonyCallRecord,
  isOutgoingCallType,
  isIncomingCallType,
  isCallbackCallType,
  isMissedCall,
} from '@/api/calls'
import { getCrmEntityUrl, getUserProfileUrl } from '@/tools'
import * as XLSX from 'xlsx'

type ReportRow = {
  userId: string
  fullName: string
  outgoing: number
  incoming: number
  missed: number
  callback: number
  duration: string
  crmUrl: string | null
}

const { calls, loading, error, fetchCalls } = useAnalyticsCalls()
const {
  dateRange,
  dateValue,
  isDatePickerOpen,
  showDatePicker,
  dateDisplayValue,
  dateRangeOptions,
  getDateRange,
} = useDateRange()
const { excludedEmployeeIds, minCallDurationSeconds } = useReportSettingsStoreRefs()

const usersStore = useUsersStore()
const { usersById } = useUsersStoreRefs()

const exportFormat = ref<'xlsx' | 'csv'>('xlsx')
const exportFormatOptions = [
  { label: 'Excel (.xlsx)', value: 'xlsx' },
  { label: 'CSV (.csv)', value: 'csv' },
]

onMounted(() => {
  void usersStore.fetchUsers()
  void fetchCalls()
})

const buildReportRows = (source: TelephonyCallRecord[]): ReportRow[] => {
  if (!source.length) return []

  const excluded = new Set((excludedEmployeeIds.value || []).map(String))
  const minDuration = Number(minCallDurationSeconds.value) || 0

  type InternalRow = {
    userId: string
    fullName: string
    outgoing: number
    incoming: number
    missed: number
    callback: number
    totalSeconds: number
    crmUrl: string | null
  }

  const map = new Map<string, InternalRow>()

  for (const call of source) {
    const durationRaw = call.CALL_DURATION ?? call.DURATION ?? call.duration ?? 0
    const duration = Number(durationRaw)
    if (duration < minDuration) continue

    const userIdRaw =
      call.PORTAL_USER_ID ??
      call.USER_ID ??
      call.RESPONSIBLE_ID ??
      call.ASSIGNED_BY_ID
    const userId = String(userIdRaw ?? '').trim()
    if (!userId || excluded.has(userId)) continue

    const callTypeRaw = call.CALL_TYPE ?? call.callType ?? call.TYPE ?? call.type
    const isMissed = isMissedCall(call)

    const user = usersById.value.get(userId)
    const fullName = user?.name ?? `#${userId}`

    if (!map.has(userId)) {
      map.set(userId, {
        userId,
        fullName,
        outgoing: 0,
        incoming: 0,
        missed: 0,
        callback: 0,
        totalSeconds: 0,
        crmUrl: null,
      })
    }

    const row = map.get(userId)!

    if (isOutgoingCallType(callTypeRaw)) {
      row.outgoing += 1
    } else if (isIncomingCallType(callTypeRaw)) {
      if (!isMissed) {
        row.incoming += 1
      } else {
        row.missed += 1
      }
    } else if (isCallbackCallType(callTypeRaw)) {
      if (!isMissed) {
        row.callback += 1
      } else {
        row.missed += 1
      }
    } else if (isMissed) {
      row.missed += 1
    }

    if (Number.isFinite(duration) && duration > 0) {
      row.totalSeconds += duration
    }

    if (!row.crmUrl) {
      const crmType = call.CRM_ENTITY_TYPE ?? call.crm_entity_type
      const crmId = call.CRM_ENTITY_ID ?? call.crm_entity_id
      const crmUrl =
        (crmType && crmId ? getCrmEntityUrl(String(crmType), String(crmId)) : null) ??
        getUserProfileUrl(userId)
      row.crmUrl = crmUrl
    }
  }

  const result: ReportRow[] = []

  for (const row of map.values()) {
    const total = Math.max(0, row.totalSeconds)
    const hours = Math.floor(total / 3600)
    const minutes = Math.floor((total % 3600) / 60)
    const seconds = total % 60

    result.push({
      userId: row.userId,
      fullName: row.fullName,
      outgoing: row.outgoing,
      incoming: row.incoming,
      missed: row.missed,
      callback: row.callback,
      duration: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
        seconds,
      ).padStart(2, '0')}`,
      crmUrl: row.crmUrl,
    })
  }

  return result.sort((a, b) => a.fullName.localeCompare(b.fullName, 'ru'))
}

const rows = computed<ReportRow[]>(() => buildReportRows(calls.value))
const previewRows = computed<ReportRow[]>(() => rows.value.slice(0, 20))

const buildFileName = () => {
  const range = getDateRange()
  if (!range) return 'report.xlsx'

  const pad = (n: number) => String(n).padStart(2, '0')

  const start = range.start
  const end = range.end

  const startStr = `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}`
  const endStr = `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}`

  return `call-report_${startStr}_${endStr}`
}

const exportReport = () => {
  if (!rows.value.length) return

  const rangeLabel = dateDisplayValue.value || ''

  const header = [
    'ID пользователя',
    'ФИО пользователя',
    'Исх.',
    'Вх.',
    'Проп.',
    'Обрат.',
    'Время',
    'CRM',
    'Период',
  ]

  const data = rows.value.map((row) => [
    row.userId,
    row.fullName,
    row.outgoing,
    row.incoming,
    row.missed,
    row.callback,
    row.duration,
    row.crmUrl ?? '',
    rangeLabel,
  ])

  const worksheet = XLSX.utils.aoa_to_sheet([header, ...data])
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Отчёт')

  const fileBase = buildFileName()

  if (exportFormat.value === 'csv') {
    const csv = XLSX.utils.sheet_to_csv(worksheet, { FS: ';' })
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${fileBase}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } else {
    XLSX.writeFile(workbook, `${fileBase}.xlsx`, { bookType: 'xlsx' })
  }
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gray-50 dark:bg-[#1a1a1a]">
    <ReportHeader />

    <main class="flex-1 space-y-4 overflow-auto p-4">
      <B24Card>
        <template #header>Сформировать отчётность</template>
        <div class="space-y-4">
          <div class="grid gap-4 md:grid-cols-4">
            <div class="md:col-span-2 space-y-2">
              <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">
                Период отчёта
              </label>
              <div class="flex flex-col gap-2 sm:flex-row">
                <SelectComponent
                  v-model="dateRange"
                  :items="dateRangeOptions"
                  class="w-full sm:w-48 text-xs"
                  :style="{ width: '12rem' }"
                />
                <PopoverComponent
                  v-if="showDatePicker"
                  v-model:open="isDatePickerOpen"
                  side="bottom"
                  align="start"
                  class="flex-1"
                >
                  <ButtonComponent color="light-border" size="md" class="w-full text-xs">
                    {{ dateDisplayValue }}
                  </ButtonComponent>
                  <template #content>
                    <div class="p-4">
                      <CalendarComponent
                        v-model="dateValue"
                        range
                        locale="ru-RU"
                        :number-of-months="2"
                        year-controls
                      />
                    </div>
                  </template>
                </PopoverComponent>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">
                Экспорт в
              </label>
              <SelectComponent
                v-model="exportFormat"
                :items="exportFormatOptions"
                placeholder="Формат файла"
                full-width
              />
            </div>

            <div class="flex items-end">
              <ButtonComponent
                color="primary"
                class="w-full"
                :disabled="loading || !rows.length"
                @click="exportReport"
              >
                Сформировать отчёт
              </ButtonComponent>
            </div>
          </div>

          <p class="text-xs text-gray-500 dark:text-gray-400">
            В отчёт попадут все пользователи с учётом настроек фильтра и минимальной длительности
            звонка. Ниже отображается предварительный просмотр первых 20 строк.
          </p>

          <div
            v-if="error"
            class="rounded-md border border-red-200 bg-red-50 p-2 text-xs text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
          >
            {{ error }}
          </div>
        </div>
      </B24Card>

      <B24Card>
        <template #header>Предпросмотр отчёта (первые 20 строк)</template>

        <div
          v-if="loading"
          class="flex items-center justify-center py-8 text-sm text-gray-500 dark:text-gray-400"
        >
          Загрузка данных…
        </div>
        <div
          v-else-if="!previewRows.length"
          class="flex items-center justify-center py-8 text-sm text-gray-500 dark:text-gray-400"
        >
          Нет данных за выбранный период
        </div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-700">
            <thead class="bg-gray-100 dark:bg-gray-800/60">
              <tr>
                <th class="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">
                  ID пользователя
                </th>
                <th class="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">
                  ФИО пользователя
                </th>
                <th class="px-3 py-2 text-right font-semibold text-gray-700 dark:text-gray-200">
                  Исх.
                </th>
                <th class="px-3 py-2 text-right font-semibold text-gray-700 dark:text-gray-200">
                  Вх.
                </th>
                <th class="px-3 py-2 text-right font-semibold text-gray-700 dark:text-gray-200">
                  Проп.
                </th>
                <th class="px-3 py-2 text-right font-semibold text-gray-700 dark:text-gray-200">
                  Обрат.
                </th>
                <th class="px-3 py-2 text-right font-semibold text-gray-700 dark:text-gray-200">
                  Время
                </th>
                <th class="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">
                  CRM
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-[#252525]">
              <tr
                v-for="row in previewRows"
                :key="row.userId"
                class="hover:bg-gray-50 dark:hover:bg-gray-800/60"
              >
                <td class="whitespace-nowrap px-3 py-2 text-xs text-gray-700 dark:text-gray-200">
                  {{ row.userId }}
                </td>
                <td class="px-3 py-2 text-xs text-gray-700 dark:text-gray-200">
                  {{ row.fullName }}
                </td>
                <td
                  class="whitespace-nowrap px-3 py-2 text-right text-xs text-gray-700 dark:text-gray-200"
                >
                  {{ row.outgoing }}
                </td>
                <td
                  class="whitespace-nowrap px-3 py-2 text-right text-xs text-gray-700 dark:text-gray-200"
                >
                  {{ row.incoming }}
                </td>
                <td
                  class="whitespace-nowrap px-3 py-2 text-right text-xs text-gray-700 dark:text-gray-200"
                >
                  {{ row.missed }}
                </td>
                <td
                  class="whitespace-nowrap px-3 py-2 text-right text-xs text-gray-700 dark:text-gray-200"
                >
                  {{ row.callback }}
                </td>
                <td
                  class="whitespace-nowrap px-3 py-2 text-right text-xs text-gray-700 dark:text-gray-200"
                >
                  {{ row.duration }}
                </td>
                <td class="px-3 py-2 text-xs">
                  <a
                    v-if="row.crmUrl"
                    :href="row.crmUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-[#2fc6f6] hover:underline"
                  >
                    Открыть в CRM
                  </a>
                  <span v-else class="text-gray-400 dark:text-gray-500">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </B24Card>
    </main>
  </div>
</template>

<style scoped></style>
