<!-- Подблок «Период группировки»: дни / месяцы. -->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useReportFiltersStore } from '@/stores/reportFilters'

const { groupingPeriod } = storeToRefs(useReportFiltersStore())

const options = [
  { value: 'days', label: 'Дни' },
  { value: 'months', label: 'Месяцы' },
]
</script>

<template>
  <div>
    <p class="mb-2 text-sm font-medium">Период группировки:</p>
    <B24SelectMenu
      v-model="groupingPeriod"
      :items="options"
      value-key="value"
      label-key="label"
    />
  </div>
</template>
