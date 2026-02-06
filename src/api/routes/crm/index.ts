import { crmContactList } from '~/api/crm'
import { callMethodPromise } from '~/api/core'

export const getDealCategories = async () => {
  return callMethodPromise('crm.category.list', { entityTypeId: 2 })
}

// Используем crmContactList для получения списка контактов
export const getContacts = (
  filter: Record<string, any> = {},
  select: string[] = ['*'],
  order: Record<string, 'asc' | 'desc'> = { ID: 'desc' },
) =>
  crmContactList(filter, select, order)

