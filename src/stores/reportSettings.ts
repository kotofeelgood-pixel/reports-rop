import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

export type CalendarDate = { day: number; month: number; year: number }
export type CalendarDateRange = { start: CalendarDate | null; end: CalendarDate | null }

export const useReportSettingsStore = defineStore('reportSettings', () => {
  const chartStartHour = ref(0)
  const chartEndHour = ref(24)
  const chartType = ref<'line' | 'bar'>('line')
  const layoutType = ref<'columns' | 'rows'>('columns')
  const excludedDepartment = ref<string | null>(null)
  const excludedEmployeeIds = ref<string[]>([])
  const minCallDurationSeconds = ref(0)
  const fontSizePercent = ref(100)
  const embedAnalytics = ref(true)
  const embedStatsMenu = ref(true)
  const dateRange = ref<string>('realtime')
  const dateValue = ref<CalendarDateRange>({ start: null, end: null })

  return {
    chartStartHour,
    chartEndHour,
    chartType,
    layoutType,
    excludedDepartment,
    excludedEmployeeIds,
    minCallDurationSeconds,
    fontSizePercent,
    embedAnalytics,
    embedStatsMenu,
    dateRange,
    dateValue,
  }
})

export const useReportSettingsStoreRefs = () => storeToRefs(useReportSettingsStore())
