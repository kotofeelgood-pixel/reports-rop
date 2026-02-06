import { callMethodPromise, callBatchPromise } from './core'

/**
 * Возвращает массив участников группы соцсети "Запрос callBatch".
 *
 * https://dev.1c-bitrix.ru/rest_help/sonet_group/sonet_group_user_get.php
 */
export const sonetGroupUserList = async (arId: unknown[] = []): Promise<unknown[]> => {
  try {
    const params: unknown[] = []
    for (const id of arId) {
      params.push([
        'sonet_group.user.get',
        {
          ID: id,
        }
      ])
    }

    let data: unknown[] = []
    const chunkSize = 50
    for (let i = 0; i < params.length; i += chunkSize) {
      const chunk = params.slice(i, i + chunkSize)
      const resCallBatch = await callBatchPromise(chunk) as unknown[]
      const mergedArray = [...data, ...resCallBatch]
      data = [...new Set(mergedArray)]
    }

    return data
  } catch (error) {
    console.error('sonet_group.user.get (list) error:', error)
    return []
  }
}

/**
 * Возвращает массив участников группы соцсети.
 *
 * https://dev.1c-bitrix.ru/rest_help/sonet_group/sonet_group_user_get.php
 */
export const sonetGroupUserGet = async (id: unknown): Promise<unknown[]> => {
  try {
    const response: any = await callMethodPromise('sonet_group.user.get', {
      ID: id,
    })

    const answer = response
    return answer?.result ?? []
  } catch (error) {
    console.error('sonet_group.user.get error:', error)
    return []
  }
}

/**
 * Возвращает массив групп соцсети, каждая из которых содержит массив полей.
 *
 * https://dev.1c-bitrix.ru/rest_help/sonet_group/sonet_group_get.php
 */
export const sonetGroupGet = async (
  filter: Record<string, unknown> = {},
  order: Record<string, string> = { 'NAME': 'ASC' }
): Promise<unknown[]> => {
  try {
    const response: any = await callMethodPromise('sonet_group.get', {
      ORDER: order,
      FILTER: filter,
    })

    const answer = response
    if (answer?.next === undefined) {
      return answer?.result ?? []
    }

    const total = answer.total
    let next = answer.next
    const params: unknown[] = [
      [
        'sonet_group.get',
        {
          ORDER: order,
          FILTER: filter,
          start: 0,
        },
      ]
    ]

    while (next <= total) {
      params.push([
        'sonet_group.get',
        {
          ORDER: order,
          FILTER: filter,
          start: next,
        },
      ])
      next += answer.next
    }

    let data: unknown[] = []
    const chunkSize = 50
    for (let i = 0; i < params.length; i += chunkSize) {
      const chunk = params.slice(i, i + chunkSize)
      const batchResult = await callBatchPromise(chunk) as unknown[]
      data.push(...batchResult)
    }

    return data
  } catch (error) {
    console.error('sonet_group.get error:', error)
    return []
  }
}

/**
 * Получение фильтрованного списка подразделений.
 *
 * https://dev.1c-bitrix.ru/rest_help/departments/department_get.php
 */
export const departmentGet = async (
  id: unknown = null,
  name: unknown = null,
  parent: unknown = null,
  uf_head: unknown = null,
  sort: string = 'ID',
  order: string = 'ASC'
): Promise<unknown[]> => {
  try {
    const params: Record<string, unknown> = {
      sort,
      order,
    }

    if (id !== null && id !== undefined) {
      params.ID = id
    }
    if (name !== null && name !== undefined) {
      params.NAME = name
    }
    if (parent !== null && parent !== undefined) {
      params.PARENT = parent
    }
    if (uf_head !== null && uf_head !== undefined) {
      params.UF_HEAD = uf_head
    }

    const response: any = await callMethodPromise('department.get', params)

    const answer = response
    let allResults = Array.isArray(answer?.result) ? answer.result : []

    if (answer?.next !== undefined && answer?.total !== undefined) {
      const total = answer.total
      let next = answer.next

      while (next < total) {
        const nextParams = { ...params, start: next }
        const nextResponse: any = await callMethodPromise('department.get', nextParams)
        const nextAnswer = nextResponse
        if (Array.isArray(nextAnswer?.result)) {
          allResults = [...allResults, ...nextAnswer.result]
        }
        next = nextAnswer?.next || total
      }
    }

    return allResults
  } catch (error) {
    console.error('department.get error:', error)
    return []
  }
}

