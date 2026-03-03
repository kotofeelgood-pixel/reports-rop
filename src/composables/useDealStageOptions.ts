import { onMounted, ref } from 'vue'
import type { SelectMenuItem } from '@bitrix24/b24ui-nuxt'
import { getDealCategories } from '@/api/routes/crm'
import { crmStatusList, type CrmStatus } from '@/api/crm'

export const useDealStageOptions = () => {
  const items = ref<SelectMenuItem[]>([])
  const loading = ref(false)
  const stageLookup = ref<Record<string, { category: string; label: string }>>({})

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

      const result: SelectMenuItem[] = []
      const lookup: Record<string, { category: string; label: string }> = {}

      statusesByCategory.forEach(({ category, statuses }, index) => {
        const categoryName = String(category.name ?? '')

        // Заголовок группы: название воронки
        result.push({
          type: 'label',
          label: categoryName,
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

          const label = `- ${name}`

          result.push({
            value: code,
            label,
          })

          lookup[code] = {
            category: categoryName,
            label,
          }
        }

        // Сепаратор между воронками (кроме последней)
        if (index < statusesByCategory.length - 1) {
          result.push({
            type: 'separator',
          })
        }
      })

      items.value = result
      stageLookup.value = lookup
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
    stageLookup,
    reload: load,
  }
}

