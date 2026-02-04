import { CalendarDate as IntlCalendarDate } from '@internationalized/date'

export type CalendarDate = {
  day: number
  month: number
  year: number
}

export type CalendarDateRange = {
  start: CalendarDate | null
  end: CalendarDate | null
}

/**
 * Преобразует нашу дату { day, month, year } в CalendarDate из @internationalized/date
 */
export function toCalendarDate(d: CalendarDate | null): IntlCalendarDate | null {
  if (!d) return null
  return new IntlCalendarDate(d.year, d.month, d.day)
}

/**
 * Преобразует CalendarDate из @internationalized/date в нашу дату { day, month, year }
 */
export function fromCalendarDate(d: { year: number; month: number; day: number } | null): CalendarDate | null {
  if (!d) return null
  return { day: d.day, month: d.month, year: d.year }
}

/**
 * Преобразует DateRange (reka-ui) в наш CalendarDateRange
 */
export function fromDateRange(
  range: { start: { year: number; month: number; day: number }; end: { year: number; month: number; day: number } } | null
): CalendarDateRange {
  if (!range) return { start: null, end: null }
  return {
    start: fromCalendarDate(range.start),
    end: fromCalendarDate(range.end),
  }
}

/**
 * Преобразует наш CalendarDateRange в DateRange для reka-ui
 */
export function toDateRange(range: CalendarDateRange): { start: IntlCalendarDate; end: IntlCalendarDate } | null {
  const start = toCalendarDate(range?.start ?? null)
  const end = toCalendarDate(range?.end ?? null)
  if (!start || !end) return null
  return { start, end }
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
