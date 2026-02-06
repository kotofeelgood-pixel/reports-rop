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
  return `/company/personal/user/0/tasks/task/view/${taskId}/`
}

/** URL карточки сотрудника в Bitrix24 (профиль пользователя). */
export const getUserProfileUrl = (userId: string | number): string => {
  return `/company/personal/user/${userId}/`
}

/** URL карточки сущности CRM (лид, контакт, компания) в Bitrix24. */
export const getCrmEntityUrl = (entityType: string, entityId: string | number): string | null => {
  if (!entityType || !entityId) return null
  
  const type = String(entityType).toUpperCase()
  const id = String(entityId)
  
  if (type === 'LEAD') {
    return `/crm/lead/details/${id}/`
  } else if (type === 'CONTACT') {
    return `/crm/contact/details/${id}/`
  } else if (type === 'COMPANY') {
    return `/crm/company/details/${id}/`
  }
  
  return null
}

