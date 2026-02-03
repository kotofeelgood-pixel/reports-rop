import { useB24 } from '../composables/useB24'
import { callMethodPromise } from './core'

export type TelephonyCallRecord = Record<string, unknown>

type CallListParams = {
  filter?: Record<string, unknown>
  sort?: string
  order?: 'asc' | 'desc' | 'ASC' | 'DESC'
}

/**
 * Получить список звонков из телефонии.
 *
 * https://apidocs.bitrix24.com/api-reference/telephony/voximplant-statistic-get.html
 */
export const telephonyCallList = async ({
  filter = {},
  sort = 'CALL_START_DATE',
  order = 'DESC',
}: CallListParams = {}): Promise<TelephonyCallRecord[]> => {
  const b24 = await useB24()
  try {
    const response: any = await callMethodPromise(b24, 'voximplant.statistic.get', {
      FILTER: filter,
      SORT: sort,
      ORDER: order,
    })

    const answer = response
    return Array.isArray(answer?.result) ? answer.result : []
  } catch (error) {
    console.error('voximplant.statistic.get error:', error)
    return []
  }
}
