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

/**
 * Найти контакт по номеру телефона.
 * https://dev.1c-bitrix.ru/rest_help/crm/contacts/crm_contact_list.php
 */
export const findContactByPhone = async (phoneNumber: string): Promise<{ id: string } | null> => {
  const b24 = await useB24()
  try {
    // Нормализуем номер телефона для поиска
    const normalizedPhone = phoneNumber.replace(/\D/g, '')
    if (!normalizedPhone) return null

    const response: any = await callMethodPromise(b24, 'crm.contact.list', {
      filter: {
        'PHONE': `%${normalizedPhone}%`,
      },
      select: ['ID', 'PHONE'],
    })

    const contacts = response?.result || []
    // Ищем точное совпадение
    for (const contact of contacts) {
      const phones = Array.isArray(contact.PHONE) ? contact.PHONE : [contact.PHONE]
      for (const phone of phones) {
        if (phone && String(phone.VALUE || phone).replace(/\D/g, '') === normalizedPhone) {
          return { id: String(contact.ID) }
        }
      }
    }
    return null
  } catch (error) {
    console.error('findContactByPhone error:', error)
    return null
  }
}

/**
 * Найти лид по номеру телефона.
 * https://dev.1c-bitrix.ru/rest_help/crm/leads/crm_lead_list.php
 */
export const findLeadByPhone = async (phoneNumber: string): Promise<{ id: string } | null> => {
  const b24 = await useB24()
  try {
    const normalizedPhone = phoneNumber.replace(/\D/g, '')
    if (!normalizedPhone) return null

    const response: any = await callMethodPromise(b24, 'crm.lead.list', {
      filter: {
        'PHONE': `%${normalizedPhone}%`,
      },
      select: ['ID', 'PHONE'],
    })

    const leads = response?.result || []
    for (const lead of leads) {
      const phones = Array.isArray(lead.PHONE) ? lead.PHONE : [lead.PHONE]
      for (const phone of phones) {
        if (phone && String(phone.VALUE || phone).replace(/\D/g, '') === normalizedPhone) {
          return { id: String(lead.ID) }
        }
      }
    }
    return null
  } catch (error) {
    console.error('findLeadByPhone error:', error)
    return null
  }
}

/**
 * Создать контакт в Bitrix24 по номеру телефона.
 * https://dev.1c-bitrix.ru/rest_help/crm/contacts/crm_contact_add.php
 */
export const createContactFromPhone = async (phoneNumber: string): Promise<{ id: string } | null> => {
  const b24 = await useB24()
  try {
    // Сначала проверяем, существует ли уже контакт с таким номером
    const existing = await findContactByPhone(phoneNumber)
    if (existing) {
      return existing
    }

    const response: any = await callMethodPromise(b24, 'crm.contact.add', {
      fields: {
        PHONE: [{ VALUE: phoneNumber, VALUE_TYPE: 'WORK' }],
        NAME: phoneNumber, // Используем номер как имя, если нет другой информации
      },
    })

    const id = response?.result
    return id ? { id: String(id) } : null
  } catch (error) {
    console.error('createContactFromPhone error:', error)
    return null
  }
}

/**
 * Создать лид в Bitrix24 по номеру телефона.
 * https://dev.1c-bitrix.ru/rest_help/crm/leads/crm_lead_add.php
 */
export const createLeadFromPhone = async (phoneNumber: string): Promise<{ id: string } | null> => {
  const b24 = await useB24()
  try {
    // Сначала проверяем, существует ли уже лид с таким номером
    const existing = await findLeadByPhone(phoneNumber)
    if (existing) {
      return existing
    }

    const response: any = await callMethodPromise(b24, 'crm.lead.add', {
      fields: {
        PHONE: [{ VALUE: phoneNumber, VALUE_TYPE: 'WORK' }],
        TITLE: `Лид: ${phoneNumber}`, // Используем номер в заголовке
      },
    })

    const id = response?.result
    return id ? { id: String(id) } : null
  } catch (error) {
    console.error('createLeadFromPhone error:', error)
    return null
  }
}

