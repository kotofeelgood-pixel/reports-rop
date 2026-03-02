import { onMounted, ref } from 'vue'
import { getDealCategories } from '@/api/routes/crm'
import { crmStatusList, type CrmStatus } from '@/api/crm'

type SelectItem = {
  value: string
  label: string
  disabled?: boolean
}

export const useDealStageOptions = () => {
  const items = ref<SelectItem[]>([])
  const loading = ref(false)

  const load = async () => {
    loading.value = true
    try {
      const categories = await getDealCategories()

      const statusesByCategory = await Promise.all(
        categories.map(async (category) => {
          const entityId = category.id === 0 ? 'DEAL_STAGE' : `DEAL_STAGE_${category.id}`
          const statuses = await crmStatusList({ ENTITY_ID: entityId })
          return { category, statuses }
        }),
      )

      const result: SelectItem[] = []

      for (const { category, statuses } of statusesByCategory) {
        result.push({
          value: `category-${category.id}`,
          label: `Воронка: ${category.name}`,
          disabled: true,
        })

        const sorted = [...statuses].sort((a: CrmStatus, b: CrmStatus) => {
          const aSort = Number(a.SORT ?? 0)
          const bSort = Number(b.SORT ?? 0)
          return aSort - bSort
        })

        for (const status of sorted) {
          const code = String(status.STATUS_ID ?? '').trim()
          const name = String(status.NAME ?? '').trim()
          if (!code || !name) continue

          result.push({
            value: code,
            label: `- ${name}`,
          })
        }
      }

      items.value = result
    } catch (error) {
      console.error(error)
      items.value = []
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    void load()
  })

  return {
    items,
    loading,
    reload: load,
  }
}

