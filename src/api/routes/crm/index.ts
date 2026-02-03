import { crmContactList } from '~/api/crm'
import { useB24 } from '~/composables/useB24'
import { callMethodPromise } from '~/api/core'

export const getDealCategories = async () => {
  const b24 = await useB24()
  return callMethodPromise(b24, 'crm.category.list', { entityTypeId: 2 })
}

// Используем crmContactList для получения списка контактов
export const getContacts = (
  filter: Record<string, any> = {},
  select: string[] = ['*'],
  order: Record<string, 'asc' | 'desc'> = { ID: 'desc' },
) =>
  crmContactList(filter, select, order)

