import { crmContactList, crmCategoryList } from '~/api/crm'

export const getDealCategories = () => crmCategoryList(2)

// Используем crmContactList для получения списка контактов
export const getContacts = (
  filter: Record<string, any> = {},
  select: string[] = ['*'],
  order: Record<string, 'asc' | 'desc'> = { ID: 'desc' },
) =>
  crmContactList(filter, select, order)

