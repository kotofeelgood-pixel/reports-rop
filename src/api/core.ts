// Базовые вспомогательные функции для работы с Bitrix24 API через bx24-api

import BX24 from 'bx24-api'

/**
 * Тип результата из bx24-api callMethod
 */
type BX24Result = {
  data: () => unknown
  more: () => boolean
  next: () => Promise<BX24Result>
  answer?: unknown
}

/**
 * Вспомогательная функция для вызова метода Bitrix24 API через bx24-api.
 *
 * @param method - имя метода API
 * @param params - параметры метода (может быть объектом или массивом, в зависимости от метода)
 */
export const callMethodPromise = async (
  method: string,
  params: Record<string, unknown> | unknown[]
): Promise<unknown> => {
  try {
    const response = await BX24.callMethod(method, params) as BX24Result
    
    // Получаем данные из ответа
    const data = response.data()
    
    // Если есть answer, используем его (для совместимости со старым кодом)
    if (response.answer) {
      return response.answer
    }
    
    return data
  } catch (error) {
    console.error(`Error in callMethodPromise for ${method}:`, error)
    throw error
  }
}

/**
 * Вспомогательная функция для пакетного вызова методов Bitrix24 API через bx24-api.
 */
export const callBatchPromise = async (params: unknown[]): Promise<unknown> => {
  try {
    const batchParams: Record<string, { method: string; params: Record<string, unknown> | unknown[] }> = {}

    params.forEach((param, index) => {
      if (Array.isArray(param) && param.length >= 2) {
        const method = param[0] as string
        const methodParams = param[1] // Может быть объектом или массивом
        batchParams[`batch_${index}`] = {
          method,
          params: methodParams
        }
      }
    })

    const response = await BX24.callBatch(batchParams, true) as BX24Result
    const data = response.data() as Record<string, unknown>

    let resultArray: unknown[] = []
    for (const key in data) {
      if (key === 'result_error' || key === 'result_time' || key === 'result_total' || key === 'result_next' || key === 'time') {
        continue
      }

      const batchResult = data[key]

      // Проверяем наличие ошибки в конкретном результате
      if (batchResult && typeof batchResult === 'object' && 'error' in (batchResult as any)) {
        const errorValue = (batchResult as any).error
        if (errorValue) {
          const errorDescription = (batchResult as any).error_description
          console.warn(`Error in batch result ${key}:`, errorValue)
          resultArray.push({ error: errorValue, error_description: errorDescription })
          continue
        }
      }

      // Извлекаем данные из результата batch запроса
      const batchData = batchResult as any
      let result = batchData?.items ?? batchData?.result ?? batchData

      if (Array.isArray(result)) {
        resultArray = [...resultArray, ...result]
      } else if (result && typeof result === 'object') {
        // user.get возвращает объект вида { result: [...], total, next, time }
        if (Array.isArray(result.result)) {
          resultArray = [...resultArray, ...result.result]
        } else if (result.tasks && Array.isArray(result.tasks)) {
          resultArray = [...resultArray, ...result.tasks]
        } else {
          resultArray.push(result)
        }
      } else if (result) {
        resultArray.push(result)
      }
    }

    return resultArray
  } catch (error) {
    console.error('Error in callBatchPromise:', error)
    throw error
  }
}

/**
 * Вспомогательная функция для автоматической загрузки всех данных через callMethodAll.
 * Поддерживает только методы с ID, filter, order, select.
 */
export const callMethodAll = async (
  method: string,
  params: Record<string, unknown> = {}
): Promise<unknown[]> => {
  try {
    const result = await BX24.callMethodAll(method, params) as unknown[]
    return Array.isArray(result) ? result : []
  } catch (error) {
    console.error(`Error in callMethodAll for ${method}:`, error)
    return []
  }
}

