import { useB24 } from '../composables/useB24'
import { callMethodPromise } from './core'

export type TelephonyCallRecord = Record<string, unknown>

type CallListParams = {
  /** FILTER по документации: поля для фильтрации, например { ">=CALL_START_DATE": "2025-01-01T00:00:00+03:00", "<=CALL_START_DATE": "2025-01-31T23:59:59+03:00", "PORTAL_USER_ID": "123" } */
  filter?: Record<string, unknown>
  /** Поле сортировки (CALL_START_DATE, CALL_DURATION и т.д.) */
  sort?: string
  /** Порядок: ASC или DESC */
  order?: 'asc' | 'desc' | 'ASC' | 'DESC'
}

/**
 * Получить список звонков из телефонии.
 * Документация: https://dev.1c-bitrix.ru/rest_help/telephony/voximplant_statistic_get.php
 * Параметры: FILTER (поля фильтрации), SORT, ORDER. Даты в FILTER — в формате ISO-8601.
 */
export const telephonyCallList = async ({
  filter = {},
  sort = 'CALL_START_DATE',
  order = 'DESC',
}: CallListParams = {}): Promise<TelephonyCallRecord[]> => {
  const b24 = await useB24()
  try {
    const params: Record<string, unknown> = {
      FILTER: filter,
      SORT: sort,
      ORDER: order,
    }
    const response: unknown = await callMethodPromise(b24, 'voximplant.statistic.get', params)
    const answer = response as { result?: TelephonyCallRecord[] }
    return Array.isArray(answer?.result) ? answer.result : []
  } catch (error) {
    console.error('voximplant.statistic.get error:', error)
    return []
  }
}
