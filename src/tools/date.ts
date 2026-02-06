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
 * Форматирует диапазон дат из CalendarDateRange в строку формата "DD.MM.YYYY - DD.MM.YYYY"
 * @param dateValue - объект с диапазоном дат или null
 * @param defaultText - текст по умолчанию, если даты не выбраны
 * @returns отформатированная строка с диапазоном дат
 */
export function formatDateRange(
  dateValue: CalendarDateRange | null,
  defaultText: string = '27.02.2025 -'
): string {
  if (!dateValue || (!dateValue.start && !dateValue.end)) {
    return defaultText
  }

  try {
    const range = dateValue as CalendarDateRange

    if (range?.start && range?.end) {
      const start = range.start
      const end = range.end
      const startStr = `${String(start.day).padStart(2, '0')}.${String(start.month).padStart(2, '0')}.${start.year}`
      const endStr = `${String(end.day).padStart(2, '0')}.${String(end.month).padStart(2, '0')}.${end.year}`
      return `${startStr} - ${endStr}`
    }

    if (range?.start) {
      const start = range.start
      const startStr = `${String(start.day).padStart(2, '0')}.${String(start.month).padStart(2, '0')}.${start.year}`
      return `${startStr} -`
    }
  } catch (e) {
    console.error('Error formatting date:', e)
  }

  return defaultText
}

/**
 * Форматирует диапазон дат из Date объектов в строку формата "DD.MM.YYYY - DD.MM.YYYY"
 * @param start - начальная дата
 * @param end - конечная дата
 * @returns отформатированная строка с диапазоном дат
 */
export function formatDateRangeFromDates(start: Date | null, end: Date | null): string {
  if (!start || !end) {
    return '—'
  }

  const pad = (n: number) => String(n).padStart(2, '0')
  const startStr = `${pad(start.getDate())}.${pad(start.getMonth() + 1)}.${start.getFullYear()}`
  const endStr = `${pad(end.getDate())}.${pad(end.getMonth() + 1)}.${end.getFullYear()}`
  return `${startStr} - ${endStr}`
}
