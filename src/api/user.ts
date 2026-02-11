import { useB24 } from '../composables/useB24'
import { callMethodPromise, callBatchPromise } from './core'

/**
 * Получение текущего пользователя (авторизованного в приложении).
 * https://dev.1c-bitrix.ru/rest_help/users/user_current.php
 */
export const userCurrent = async (): Promise<Record<string, unknown> | null> => {
  const b24 = await useB24()
  try {
    const response: any = await callMethodPromise(b24, 'user.current', {})
    const result = response?.result ?? response
    return result && typeof result === 'object' ? result as Record<string, unknown> : null
  } catch (error) {
    console.error('user.current error:', error)
    return null
  }
}

/**
 * Получить список доступных полей пользователя (в т.ч. PERSONAL_PHOTO для аватара).
 * https://apidocs.bitrix24.ru/api-reference/user/user-fields.html
 */
export const userFields = async (): Promise<unknown> => {
  const b24 = await useB24()
  try {
    const response: any = await callMethodPromise(b24, 'user.fields', {})
    return response?.result ?? {}
  } catch (error) {
    console.error('user.fields error:', error)
    return {}
  }
}

/** Поля пользователя для select в user.get берём из user.fields (https://apidocs.bitrix24.ru/api-reference/user/user-fields.html), в т.ч. PERSONAL_PHOTO */
const USER_SELECT_FALLBACK = ['ID', 'NAME', 'LAST_NAME', 'LOGIN', 'PERSONAL_PHOTO', 'UF_DEPARTMENT']

async function getUserSelectFields (): Promise<string[]> {
  const fields = await userFields()
  if (fields && typeof fields === 'object' && !Array.isArray(fields)) {
    const keys = Object.keys(fields)
    if (keys.length > 0) return keys
  }
  return USER_SELECT_FALLBACK
}

/**
 * Получение фильтрованного списка пользователей. Метод вернет всех пользователей за исключением: ботов,
 * пользователей для e-mail, пользователей для Открытых Линий, пользователей Реплики.
 *
 * https://dev.1c-bitrix.ru/rest_help/users/user_get.php
 * Список полей (в т.ч. PERSONAL_PHOTO) — из user.fields: https://apidocs.bitrix24.ru/api-reference/user/user-fields.html
 */
export const userGet = async (
  filter: Record<string, unknown> = {},
  sort: string = 'ID',
  order: string = 'ASC'
): Promise<unknown[]> => {
  const b24 = await useB24()
  try {
    const select = await getUserSelectFields()
    const response: any = await callMethodPromise(b24, 'user.get', {
      filter,
      sort,
      order,
      select,
    })

    const answer = response
    if (answer?.next === undefined) {
      return answer?.result ?? []
    }

    const total = answer.total
    let next = answer.next
    const params: unknown[] = [
      [
        'user.get',
        {
          filter,
          sort,
          order,
          start: 0,
          select,
        }
      ]
    ]

    while (next <= total) {
      params.push([
        'user.get',
        {
          filter,
          sort,
          order,
          start: next,
          select,
        }
      ])
      next += answer.next
    }

    const data: unknown[] = []
    const chunkSize = 50
    for (let i = 0; i < params.length; i += chunkSize) {
      const chunk = params.slice(i, i + chunkSize)
      const batchResult = await callBatchPromise(b24, chunk) as unknown[]
      data.push(...batchResult)
    }

    return data
  } catch (error) {
    console.error(error)
    return []
  }
}

