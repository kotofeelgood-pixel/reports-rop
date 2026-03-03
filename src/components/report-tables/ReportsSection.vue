<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportFiltersStore } from '@/stores/reportFilters'
import { REPORT_MODE_TABLES } from './modes'

const { reportMode, reportModeLabel } = storeToRefs(useReportFiltersStore())

const titleText = computed(() => {
  return reportModeLabel.value || 'Отчёт'
})

const currentTableComponent = computed(() => REPORT_MODE_TABLES[reportMode.value])
</script>

<template>
  <B24Card class="h-full flex flex-col">
    <template #header>
      <div class="flex items-center justify-between gap-2">
        <div class="font-semibold">
          {{ titleText }}
        </div>
        <div class="text-xs text-gray-500">
          Раздел «Отчёты»
        </div>
      </div>
    </template>

    <div class="p-4 grow min-h-0">
      <B24ScrollArea class="h-full">
        <component :is="currentTableComponent" />
      </B24ScrollArea>
    </div>
  </B24Card>
</template>

