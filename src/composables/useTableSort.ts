import { ref, computed } from 'vue'
import { parseDuration } from '@/tools/parseDuration'

export type SortKey = 'name' | 'outgoing' | 'incoming' | 'missed' | 'duration'
export type SortDir = 'asc' | 'desc'

type Row = {
  id: string
  name: string
  outgoing: number
  incoming: number
  missed: number
  duration: string
}

/**
 * Композабл для управления сортировкой таблицы
 * @param rows - массив строк таблицы для сортировки
 * @returns объект с состоянием сортировки и отсортированными данными
 */
export function useTableSort(rows: { value: Row[] }) {
  const sortBy = ref<SortKey | null>(null)
  const sortDir = ref<SortDir>('asc')

  const setSort = (key: SortKey) => {
    if (sortBy.value === key) {
      sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortBy.value = key
      sortDir.value = 'asc'
    }
  }

  const sortedRows = computed(() => {
    const data = [...rows.value]
    if (!sortBy.value) return data
    const dir = sortDir.value === 'asc' ? 1 : -1
    return data.sort((a, b) => {
      let cmp = 0
      switch (sortBy.value) {
        case 'name':
          cmp = a.name.localeCompare(b.name)
          break
        case 'outgoing':
          cmp = a.outgoing - b.outgoing
          break
        case 'incoming':
          cmp = a.incoming - b.incoming
          break
        case 'missed':
          cmp = a.missed - b.missed
          break
        case 'duration':
          cmp = parseDuration(a.duration) - parseDuration(b.duration)
          break
        default:
          return 0
      }
      return cmp * dir
    })
  })

  return {
    sortBy,
    sortDir,
    setSort,
    sortedRows,
  }
}
