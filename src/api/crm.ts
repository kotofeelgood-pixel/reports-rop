import { useB24 } from '../composables/useB24'
import { callMethodPromise, callBatchPromise } from './core'

/**
 * Получить список контактов.
 *
 * https://apidocs.bitrix24.ru/api-reference/crm/contacts/crm-contact-list.html
 */
export const crmContactList = async (
  filter: Record<string, unknown> = {},
  select: string[] = ['*'],
  order: Record<string, string> = { 'ID': 'desc' }
): Promise<unknown[]> => {
  const b24 = await useB24()
  try {
    const response: any = await callMethodPromise(b24, 'crm.contact.list', {
      filter,
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
        'crm.contact.list',
        {
          filter,
          order,
          select,
          start: 0,
        },
      ]
    ]

    while (next <= total) {
      params.push([
        'crm.contact.list',
        {
          filter,
          order,
          select,
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

/**
 * Получить список дел.
 *
 * https://apidocs.bitrix24.ru/api-reference/crm/timeline/activities/activity-base/crm-activity-list.html
 */
export const crmActivityList = async (
  filter: Record<string, unknown> = {},
  select: string[] = ['*'],
  order: Record<string, string> = { 'ID': 'desc' }
): Promise<unknown[]> => {
  const b24 = await useB24()
  try {
    const response: any = await callMethodPromise(b24, 'crm.activity.list', {
      filter,
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
        'crm.activity.list',
        {
          filter,
          order,
          select,
          start: 0,
        },
      ]
    ]

    while (next <= total) {
      params.push([
        'crm.activity.list',
        {
          filter,
          order,
          select,
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

/**
 * Возвращает список сделок по фильтру.
 *
 * https://dev.1c-bitrix.ru/rest_help/crm/cdeals/crm_deal_list.php
 */
export const crmDealList = async (
  filter: Record<string, unknown> = {},
  select: string[] = ['*', 'UF_*'],
  order: Record<string, string> = { 'ID': 'ASC' }
): Promise<unknown[]> => {
  const b24 = await useB24()
  try {
    const response: any = await callMethodPromise(b24, 'crm.deal.list', {
      filter,
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
        'crm.deal.list',
        {
          filter,
          order,
          select,
          start: 0,
        },
      ]
    ]

    while (next <= total) {
      params.push([
        'crm.deal.list',
        {
          filter,
          order,
          select,
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

