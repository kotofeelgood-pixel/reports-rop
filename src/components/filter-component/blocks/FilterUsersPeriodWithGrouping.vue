<!-- Блок «2. Пользователи / период» + период группировки (для когортных отчётов). -->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useReportSettingsStore } from '@/stores/reportSettings'
import { useReportFiltersStore } from '@/stores/reportFilters'
import FiltersColumn from '../FiltersColumn.vue'
import FilterGroupingPeriod from './FilterGroupingPeriod.vue'

const { dateValue } = storeToRefs(useReportSettingsStore())
const { selectedUserIds } = storeToRefs(useReportFiltersStore())
const selectedCount = computed(() => selectedUserIds.value?.length ?? 0)
</script>

<template>
  <FiltersColumn title="2. Пользователи / период">
    <div class="space-y-4">
      <B24Button
        :label="`Выбрано сотрудников: ${selectedCount}`"
        color="air-secondary-accent-1"
        size="md"
      />
      <div>
        <p class="mb-2 text-sm font-medium">Отчётный период:</p>
        <B24InputDate v-model="dateValue" range />
      </div>
      <FilterGroupingPeriod />
    </div>
  </FiltersColumn>
</template>
