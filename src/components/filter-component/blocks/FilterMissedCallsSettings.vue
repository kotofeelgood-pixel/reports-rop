<!-- Блок «3. Настройки отчёта» для пропущенных звонков: успешные перезвоны, мин. секунд. -->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useReportFiltersStore } from '@/stores/reportFilters'
import FiltersColumn from '../FiltersColumn.vue'

const { onlySuccessfulCallbacks, successfulCallbackMinSeconds } =
  storeToRefs(useReportFiltersStore())
</script>

<template>
  <FiltersColumn title="3. Настройки отчёта">
    <div class="space-y-4">
      <B24Checkbox
        v-model="onlySuccessfulCallbacks"
        label="Считать перезвоном только успешные"
      />
      <div class="flex items-center gap-2">
        <span class="text-sm">больше, чем</span>
        <B24InputNumber v-model="successfulCallbackMinSeconds" class="w-20" />
        <span class="text-sm">секунд</span>
      </div>
    </div>
  </FiltersColumn>
</template>
