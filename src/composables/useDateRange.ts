import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { formatDateRange } from '@/tools/date'
import { useReportSettingsStore } from '@/stores/reportSettings'
import type { CalendarDateRange } from '@/stores/reportSettings'

/**
 * Композабл для управления диапазоном дат (состояние в общем сторе для таблицы, рейтинга, графика).
 * @returns объект с состоянием диапазона дат и методами для работы с ним
 */
export function useDateRange() {
  const store = useReportSettingsStore()
  const { dateRange, dateValue } = storeToRefs(store)
  const isDatePickerOpen = ref(false)

  const showDatePicker = computed(() => dateRange.value === 'custom')

  const dateDisplayValue = computed(() => {
    return formatDateRange(dateValue.value)
  })

  // Отслеживаем изменения dateValue для автоматического закрытия popover
  watch(dateValue, (newValue) => {
    if (newValue && typeof newValue === 'object' && 'start' in newValue && 'end' in newValue) {
      const range = newValue as CalendarDateRange
      // Проверяем, что обе даты выбраны и валидны
      if (range.start && range.end) {
        const start = range.start
        const end = range.end
        // Проверяем наличие всех необходимых полей
        if (
          start &&
          end &&
          start.day !== undefined &&
          start.month !== undefined &&
          start.year !== undefined &&
          end.day !== undefined &&
          end.month !== undefined &&
          end.year !== undefined
        ) {
          // Небольшая задержка перед закрытием, чтобы пользователь увидел выбор
          setTimeout(() => {
            isDatePickerOpen.value = false
          }, 200)
        }
      }
    }
  }, { deep: true })

  // Сбрасываем dateValue при изменении dateRange (кроме custom)
  watch(dateRange, (newValue) => {
    if (newValue !== 'custom') {
      dateValue.value = { start: null, end: null }
      isDatePickerOpen.value = false
    }
  })

  const dateRangeOptions = [
    { label: 'Произвольный период', value: 'custom' },
    { label: 'В реальном времени', value: 'realtime' },
    { label: 'Вчера', value: 'yesterday' },
    { label: 'Эта неделя', value: 'this_week' },
    { label: 'Прошлая неделя', value: 'last_week' },
    { label: 'Этот месяц', value: 'this_month' },
    { label: 'Прошлый месяц', value: 'last_month' },
  ]

  const formatB24Date = (d: Date): string => {
    const pad = (n: number) => String(n).padStart(2, '0')
    const yyyy = d.getFullYear()
    const mm = pad(d.getMonth() + 1)
    const dd = pad(d.getDate())
    const hh = pad(d.getHours())
    const mi = pad(d.getMinutes())
    const ss = pad(d.getSeconds())
    const tzMin = -d.getTimezoneOffset()
    const sign = tzMin >= 0 ? '+' : '-'
    const abs = Math.abs(tzMin)
    const tzh = pad(Math.floor(abs / 60))
    const tzm = pad(abs % 60)
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}${sign}${tzh}:${tzm}`
  }

  const getDateRange = (): { start: Date; end: Date } | null => {
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
      case 'realtime':
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

  return {
    dateRange,
    dateValue,
    isDatePickerOpen,
    showDatePicker,
    dateDisplayValue,
    dateRangeOptions,
    formatB24Date,
    getDateRange,
  }
}
