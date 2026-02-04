import { useB24 } from '../composables/useB24'
import { callMethodPromise } from './core'

export type TelephonyCallRecord = Record<string, unknown>

type CallListParams = {
  filter?: Record<string, unknown>
  sort?: string
  order?: 'asc' | 'desc' | 'ASC' | 'DESC'
  select?: string[]
}

/** Список полей по умолчанию для выборки звонков (как в примере REST) */
const DEFAULT_SELECT = [
  'ID',
  'CALL_ID',
  'CALL_TYPE',
  'CALL_FAILED_CODE',
  'CALL_DURATION',
  'PORTAL_USER_ID',
  'PHONE_NUMBER',
  'CALL_START_DATE',
  'CRM_ENTITY_ID',
  'CRM_ENTITY_TYPE',
  'CALL_RECORD_URL',
]

/**
 * Получить список звонков из телефонии.
 * Дата передаётся в filter[>=CALL_START_DATE] и filter[<=CALL_START_DATE] в формате ISO с таймзоной.
 * https://apidocs.bitrix24.com/api-reference/telephony/voximplant-statistic-get.html
 */
export const telephonyCallList = async ({
  filter = {},
  sort = 'CALL_START_DATE',
  order = 'DESC',
  select = DEFAULT_SELECT,
}: CallListParams = {}): Promise<TelephonyCallRecord[]> => {
  const b24 = await useB24()
  try {
    const params: Record<string, unknown> = {
      FILTER: filter,
      SORT: sort,
      ORDER: order,
    }
    if (select.length) {
      params.SELECT = select.reduce<Record<string, string>>((acc, field, i) => {
        acc[String(i)] = field
        return acc
      }, {})
    }
    const response: any = await callMethodPromise(b24, 'voximplant.statistic.get', params)

    const answer = response
    return Array.isArray(answer?.result) ? answer.result : []
  } catch (error) {
    console.error('voximplant.statistic.get error:', error)
    return []
  }
}
