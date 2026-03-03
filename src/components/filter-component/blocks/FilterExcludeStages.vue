<!-- Блок «4. Исключить стадии сделок»: стадии для исключения из отчёта. -->
<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportFiltersStore } from '@/stores/reportFilters'
import { useDealStageOptions } from '@/composables/useDealStageOptions'
import Expand1Icon from '@bitrix24/b24icons-vue/actions/Expand1Icon'
import FiltersColumn from '../FiltersColumn.vue'

const { excludedStages } = storeToRefs(useReportFiltersStore())
const { items: stageItems, stageLookup } = useDealStageOptions()

const selectedCodes = computed<string[]>(() => {
  const raw = excludedStages.value as unknown
  if (Array.isArray(raw)) return raw as string[]
  if (raw == null || raw === '') return []
  return [String(raw)]
})

const selectedStageDisplay = computed(() =>
  selectedCodes.value
    .map((code) => {
      const info = stageLookup.value[code]
      if (!info) return null
      return {
        value: code,
        category: info.category,
        label: info.label,
      }
    })
    .filter((item): item is { value: string; category: string; label: string } => item !== null),
)

const removeStage = (code: string) => {
  const current = selectedCodes.value
  excludedStages.value = current.filter((v) => v !== code) as any
}
</script>

<template>
  <FiltersColumn title="4. Исключить стадии сделок:">
    <div class="space-y-2">
      <div v-if="selectedStageDisplay.length" class="space-y-1 text-sm">
        <p v-for="item in selectedStageDisplay" :key="item.value">
          {{ item.category }}: {{ item.label }}
          <button
            type="button"
            class="ml-1 text-sky-500 hover:underline"
            @click="removeStage(item.value)"
          >
            [x]
          </button>
        </p>
      </div>

      <B24SelectMenu
        virtualize
        v-model="excludedStages"
        multiple
        :items="stageItems"
        value-key="value"
        label-key="label"
        class="w-[350px]"
        :b24ui="{ value: 'hidden' }"
        placeholder="- Новая"
        :trailing-icon="Expand1Icon"
      />
    </div>
  </FiltersColumn>
</template>
