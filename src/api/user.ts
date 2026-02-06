import { callMethodPromise, callMethodAll } from './core'

/**
 * Получение текущего пользователя (авторизованного в приложении).
 * https://dev.1c-bitrix.ru/rest_help/users/user_current.php
 */
export const userCurrent = async (): Promise<Record<string, unknown> | null> => {
  try {
    const response: any = await callMethodPromise('user.current', {})
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
  try {
    const response: any = await callMethodPromise('user.fields', {})
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
 * 
 * Использует callMethodAll для автоматической загрузки всех данных
 */
export const userGet = async (
  filter: Record<string, unknown> = {},
  sort: string = 'ID',
  order: string = 'ASC'
): Promise<unknown[]> => {
  try {
    // Используем callMethodAll для автоматической загрузки всех данных
    const data = await callMethodAll('user.get', {
      filter,
      sort,
      order,
      select: ['*'], // Получаем все поля, включая PERSONAL_PHOTO
    })

    console.log('user.get data', data)

    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('user.get error:', error)
    return []
  }
}

