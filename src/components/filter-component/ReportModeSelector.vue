<!-- Блок «1. Выберите режим отчёта»: радиокнопки всех режимов. -->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useReportFiltersStore } from '@/stores/reportFilters'
import { REPORT_MODES } from '@/types/reportMode'
import FiltersColumn from './FiltersColumn.vue'

const { reportMode } = storeToRefs(useReportFiltersStore())

const modeItems = REPORT_MODES.map((m) => ({
  value: m.id,
  label: m.isNew ? `${m.label} NEW` : m.label,
}))
</script>

<template>
  <FiltersColumn title="1. Выберите режим отчёта">
    <B24RadioGroup
      size="sm"
      variant="card"
      v-model="reportMode"
      :items="modeItems"
      value-key="value"
      label-key="label"
      orientation="vertical"
    />
  </FiltersColumn>
</template>
