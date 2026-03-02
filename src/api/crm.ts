import { useB24 } from '../composables/useB24'
import { callMethodPromise, callBatchPromise } from './core'

type CrmContact = { NAME?: string; LAST_NAME?: string; [key: string]: unknown }
type CrmLead = { TITLE?: string; NAME?: string; LAST_NAME?: string; [key: string]: unknown }
type CrmCompany = { TITLE?: string; [key: string]: unknown }

/**
 * Получить контакт по ID.
 * https://dev.1c-bitrix.ru/rest_help/crm/contacts/crm_contact_get.php
 */
export const crmContactGet = async (id: string): Promise<CrmContact | null> => {
  const b24 = await useB24()
  try {
    const response: any = await callMethodPromise(b24, 'crm.contact.get', { id })
    const result = response?.result
    return result && typeof result === 'object' ? result as CrmContact : null
  } catch {
    return null
  }
}

/**
 * Получить лид по ID.
 * https://dev.1c-bitrix.ru/rest_help/crm/leads/crm_lead_get.php
 */
export const crmLeadGet = async (id: string): Promise<CrmLead | null> => {
  const b24 = await useB24()
  try {
    const response: any = await callMethodPromise(b24, 'crm.lead.get', { id })
    const result = response?.result
    return result && typeof result === 'object' ? result as CrmLead : null
  } catch {
    return null
  }
}

/**
 * Получить компанию по ID.
 * https://dev.1c-bitrix.ru/rest_help/crm/companies/crm_company_get.php
 */
export const crmCompanyGet = async (id: string): Promise<CrmCompany | null> => {
  const b24 = await useB24()
  try {
    const response: any = await callMethodPromise(b24, 'crm.company.get', { id })
    const result = response?.result
    return result && typeof result === 'object' ? result as CrmCompany : null
  } catch {
    return null
  }
}

/**
 * Получить отображаемое имя сущности CRM по типу и ID.
 * CONTACT — контакт (NAME + LAST_NAME), LEAD — лид (TITLE или NAME+LAST_NAME), COMPANY — компания (TITLE).
 */
export const getCrmEntityName = async (entityType: string, entityId: string): Promise<string> => {
  const id = String(entityId ?? '').trim()
  if (!id) return '—'
  const type = String(entityType ?? '').toUpperCase()
  if (type === 'CONTACT') {
    const contact = await crmContactGet(id)
    if (!contact) return '—'
    const name = [contact.NAME, contact.LAST_NAME].filter(Boolean).join(' ').trim()
    return name || '—'
  }
  if (type === 'LEAD') {
    const lead = await crmLeadGet(id)
    if (!lead) return '—'
    const title = lead.TITLE?.trim()
    if (title) return title
    const name = [lead.NAME, lead.LAST_NAME].filter(Boolean).join(' ').trim()
    return name || '—'
  }
  if (type === 'COMPANY') {
    const company = await crmCompanyGet(id)
    if (!company) return '—'
    return company.TITLE?.trim() || '—'
  }
  return '—'
}

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
 * Получить список направлений сделок (категорий CRM).
 * entityTypeId: 2 — сделки.
 *
 * https://dev.1c-bitrix.ru/rest_help/crm/category/crm_category_list.php
 */
export type CrmCategory = { id: number; name: string; sort?: number; entityTypeId?: number; isDefault?: string }

export const crmCategoryList = async (entityTypeId: number = 2): Promise<CrmCategory[]> => {
  const b24 = await useB24()
  try {
    const response: any = await callMethodPromise(b24, 'crm.category.list', { entityTypeId })
    const result = response?.result
    if (!result) return []
    const categories = result?.categories ?? result
    const list = Array.isArray(categories) ? categories : []
    return list.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
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

