<!-- Блок «4. Исключить стадии сделок»: стадии для исключения из отчёта. -->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useReportFiltersStore } from '@/stores/reportFilters'
import FiltersColumn from '../FiltersColumn.vue'

const { excludedStages } = storeToRefs(useReportFiltersStore())
</script>

<template>
  <FiltersColumn title="4. Исключить стадии сделок:">
    <div class="space-y-2">
      <B24SelectMenu
        v-model="excludedStages"
        :items="[{ value: 'negotiations', label: 'Общая: - Переговоры в процессе' }]"
        value-key="value"
        label-key="label"
        placeholder="- Переговоры в процессе"
      />
    </div>
  </FiltersColumn>
</template>
