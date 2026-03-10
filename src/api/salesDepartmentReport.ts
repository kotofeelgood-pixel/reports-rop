import { useB24 } from '../composables/useB24'
import { callMethodPromise } from './core'

type BitrixListResponse = {
  result?: unknown
  deals?: unknown[]
  leads?: unknown[]
}

type AnyRecord = Record<string, any>

export type SalesDepartmentCounters = {
  userId: string
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

  const categoryIds = params.categoryIds && params.categoryIds.length > 0
    ? params.categoryIds
    : DEFAULT_CATEGORIES

  const commonDealFilter: AnyRecord = {
    ASSIGNED_BY_ID: params.userId,
    CATEGORY_ID: categoryIds,
  }

  const dateCreateRange = buildDateRange('DATE_CREATE', params.dateStart, params.dateEnd)
  const closeDateRange = buildDateRange('CLOSEDATE', params.dateStart, params.dateEnd)

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

  const [
    // Лиды, созданные до периода, но закрытые в нём (аналог строки 11 в test.md)
    leadsFromPreviousList,
    // Лиды в работе на начало периода (аналог строки 13 в test.md)
    leadsInWorkAtStartList,
    // Новые лиды за период (аналог строки 15 в test.md)
    leadsNewList,
  ] = await Promise.all([
    callCrmList(b24, 'crm.lead.list', {
      filter: {
        ...commonLeadFilter,
        [`<DATE_CREATE`]: `${params.dateStart} 00:00:00`,
        ...buildDateRange('DATE_CLOSED', params.dateStart, params.dateEnd),
      },
      order: { ID: 'ASC' },
      select: ['ID', 'ASSIGNED_BY_ID', 'STATUS_SEMANTIC_ID'],
    }),
    callCrmList(b24, 'crm.lead.list', {
      filter: {
        ...commonLeadFilter,
        [`<DATE_CREATE`]: `${params.dateStart} 00:00:00`,
        STATUS_SEMANTIC_ID: 'P',
      },
      order: { ID: 'ASC' },
      select: ['ID', 'ASSIGNED_BY_ID', 'STATUS_SEMANTIC_ID'],
    }),
    callCrmList(b24, 'crm.lead.list', {
      filter: {
        ...commonLeadFilter,
        ...dateCreateRange,
      },
      order: { ID: 'ASC' },
      select: ['ID', 'ASSIGNED_BY_ID', 'STATUS_SEMANTIC_ID'],
    }),
  ])

  const dealsWon = dealsWonList.length
  const dealsLost = dealsLostList.length

  const revenue = dealsWonList.reduce((sum, deal) => {
    const value = Number((deal as AnyRecord).OPPORTUNITY ?? 0)
    if (Number.isFinite(value)) return sum + value
    return sum
  }, 0)

  const counters: SalesDepartmentCounters = {
    userId: params.userId,
    leadsFromPrevious: leadsFromPreviousList.length,
    leadsNew: leadsNewList.length,
    leadsInWorkAtStart: leadsInWorkAtStartList.length,
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

