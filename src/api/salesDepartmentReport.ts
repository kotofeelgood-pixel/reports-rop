import { useB24 } from '../composables/useB24'
import { callMethodPromise } from './core'
import { telephonyCallList, isIncomingCallType, isOutgoingCallType, isMissedCall } from './calls'

type BitrixListResponse = {
  result?: unknown
  deals?: unknown[]
  leads?: unknown[]
}

type AnyRecord = Record<string, any>

export type SalesDepartmentCounters = {
  userId: string
  incomingMissed: number
  incomingAnswered: number
  incomingEffective: number
  incomingEffectiveRate: number
  incomingDurationSec: number
  incomingEffectiveDurationSec: number
  incomingAvgDurationSec: number
  outgoingMissed: number
  outgoingAnswered: number
  outgoingEffective: number
  outgoingEffectiveRate: number
  outgoingDurationSec: number
  outgoingEffectiveDurationSec: number
  outgoingAvgDurationSec: number
  leadsFromPrevious: number
  leadsNew: number
  leadsInWorkAtStart: number
  dealsFromPrevious: number
  dealsNew: number
  dealsInWorkAtStart: number
  dealsWon: number
  dealsLost: number
  revenue: number
}

export type SalesDepartmentParams = {
  /**
   * Ответственный (ASSIGNED_BY_ID) в CRM.
   */
  userId: string
  /**
   * Начало периода в формате YYYY-MM-DD.
   */
  dateStart: string
  /**
   * Конец периода в формате YYYY-MM-DD.
   */
  dateEnd: string
  /**
   * Набор направлений сделок (CATEGORY_ID), как в примерах из test.md.
   */
  categoryIds?: number[]
  /**
   * Порог длительности результативного звонка в секундах.
   */
  minCallDurationSeconds?: number
}

const DEFAULT_CATEGORIES: number[] = [10, 12, 14, 24, 16, 22, 0, 20, 4, 6, 8, 18, 2, 26]

const asArray = (value: unknown): unknown[] =>
  Array.isArray(value) ? value : value != null ? [value] : []

async function callCrmList(
  b24: Awaited<ReturnType<typeof useB24>>,
  method: string,
  params: AnyRecord,
): Promise<AnyRecord[]> {
  const response = (await callMethodPromise(b24, method, params)) as BitrixListResponse
  const base = (response?.result ?? response) as AnyRecord

  if (Array.isArray(base)) return base as AnyRecord[]
  if (Array.isArray((base as AnyRecord)?.deals)) return (base as AnyRecord).deals as AnyRecord[]
  if (Array.isArray((base as AnyRecord)?.leads)) return (base as AnyRecord).leads as AnyRecord[]
  if (Array.isArray((base as AnyRecord)?.items)) return (base as AnyRecord).items as AnyRecord[]

  return []
}

const buildDateRange = (field: string, start: string, end: string) => ({
  [`>=${field}`]: `${start} 00:00:00`,
  [`<=${field}`]: `${end} 23:59:59`,
})

const safeRate = (part: number, whole: number): number => {
  if (!whole) return 0
  return (part / whole) * 100
}

/**
 * Выполняет набор CRM‑запросов для «Отчёта по отделу продаж»
 * (режим sales_department) по аналогии с примерами из test.md
 * и возвращает агрегированные счётчики по одному сотруднику.
 *
 * Это не финальная бизнес‑логика отчёта, а базовая обвязка
 * вокруг запросов Bitrix24.
 */
