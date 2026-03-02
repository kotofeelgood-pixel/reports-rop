<!-- Блок «4. Исключить стадии сделок»: стадии для исключения из отчёта. -->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useReportFiltersStore } from '@/stores/reportFilters'
import { useDealStageOptions } from '@/composables/useDealStageOptions'
import FiltersColumn from '../FiltersColumn.vue'

const { excludedStages } = storeToRefs(useReportFiltersStore())
const { items: stageItems } = useDealStageOptions()
</script>

<template>
  <FiltersColumn title="4. Исключить стадии сделок:">
    <div class="space-y-2">
      <B24SelectMenu
        v-model="excludedStages"
        :items="stageItems"
        value-key="value"
        label-key="label"
        placeholder="- Новая"
      />
    </div>
  </FiltersColumn>
</template>
