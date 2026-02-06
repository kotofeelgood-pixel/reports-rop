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
 * Получить список доступных полей пользователя.
 * https://dev.1c-bitrix.ru/rest_help/users/user_fields.php
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

/**
 * Получение фильтрованного списка пользователей. Метод вернет всех пользователей за исключением: ботов,
 * пользователей для e-mail, пользователей для Открытых Линий, пользователей Реплики.
 *
 * https://dev.1c-bitrix.ru/rest_help/users/user_get.php
 * Для получения PERSONAL_PHOTO используем '*' или явно указываем поле в select
 */
export const userGet = async (
  filter: Record<string, unknown> = {},
  sort: string = 'ID',
  order: string = 'ASC'
): Promise<unknown[]> => {
  const b24 = await useB24()
  try {
    // Используем '*' для получения всех полей, включая PERSONAL_PHOTO
    const response: any = await callMethodPromise(b24, 'user.get', {
      filter,
      sort,
      order,
      select: ['*'], // Получаем все поля, включая PERSONAL_PHOTO
    })

    console.log('response', response)

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
          select: ['*'], // Получаем все поля, включая PERSONAL_PHOTO
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
          select: ['*'], // Получаем все поля, включая PERSONAL_PHOTO
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

    console.log('data', data)

    return data
  } catch (error) {
    console.error(error)
    return []
  }
}

