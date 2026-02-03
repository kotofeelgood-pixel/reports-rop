export * from './calls'
export * from './date'
export * from './parseDuration'

type DateRange = { dateFrom: string; dateTo: string }

const pad2 = (n: number) => String(n).padStart(2, '0')
const toYmd = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`

export const getMonthDateRange = (year: number, month: number): DateRange => {
  // month: 1-12
  const from = new Date(year, month - 1, 1)
  const to = new Date(year, month, 0)
  return { dateFrom: toYmd(from), dateTo: toYmd(to) }
}

export type ReportPeriod =
  | 'today'
  | 'yesterday'
  | 'thisWeek'
  | 'lastWeek'
  | 'thisMonth'
  | 'lastMonth'
  | { kind: 'custom'; dateFrom: string; dateTo: string }

export const getReportDateRange = (period: ReportPeriod): DateRange => {
  const now = new Date()

  if (typeof period === 'object' && period?.kind === 'custom') {
    return { dateFrom: period.dateFrom, dateTo: period.dateTo }
  }

  if (period === 'today') {
    const d = toYmd(now)
    return { dateFrom: d, dateTo: d }
  }

  if (period === 'yesterday') {
    const y = new Date(now)
    y.setDate(y.getDate() - 1)
    const d = toYmd(y)
    return { dateFrom: d, dateTo: d }
  }

  const startOfWeek = (d: Date) => {
    // Пн = 1..Вс = 0 (JS). Приведём к Пн.
    const day = d.getDay()
    const diff = (day === 0 ? -6 : 1 - day)
    const res = new Date(d)
    res.setHours(0, 0, 0, 0)
    res.setDate(res.getDate() + diff)
    return res
  }

  if (period === 'thisWeek' || period === 'lastWeek') {
    const start = startOfWeek(now)
    if (period === 'lastWeek') start.setDate(start.getDate() - 7)
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    return { dateFrom: toYmd(start), dateTo: toYmd(end) }
  }

  if (period === 'thisMonth' || period === 'lastMonth') {
    const y = now.getFullYear()
    const m = now.getMonth() + 1
    if (period === 'thisMonth') return getMonthDateRange(y, m)
    const prev = new Date(y, now.getMonth() - 1, 1)
    return getMonthDateRange(prev.getFullYear(), prev.getMonth() + 1)
  }

  // Fallback
  return getMonthDateRange(now.getFullYear(), now.getMonth() + 1)
}

export const getTaskUrl = (taskId: number | string): string => {
  const w = globalThis as any
  const domain = w?.BX24?.getDomain?.()
  const path = `/company/personal/user/0/tasks/task/view/${taskId}/`
  return domain ? `https://${domain}${path}` : path
}

