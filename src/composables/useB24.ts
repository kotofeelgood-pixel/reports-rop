/**
 * Унифицированная точка доступа к Bitrix24 JS API.
 *
 * В приложении используются обёртки `callMethodPromise/callBatchPromise`,
 * которые ожидают объект с методами `callMethod/callBatch`, возвращающими
 * промис и результат с `getData()`.
 *
 * В разных окружениях Bitrix24 может предоставлять:
 * - `window.BX24` (классический iframe API, callback-based)
 * - обёртку/фрейм от UI-плагина (promise-based)
 *
 * Здесь мы приводим оба варианта к единому интерфейсу.
 */

type B24ResultLike = {
  getData: () => unknown
}

type B24Like = {
  callMethod: (method: string, params: Record<string, unknown> | unknown[]) => Promise<B24ResultLike>
  callBatch: (batch: Record<string, { method: string; params: Record<string, unknown> | unknown[] }>, haltOnError?: boolean) => Promise<B24ResultLike>
}

type Bx24CallbackResult = {
  answer?: unknown
  data?: () => unknown
  error?: () => unknown
}

type Bx24Like = {
  callMethod: (
    method: string,
    params: Record<string, unknown> | unknown[],
    cb: (res: Bx24CallbackResult) => void
  ) => void
  callBatch: (
    batch: Record<string, { method: string; params: Record<string, unknown> | unknown[] }>,
    cb: (res: Bx24CallbackResult) => void,
    haltOnError?: boolean
  ) => void
  getDomain?: () => string
}

const getError = (res: Bx24CallbackResult): unknown => {
  if (!res?.error || typeof res.error !== 'function') return null
  try {
    return res.error()
  } catch {
    return null
  }
}

function wrapBx24Api (bx24: Bx24Like): B24Like {
  return {
    callMethod(method: string, params: Record<string, unknown> | unknown[]) {
      return new Promise<B24ResultLike>((resolve, reject) => {
        bx24.callMethod(method, params, (res) => {
          try {
            const err = getError(res)
            if (err) {
              reject(err)
              return
            }
            // `answer` содержит result/next/total — это важно для постранички.
            const data = res?.answer ?? res?.data?.() ?? res
            resolve({ getData: () => data })
          } catch (e) {
            reject(e)
          }
        })
      })
    },
    callBatch(
      batch: Record<string, { method: string; params: Record<string, unknown> | unknown[] }>,
      haltOnError: boolean = true
    ) {
      return new Promise<B24ResultLike>((resolve, reject) => {
        bx24.callBatch(batch, (res) => {
          try {
            const err = getError(res)
            if (err) {
              reject(err)
              return
            }
            const data = res?.answer ?? res?.data?.() ?? res
            resolve({ getData: () => data })
          } catch (e) {
            reject(e)
          }
        }, haltOnError)
      })
    },
  }
}

export const useB24 = async (): Promise<B24Like> => {
  const w = globalThis as unknown as { BX24?: unknown; b24?: unknown }

  // 1) Классический BX24 (callback-based)
  if (w?.BX24 && typeof (w.BX24 as any).callMethod === 'function') {
    return wrapBx24Api(w.BX24 as Bx24Like)
  }

  // 2) Если плагин/обвязка уже предоставляет promise-based API
  // (например, объект с callMethod/callBatch, которые возвращают Promise)
  if (w?.b24 && typeof (w.b24 as any).callMethod === 'function') {
    return w.b24 as B24Like
  }

  throw new Error('Bitrix24 API недоступен: не найден window.BX24 (или совместимая обёртка)')
}

