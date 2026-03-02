<!-- Блок «2. Пользователи / период» + период группировки (для когортных отчётов). -->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useReportSettingsStore } from '@/stores/reportSettings'
import FiltersColumn from '../FiltersColumn.vue'
import FilterGroupingPeriod from './FilterGroupingPeriod.vue'
import FilterUsersSelect from './FilterUsersSelect.vue'

const { dateValue } = storeToRefs(useReportSettingsStore())
</script>

<template>
  <FiltersColumn title="2. Пользователи / период">
    <div class="space-y-4">
      <FilterUsersSelect />
      <div>
        <p class="mb-2 text-sm font-medium">Отчётный период:</p>
        <B24InputDate v-model="dateValue" range />
      </div>
      <FilterGroupingPeriod />
    </div>
  </FiltersColumn>
</template>
