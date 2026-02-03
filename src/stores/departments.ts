import { computed, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { getDepartments } from '@/api/routes/company'

export type BitrixDepartment = {
  ID?: string | number
  NAME?: string
  PARENT?: string | number
  [key: string]: unknown
}

export type AppDepartment = {
  id: string
  name: string
  parentId?: string | null
  raw: BitrixDepartment
}

const toId = (v: unknown): string => String(v ?? '').trim()

export const useDepartmentsStore = defineStore('departments', () => {
  const departments = ref<AppDepartment[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const loadedAt = ref<number | null>(null)

  const departmentsById = computed(() => {
    const map = new Map<string, AppDepartment>()
    for (const d of departments.value) map.set(d.id, d)
    return map
  })

  const fetchDepartments = async (opts?: { force?: boolean }) => {
    const force = Boolean(opts?.force)
    if (!force && loadedAt.value && departments.value.length) return departments.value

    isLoading.value = true
    error.value = null
    try {
      const raw = await getDepartments()
      const rawArr = Array.isArray(raw) ? raw as BitrixDepartment[] : []
      departments.value = rawArr
        .map((d) => {
          const id = toId(d.ID)
          if (!id) return null
          const name = String(d.NAME ?? '').trim()
          const parentId = d.PARENT != null ? toId(d.PARENT) : null
          return {
            id,
            name: name || `Отдел #${id}`,
            parentId: parentId || null,
            raw: d,
          } satisfies AppDepartment
        })
        .filter(Boolean) as AppDepartment[]
      loadedAt.value = Date.now()
      return departments.value
    } catch (e) {
      console.error('fetchDepartments:', e)
      error.value = e instanceof Error ? e.message : String(e)
      departments.value = []
      loadedAt.value = null
      return []
    } finally {
      isLoading.value = false
    }
  }

  return {
    departments,
    departmentsById,
    isLoading,
    error,
    loadedAt,
    fetchDepartments,
  }
})

export const useDepartmentsStoreRefs = () => storeToRefs(useDepartmentsStore())
