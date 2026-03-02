<!-- Блок «4. Исключить стадии сделок»: стадии для исключения из отчёта. -->
<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportFiltersStore } from '@/stores/reportFilters'
import { useDealStageOptions } from '@/composables/useDealStageOptions'
import FiltersColumn from '../FiltersColumn.vue'

const { excludedStages } = storeToRefs(useReportFiltersStore())
const { items: stageItems, stageLookup } = useDealStageOptions()

const selectedStageDisplay = computed(() =>
  excludedStages.value
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
  excludedStages.value = excludedStages.value.filter((v) => v !== code)
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
        v-model="excludedStages"
        multiple
        :items="stageItems"
        value-key="value"
        label-key="label"
        placeholder="- Новая"
      />
    </div>
  </FiltersColumn>
</template>
