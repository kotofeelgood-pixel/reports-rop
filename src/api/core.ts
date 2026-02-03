// Базовые вспомогательные функции для работы с Bitrix24 API

/**
 * Извлекает только чистые данные из ответа Bitrix24, исключая функции и методы.
 * Эта функция гарантирует, что данные могут быть безопасно клонированы через structuredClone.
 */
export const extractPlainData = (data: unknown): unknown => {
  if (data === null || data === undefined) {
    return data
  }

  // Если есть метод getData, используем его (для объектов Result из B24Frame)
  if (typeof data === 'object' && data !== null && 'getData' in data && typeof (data as any).getData === 'function') {
    try {
      const extracted = (data as any).getData()
      return extractPlainData(extracted)
    } catch (error) {
      // Если getData() не работает, продолжаем обычную обработку
      console.warn('getData() failed, using fallback extraction:', error)
    }
  }

  // Если это массив, обрабатываем каждый элемент
  if (Array.isArray(data)) {
    return data.map(item => extractPlainData(item))
  }

  // Если это объект, создаем новый объект только с данными
  if (typeof data === 'object' && data !== null) {
    const plain: Record<string, unknown> = {}
    for (const key in data) {
      // Пропускаем функции и методы
      const value = (data as any)[key]
      if (typeof value === 'function') {
        continue
      }
      // Пропускаем символы и другие несериализуемые типы
      if (typeof key === 'symbol') {
        continue
      }
      plain[key] = extractPlainData(value)
    }
    return plain
  }

  // Примитивные типы возвращаем как есть
  return data
}

/**
 * Вспомогательная функция для вызова метода Bitrix24 API через B24Frame.
 *
 * @param b24 - экземпляр B24Frame
 * @param method - имя метода API
 * @param params - параметры метода (может быть объектом или массивом, в зависимости от метода)
 */
export const callMethodPromise = async (
  b24: any,
  method: string,
  params: Record<string, unknown> | unknown[]
): Promise<unknown> => {
  try {
    const response = await b24.callMethod(method, params)

    // Проверяем, что response имеет метод getData()
    if (!response || typeof response.getData !== 'function') {
      throw new Error(`Invalid response from callMethod: ${method}`)
    }

    // Используем getData() для получения чистых данных без функций
    // Это предотвращает ошибку DataCloneError при попытке клонировать функции
    const data = response.getData()

    // Дополнительно очищаем данные от любых оставшихся функций
    return extractPlainData(data)
  } catch (error) {
    console.error(`Error in callMethodPromise for ${method}:`, error)
    throw error
  }
}

/**
 * Вспомогательная функция для пакетного вызова методов Bitrix24 API через B24Frame.
 */
export const callBatchPromise = async (b24: any, params: unknown[]): Promise<unknown> => {
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

    const response = await b24.callBatch(batchParams, true)

    if (!response || typeof response.getData !== 'function') {
      throw new Error('Invalid response from callBatch')
    }

    const data = response.getData()

    let resultArray: unknown[] = []
    for (const key in data) {
      if (key === 'result_error' || key === 'result_time' || key === 'result_total' || key === 'result_next' || key === 'time') {
        continue
      }

      const batchResult = data[key]

      // Проверяем наличие ошибки в конкретном результате
      if (batchResult && typeof batchResult === 'object' && 'error' in (batchResult as any)) {
        const errorValue = typeof (batchResult as any).error === 'function'
          ? (() => {
            try {
              return (batchResult as any).error()
            } catch {
              return (batchResult as any).error
            }
          })()
          : (batchResult as any).error
        if (errorValue) {
          const errorDescription = typeof (batchResult as any).error_description === 'function'
            ? (() => {
              try {
                return (batchResult as any).error_description()
              } catch {
                return (batchResult as any).error_description
              }
            })()
            : (batchResult as any).error_description
          console.warn(`Error in batch result ${key}:`, errorValue)
          // Добавляем объект с ошибкой, чтобы вызывающий код мог его обработать
          resultArray.push({ error: errorValue, error_description: errorDescription })
          continue
        }
      }

      // Извлекаем данные из результата batch запроса
      const result = (batchResult as any)?.items ?? (batchResult as any)?.result ?? batchResult
      if (Array.isArray(result)) {
        resultArray = [...resultArray, ...result]
      } else if (result && typeof result === 'object') {
        // user.get возвращает объект вида { result: [...], total, next, time }
        if (Array.isArray((result as any).result)) {
          resultArray = [...resultArray, ...(result as any).result]
        } else if ((result as any).tasks && Array.isArray((result as any).tasks)) {
          resultArray = [...resultArray, ...(result as any).tasks]
        } else {
          resultArray.push(result)
        }
      } else if (result) {
        resultArray.push(result)
      }
    }

    return extractPlainData(resultArray)
  } catch (error) {
    console.error('Error in callBatchPromise:', error)
    throw error
  }
}

