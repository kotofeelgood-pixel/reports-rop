<!-- Блок «4. Выберите ключевые этапы воронки»: выбор этапов для отчёта. -->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useReportFiltersStore } from '@/stores/reportFilters'
import FiltersColumn from '../FiltersColumn.vue'

const { excludedStages } = storeToRefs(useReportFiltersStore())
</script>

<template>
  <FiltersColumn title="4. Выберите ключевые этапы воронки">
    <div class="space-y-2">
      <B24SelectMenu
        v-model="excludedStages"
        :items="[{ value: 'negotiations', label: 'Переговоры в процессе' }]"
        value-key="value"
        label-key="label"
        placeholder="- Переговоры в процессе"
      />
    </div>
  </FiltersColumn>
</template>
