import { useB24 } from '../composables/useB24'
import { callMethodPromise } from './core'

export type TelephonyCallRecord = Record<string, unknown>

/**
 * Стандартный набор полей для выборки звонков из voximplant.statistic.get
 * Согласно документации: https://dev.1c-bitrix.ru/rest_help/telephony/voximplant_statistic_get.php
 */
export const DEFAULT_CALL_SELECT_FIELDS = [
  'ID',
  'CALL_ID',
  'CALL_TYPE',
  'CALL_FAILED_CODE',
  'CALL_FAILED_REASON',
  'CALL_DURATION',
  'PORTAL_USER_ID',
  'PHONE_NUMBER',
  'CALL_START_DATE',
  'CRM_ENTITY_ID',
  'CRM_ENTITY_TYPE',
  'CALL_RECORD_URL',
] as const

/**
 * Типы звонков согласно документации Bitrix24:
 * 1 - исходящий
 * 2 - входящий
 * 3 - входящий с перенаправлением на мобильный или стационарный телефон
 * 4 - обратный звонок
 */
export const CALL_TYPE = {
  OUTGOING: 1,
  INCOMING: 2,
  INCOMING_REDIRECTED: 3,
  CALLBACK: 4,
} as const

/**
 * Проверяет, является ли звонок исходящим
 */
export const isOutgoingCallType = (callType: number | string | unknown): boolean => {
  return Number(callType) === CALL_TYPE.OUTGOING
}

/**
 * Проверяет, является ли звонок входящим (включая перенаправленные и обратные)
 */
export const isIncomingCallType = (callType: number | string | unknown): boolean => {
  const type = Number(callType)
  return type === CALL_TYPE.INCOMING || type === CALL_TYPE.INCOMING_REDIRECTED || type === CALL_TYPE.CALLBACK
}

type CallListParams = {
  /** FILTER по документации: поля для фильтрации, например { ">=CALL_START_DATE": "2025-01-01T00:00:00+03:00", "<=CALL_START_DATE": "2025-01-31T23:59:59+03:00", "PORTAL_USER_ID": "123" } */
  filter?: Record<string, unknown>
  /** SELECT - массив полей для выборки. По умолчанию выбираются все необходимые поля. */
  select?: string[]
  /** Поле сортировки (CALL_START_DATE, CALL_DURATION и т.д.) */
  sort?: string
  /** Порядок: ASC или DESC */
  order?: 'asc' | 'desc' | 'ASC' | 'DESC'
}

/**
 * Получить список звонков из телефонии.
 * Документация: https://dev.1c-bitrix.ru/rest_help/telephony/voximplant_statistic_get.php
 * Параметры: FILTER (поля фильтрации), SELECT (массив полей), SORT, ORDER. Даты в FILTER — в формате ISO-8601.
 */
export const telephonyCallList = async ({
  filter = {},
  select = [...DEFAULT_CALL_SELECT_FIELDS],
  sort = 'CALL_START_DATE',
  order = 'DESC',
}: CallListParams = {}): Promise<TelephonyCallRecord[]> => {
  const b24 = await useB24()
  try {
    const params: Record<string, unknown> = {
      FILTER: filter,
      SELECT: select,
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
