import { requestWrapper } from '@/api/index'

export const getDealCategories = () => requestWrapper<unknown, unknown>('crm.category.list', {entityTypeId: 2}, (result) => result)

