import { ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

const STORAGE_KEY = 'call-analytics-report-settings'

export type CalendarDate = { day: number; month: number; year: number }
export type CalendarDateRange = { start: CalendarDate | null; end: CalendarDate | null }

type StoredSettings = {
  chartStartHour?: number
  chartEndHour?: number
  chartType?: 'line' | 'bar'
  layoutType?: 'columns' | 'rows'
  excludedDepartment?: string | null
  excludedEmployeeIds?: string[]
  minCallDurationSeconds?: number
}

function loadStored(): StoredSettings | null {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    if (!raw) return null
    return JSON.parse(raw) as StoredSettings
  } catch {
    return null
  }
}

function saveStored(data: StoredSettings) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
  } catch {
    // ignore
  }
}

export const useReportSettingsStore = defineStore('reportSettings', () => {
  const stored = loadStored()

  const chartStartHour = ref(stored?.chartStartHour ?? 0)
  const chartEndHour = ref(stored?.chartEndHour ?? 24)
  const chartType = ref<'line' | 'bar'>(stored?.chartType ?? 'line')
  const layoutType = ref<'columns' | 'rows'>(stored?.layoutType ?? 'columns')
  const excludedDepartment = ref<string | null>(stored?.excludedDepartment ?? null)
  const excludedEmployeeIds = ref<string[]>(Array.isArray(stored?.excludedEmployeeIds) ? stored.excludedEmployeeIds : [])
  const minCallDurationSeconds = ref(stored?.minCallDurationSeconds ?? 0)
  // Фильтры даты и пользователей не сохраняются при перезагрузке
  const dateRange = ref<string>('realtime')
  const dateValue = ref<CalendarDateRange>({ start: null, end: null })

  watch(
    [
      chartStartHour,
      chartEndHour,
      chartType,
      layoutType,
      excludedDepartment,
      excludedEmployeeIds,
      minCallDurationSeconds,
    ],
    () => {
      saveStored({
        chartStartHour: chartStartHour.value,
        chartEndHour: chartEndHour.value,
        chartType: chartType.value,
        layoutType: layoutType.value,
        excludedDepartment: excludedDepartment.value,
        excludedEmployeeIds: excludedEmployeeIds.value,
        minCallDurationSeconds: minCallDurationSeconds.value,
      })
    },
    { deep: true }
  )

  return {
    chartStartHour,
    chartEndHour,
    chartType,
    layoutType,
    excludedDepartment,
    excludedEmployeeIds,
    minCallDurationSeconds,
    dateRange,
    dateValue,
  }
})

export const useReportSettingsStoreRefs = () => storeToRefs(useReportSettingsStore())
