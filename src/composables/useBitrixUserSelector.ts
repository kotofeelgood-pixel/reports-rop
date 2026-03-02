/**
 * Открывает стандартный диалог Bitrix24 для выбора сотрудников (BX24.selectUsers).
 * Работает только внутри Bitrix24 (iframe приложения).
 */
import { useReportFiltersStore } from '@/stores/reportFilters'

export function useBitrixUserSelector() {
  const store = useReportFiltersStore()

  const openUserSelector = () => {
    const bx24 = (globalThis as Window).BX24
    if (!bx24?.selectUsers) {
      console.warn('BX24.selectUsers недоступен (работает только внутри Bitrix24)')
      return
    }
    bx24.selectUsers((users: Array<{ id: number; name: string }>) => {
      store.selectedUserIds = users.map((u) => String(u.id))
    })
  }

  return { openUserSelector }
}
