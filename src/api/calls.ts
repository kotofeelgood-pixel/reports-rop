import { useB24 } from '../composables/useB24'
import { callMethodPromise } from './core'

export type TelephonyCallRecord = Record<string, unknown>

type CallListParams = {
  filter?: Record<string, unknown>
  select?: string[]
  order?: Record<string, 'asc' | 'desc' | 'ASC' | 'DESC'>
  maxCount?: number
}

/**
 * Получить список звонков из телефонии.
 *
 * https://apidocs.bitrix24.ru/api-reference/telephony/calls/telephony-call-list.html
 */
export const telephonyCallList = async ({
  filter = {},
  select = ['ID', 'CALL_START_DATE', 'PORTAL_USER_ID', 'USER_ID', 'CALL_TYPE', 'STATUS', 'DURATION', 'CALL_STATUS'],
  order = { ID: 'desc' },
  maxCount = 500,
}: CallListParams = {}): Promise<TelephonyCallRecord[]> => {
  const b24 = await useB24()
  try {
    const response: any = await callMethodPromise(b24, 'telephony.call.list', {
      filter,
      order,
      select,
    })

    const answer = response
    let results = Array.isArray(answer?.result) ? answer.result : []

    if (answer?.next !== undefined && answer?.total !== undefined) {
      const total = answer.total
      let next = answer.next
      while (next < total && results.length < maxCount) {
        const nextResponse: any = await callMethodPromise(b24, 'telephony.call.list', {
          filter,
          order,
          select,
          start: next,
        })
        const nextAnswer = nextResponse
        if (Array.isArray(nextAnswer?.result)) {
          results = [...results, ...nextAnswer.result]
        }
        next = nextAnswer?.next || total
      }
    }

    return results.slice(0, maxCount)
  } catch (error) {
    console.error('telephony.call.list error:', error)
    return []
  }
}