export const fetchSalesDepartmentCounters = async (
  params: SalesDepartmentParams,
): Promise<SalesDepartmentCounters> => {
  const b24 = await useB24()
  const minCallDurationSeconds = Math.max(0, Number(params.minCallDurationSeconds ?? 0))

  const categoryIds = params.categoryIds && params.categoryIds.length > 0
    ? params.categoryIds
    : DEFAULT_CATEGORIES

  const commonDealFilter: AnyRecord = {
    ASSIGNED_BY_ID: params.userId,
    CATEGORY_ID: categoryIds,
  }

  const dateCreateRange = buildDateRange('DATE_CREATE', params.dateStart, params.dateEnd)
  const closeDateRange = buildDateRange('CLOSEDATE', params.dateStart, params.dateEnd)

  // Звонки (аналог voximplant.statistic.get из test.md)
  const callRecords = await telephonyCallList({
    filter: {
      '>CALL_START_DATE': `${params.dateStart}T00:00:00`,
      '<CALL_START_DATE': `${params.dateEnd}T23:59:59`,
      PORTAL_USER_ID: params.userId,
    },
    sort: 'ID',
    order: 'ASC',
  })

  const incomingAnsweredDurations: number[] = []
  const incomingEffectiveDurations: number[] = []
  let incomingMissed = 0
  let incomingAnswered = 0
  let incomingEffective = 0

  const outgoingAnsweredDurations: number[] = []
  const outgoingEffectiveDurations: number[] = []
  let outgoingMissed = 0
  let outgoingAnswered = 0
  let outgoingEffective = 0

  for (const record of callRecords) {
    const duration = Number((record as AnyRecord).CALL_DURATION ?? 0)
    const missed = isMissedCall(record as Record<string, unknown>)
    const callType = (record as AnyRecord).CALL_TYPE

    if (isIncomingCallType(callType)) {
      if (missed) {
        incomingMissed += 1
      } else {
        incomingAnswered += 1
        incomingAnsweredDurations.push(Math.max(0, duration))
        if (duration > minCallDurationSeconds) {
          incomingEffective += 1
          incomingEffectiveDurations.push(Math.max(0, duration))
        }
      }
    }

    if (isOutgoingCallType(callType)) {
      if (missed) {
        outgoingMissed += 1
      } else {
        outgoingAnswered += 1
        outgoingAnsweredDurations.push(Math.max(0, duration))
        if (duration > minCallDurationSeconds) {
          outgoingEffective += 1
          outgoingEffectiveDurations.push(Math.max(0, duration))
        }
      }
    }
  }

  const incomingDurationSec = incomingAnsweredDurations.reduce((sum, d) => sum + d, 0)
  const incomingEffectiveDurationSec = incomingEffectiveDurations.reduce((sum, d) => sum + d, 0)
  const incomingAvgDurationSec = incomingAnswered
    ? incomingDurationSec / incomingAnswered
    : 0

  const outgoingDurationSec = outgoingAnsweredDurations.reduce((sum, d) => sum + d, 0)
  const outgoingEffectiveDurationSec = outgoingEffectiveDurations.reduce((sum, d) => sum + d, 0)
  const outgoingAvgDurationSec = outgoingAnswered
    ? outgoingDurationSec / outgoingAnswered
    : 0

  // Сделки
  const [
    // Сделки, созданные до периода, но закрытые в нём (аналог строки 1 в test.md)
    dealsFromPrevious,
    // Новые сделки за период (аналог строки 5 в test.md)
    dealsNew,
    // Сделки в работе на начало периода (аналог строки 3 в test.md)
    dealsInWorkAtStart,
    // Успешно закрытые сделки за период (аналог строки 7 / 19 в test.md)
    dealsWonList,
    // Проигранные сделки за период (аналог строки 9 / 21 в test.md)
    dealsLostList,
  ] = await Promise.all([
    callCrmList(b24, 'crm.deal.list', {
      filter: {
        ...commonDealFilter,
        [`<DATE_CREATE`]: `${params.dateStart} 00:00:00`,
        ...closeDateRange,
        STAGE_SEMANTIC_ID: ['S', 'F'],
      },
      order: { ID: 'ASC' },
      select: ['ID', 'OPPORTUNITY', 'ASSIGNED_BY_ID', 'STAGE_SEMANTIC_ID', 'CATEGORY_ID'],
    }),
    callCrmList(b24, 'crm.deal.list', {
      filter: {
        ...commonDealFilter,
        ...dateCreateRange,
      },
      order: { ID: 'ASC' },
      select: ['ID', 'OPPORTUNITY', 'ASSIGNED_BY_ID', 'STAGE_SEMANTIC_ID', 'CATEGORY_ID'],
    }),
    callCrmList(b24, 'crm.deal.list', {
      filter: {
        ...commonDealFilter,
        [`<DATE_CREATE`]: `${params.dateStart} 00:00:00`,
        STAGE_SEMANTIC_ID: 'P',
      },
      order: { ID: 'ASC' },
      select: ['ID', 'ASSIGNED_BY_ID', 'STAGE_SEMANTIC_ID', 'CATEGORY_ID'],
    }),
    callCrmList(b24, 'crm.deal.list', {
      filter: {
        ...commonDealFilter,
        ...closeDateRange,
        STAGE_SEMANTIC_ID: 'S',
      },
      order: { ID: 'ASC' },
      select: ['ID', 'OPPORTUNITY', 'ASSIGNED_BY_ID', 'STAGE_SEMANTIC_ID', 'CATEGORY_ID'],
    }),
    callCrmList(b24, 'crm.deal.list', {
      filter: {
        ...commonDealFilter,
        ...closeDateRange,
        STAGE_SEMANTIC_ID: 'F',
      },
      order: { ID: 'ASC' },
      select: ['ID', 'OPPORTUNITY', 'ASSIGNED_BY_ID', 'STAGE_SEMANTIC_ID', 'CATEGORY_ID'],
    }),
  ])

  // Лиды
  const commonLeadFilter: AnyRecord = {
    ASSIGNED_BY_ID: params.userId,
  }

  const [leadsFromPreviousList, leadsNewList] = await Promise.all([
    // Лиды из прошлых периодов, которые на конец периода остаются в работе:
    // созданы до начала периода и статус P.
    callCrmList(b24, 'crm.lead.list', {
      filter: {
        ...commonLeadFilter,
        [`<DATE_CREATE`]: `${params.dateStart} 00:00:00`,
        STATUS_SEMANTIC_ID: 'P',
      },
      order: { ID: 'ASC' },
      select: ['ID', 'ASSIGNED_BY_ID', 'STATUS_SEMANTIC_ID'],
    }),
    // Новые лиды, созданные в период (любого финального статуса).
    callCrmList(b24, 'crm.lead.list', {
      filter: {
        ...commonLeadFilter,
        ...dateCreateRange,
      },
      order: { ID: 'ASC' },
      select: ['ID', 'ASSIGNED_BY_ID', 'STATUS_SEMANTIC_ID'],
    }),
  ])

  const leadsFromPrevious = leadsFromPreviousList.length
  const leadsNew = leadsNewList.length
  // В отчёте «В работе» = лиды из прошлого периода + все новые за период,
  // как в эталонной таблице (178 + 13 = 191).
  const leadsInWorkTotal = leadsFromPrevious + leadsNew

  const dealsWon = dealsWonList.length
  const dealsLost = dealsLostList.length

  const revenue = dealsWonList.reduce((sum, deal) => {
    const value = Number((deal as AnyRecord).OPPORTUNITY ?? 0)
    if (Number.isFinite(value)) return sum + value
    return sum
  }, 0)

  const counters: SalesDepartmentCounters = {
    userId: params.userId,
    incomingMissed,
    incomingAnswered,
    incomingEffective,
    incomingEffectiveRate: safeRate(incomingEffective, incomingAnswered),
    incomingDurationSec,
    incomingEffectiveDurationSec,
    incomingAvgDurationSec,
    outgoingMissed,
    outgoingAnswered,
    outgoingEffective,
    outgoingEffectiveRate: safeRate(outgoingEffective, outgoingAnswered),
    outgoingDurationSec,
    outgoingEffectiveDurationSec,
    outgoingAvgDurationSec,
    leadsFromPrevious,
    leadsNew,
    leadsInWorkAtStart: leadsInWorkTotal,
    dealsFromPrevious: dealsFromPrevious.length,
    dealsNew: dealsNew.length,
    dealsInWorkAtStart: dealsInWorkAtStart.length,
    dealsWon,
    dealsLost,
    revenue,
  }

  // Явно используем вспомогательную функцию, чтобы линтер не ругался на asArray
  // (и на будущее для возможных доработок группировки по нескольким пользователям).
  void asArray

  return counters
}

