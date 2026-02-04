import { computed, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { getUsers } from '@/api/routes/company'

export type BitrixUser = {
  ID?: string | number
  NAME?: string
  LAST_NAME?: string
  LOGIN?: string
  PERSONAL_PHOTO?: string
  UF_DEPARTMENT?: Array<string | number>
  [key: string]: unknown
}

export type AppUser = {
  id: string
  name: string
  photo?: string | null
  departmentIds: string[]
  raw: BitrixUser
}

function buildUserName (u: BitrixUser): string {
  const name = String(u.NAME ?? '').trim()
  const last = String(u.LAST_NAME ?? '').trim()
  const full = `${last} ${name}`.trim()
  return full || String(u.LOGIN ?? u.ID ?? '').trim() || 'Без имени'
}

function toStringArray (v: unknown): string[] {
  if (!Array.isArray(v)) return []
  return v
    .map(x => String(x).trim())
    .filter(Boolean)
}

export const useUsersStore = defineStore('users', () => {
  const users = ref<AppUser[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const loadedAt = ref<number | null>(null)

  const usersById = computed(() => {
    const map = new Map<string, AppUser>()
    for (const u of users.value) map.set(u.id, u)
    return map
  })

  const fetchUsers = async (opts?: { force?: boolean }) => {
    const force = Boolean(opts?.force)
    if (!force && loadedAt.value && users.value.length) return users.value

    isLoading.value = true
    error.value = null
    try {
      const raw = await getUsers()
      const rawArr = Array.isArray(raw) ? raw as BitrixUser[] : []
      users.value = rawArr
        .map((u) => {
          const id = String(u.ID ?? '').trim()
          if (!id) return null
          const photo = u.PERSONAL_PHOTO ? String(u.PERSONAL_PHOTO) : null
          return {
            id,
            name: buildUserName(u),
            photo,
            departmentIds: toStringArray(u.UF_DEPARTMENT),
            raw: u,
          } satisfies AppUser
        })
        .filter(Boolean) as AppUser[]
      loadedAt.value = Date.now()

      return users.value
    } catch (e) {
      console.error('fetchUsers:', e)
      error.value = e instanceof Error ? e.message : String(e)
      users.value = []
      loadedAt.value = null
      return []
    } finally {
      isLoading.value = false
    }
  }

  return {
    users,
    usersById,
    isLoading,
    error,
    loadedAt,
    fetchUsers,
  }
})

export const useUsersStoreRefs = () => storeToRefs(useUsersStore())

