<!-- Блок «2. Пользователи / период» + касания за N дней (для отчёта по активности). -->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useReportSettingsStore } from '@/stores/reportSettings'
import { useReportFiltersStore } from '@/stores/reportFilters'
import FiltersColumn from '../FiltersColumn.vue'
import FilterUsersSelect from './FilterUsersSelect.vue'

const { dateValue } = storeToRefs(useReportSettingsStore())
const { touchesDays } = storeToRefs(useReportFiltersStore())
</script>

<template>
  <FiltersColumn title="2. Пользователи / период">
    <div class="space-y-4">
      <FilterUsersSelect />
      <div>
        <p class="mb-2 text-sm font-medium">Отчётный период:</p>
        <B24InputDate v-model="dateValue" range />
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm">Касания за:</span>
        <B24InputNumber v-model="touchesDays" class="w-24" />
        <span class="text-sm">дней</span>
      </div>
    </div>
  </FiltersColumn>
</template>
