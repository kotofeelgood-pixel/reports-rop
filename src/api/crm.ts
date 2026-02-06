import { callMethodPromise, callMethodAll, callBatchPromise } from './core'

type CrmContact = { NAME?: string; LAST_NAME?: string; [key: string]: unknown }
type CrmLead = { TITLE?: string; NAME?: string; LAST_NAME?: string; [key: string]: unknown }
type CrmCompany = { TITLE?: string; [key: string]: unknown }

/**
 * Получить контакт по ID.
 * https://dev.1c-bitrix.ru/rest_help/crm/contacts/crm_contact_get.php
 */
export const crmContactGet = async (id: string): Promise<CrmContact | null> => {
  try {
    const response: any = await callMethodPromise('crm.contact.get', { id })
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
  try {
    const response: any = await callMethodPromise('crm.lead.get', { id })
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
  try {
    const response: any = await callMethodPromise('crm.company.get', { id })
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
  try {
    // Используем callMethodAll для автоматической загрузки всех данных
    const data = await callMethodAll('crm.contact.list', {
      filter,
      order,
      select,
    })

    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('crm.contact.list error:', error)
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
  try {
    // Используем callMethodAll для автоматической загрузки всех данных
    const data = await callMethodAll('crm.activity.list', {
      filter,
      order,
      select,
    })

    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('crm.activity.list error:', error)
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
  try {
    // Используем callMethodAll для автоматической загрузки всех данных
    const data = await callMethodAll('crm.deal.list', {
      filter,
      order,
      select,
    })

    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('crm.deal.list error:', error)
    return []
  }
}

