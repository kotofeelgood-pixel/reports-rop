import { useB24 } from '../composables/useB24'
import { callMethodPromise, callBatchPromise } from './core'

/**
 * Возвращает список записей о затраченном времени по задаче.
 *
 * https://dev.1c-bitrix.ru/rest_help/tasks/task/elapseditem/getlist.php
 * Согласно документации, параметры передаются как объект с ключами в верхнем регистре.
 */
export const taskElapseditemGetlist = async (
  filter: Record<string, unknown> = {},
  select: string[] = ['*'],
  order: Record<string, string> = { 'ID': 'desc' }
): Promise<unknown[]> => {
  const b24 = await useB24()
  try {
    const requestParams: Record<string, unknown> = {
      ORDER: order,
      FILTER: filter
    }

    if (select && select.length > 0) {
      requestParams.SELECT = select
    } else {
      requestParams.SELECT = ['*']
    }

    const response: any = await callMethodPromise(b24, 'task.elapseditem.getlist', requestParams)
    const answer = response

    if (answer?.next === undefined || answer?.next === null) {
      return answer?.result ?? []
    }

    const allResults: unknown[] = [...(answer?.result ?? [])]

    const total = answer.total || 0
    let next = answer.next
    let page = 1

    const selectForBatch = (select && select.length > 0) ? select : ['*']

    const params: unknown[] = []

    while (next && next <= total && page < 100) {
      page += 1
      params.push([
        'task.elapseditem.getlist',
        {
          ORDER: order,
          FILTER: filter,
          SELECT: selectForBatch,
          PARAMS: {
            NAV_PARAMS: {
              iNumPage: page
            }
          }
        }
      ])
      next += answer.next
    }

    if (params.length > 0) {
      const chunkSize = 50
      for (let i = 0; i < params.length; i += chunkSize) {
        const chunk = params.slice(i, i + chunkSize)
        const batchResults = await callBatchPromise(b24, chunk)
        if (Array.isArray(batchResults)) {
          allResults.push(...batchResults)
        }
      }
    }

    return allResults
  } catch (error) {
    console.error(error)
    return []
  }
}

/**
 * Добавляет запись о затраченном времени по задаче.
 * https://dev.1c-bitrix.ru/rest_help/tasks/task/elapseditem/add.php
 */
export const taskElapseditemAdd = async (
  taskId: number,
  userId: number,
  minutes: number,
  comment: string = '',
  date?: string
): Promise<{ id?: number; error?: string }> => {
  const b24 = await useB24()
  try {
    const params: Record<string, unknown> = {
      TASKID: taskId,
      USERID: userId,
      MINUTES: minutes
    }
    if (comment) params.TEXT = comment
    if (date) params.SETUPDATE = date
    const response: any = await callMethodPromise(b24, 'task.elapseditem.add', params)
    const result = response?.result
    if (result && typeof result === 'object' && result.id !== undefined) {
      return { id: result.id }
    }
    if (response?.error) return { error: response.error }
    return {}
  } catch (error) {
    console.error(error)
    return { error: String(error) }
  }
}

/**
 * Возвращает информацию о задаче по её ID.
 *
 * https://dev.1c-bitrix.ru/rest_help/tasks/task/tasks/tasks_task_get.php
 */
/**
 * Получить пункты чек-листа задачи.
 * https://dev.1c-bitrix.ru/rest_help/tasks/task/checklistitem/getlist.php
 */
export const taskChecklistitemGetlist = async (taskId: number): Promise<unknown[]> => {
  const b24 = await useB24()
  try {
    const response: any = await callMethodPromise(b24, 'task.checklistitem.getlist', {
      TASKID: taskId
    })
    const result = response?.result ?? response
    return Array.isArray(result) ? result : []
  } catch (error) {
    console.warn('task.checklistitem.getlist error for task', taskId, error)
    return []
  }
}

export const tasksTaskGet = async (
  taskId: number,
  select: string[] = ['ID', 'TITLE', 'GROUP_ID']
): Promise<unknown> => {
  const b24 = await useB24()
  try {
    const response: any = await callMethodPromise(b24, 'tasks.task.get', {
      taskId,
      select
    })

    const answer = response
    return answer?.result?.task ?? answer?.task ?? null
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * Возвращает массив задач, каждая из которых содержит массив полей.
 *
 * https://dev.1c-bitrix.ru/rest_help/tasks/task/tasks/tasks_task_list.php
 */
export const tasksTaskList = async (
  filter: Record<string, unknown> = {},
  select: string[] = ['*'],
  order: Record<string, string> = { 'ID': 'ASC' }
): Promise<unknown[]> => {
  const b24 = await useB24()
  try {
    const response: any = await callMethodPromise(b24, 'tasks.task.list', {
      filter,
      select,
      order,
    })

    const answer = response
    if (answer?.next === undefined) {
      return answer?.result?.tasks ?? answer?.tasks ?? []
    }

    const total = answer.total
    let next = answer.next
    const params: unknown[] = [
      [
        'tasks.task.list',
        {
          filter,
          select,
          order,
          start: 0,
        },
      ]
    ]

    while (next <= total) {
      params.push([
        'tasks.task.list',
        {
          filter,
          select,
          order,
          start: next,
        },
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

