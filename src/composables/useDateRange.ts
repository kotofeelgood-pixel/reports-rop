import { ref, computed, watch } from 'vue'
import { formatDateRange } from '@/tools/date'

type CalendarDate = {
  day: number
  month: number
  year: number
}

type CalendarDateRange = {
  start: CalendarDate | null
  end: CalendarDate | null
}

/**
 * Композабл для управления диапазоном дат
 * @returns объект с состоянием диапазона дат и методами для работы с ним
 */
export function useDateRange() {
  const dateRange = ref<string>('realtime')
  const dateValue = ref<CalendarDateRange>({ start: null, end: null })
  const isDatePickerOpen = ref(false)

  const showDatePicker = computed(() => dateRange.value === 'custom')

  const dateDisplayValue = computed(() => {
    return formatDateRange(dateValue.value)
  })

  // Отслеживаем изменения dateValue для автоматического закрытия popover
  watch(dateValue, (newValue) => {
    console.log('Date value changed:', newValue)
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
    { label: 'Сегодня', value: 'today' },
    { label: 'Вчера', value: 'yesterday' },
    { label: 'Эта неделя', value: 'this_week' },
    { label: 'Прошлая неделя', value: 'last_week' },
    { label: 'Этот месяц', value: 'this_month' },
    { label: 'Прошлый месяц', value: 'last_month' },
  ]

  return {
    dateRange,
    dateValue,
    isDatePickerOpen,
    showDatePicker,
    dateDisplayValue,
    dateRangeOptions,
  }
}
