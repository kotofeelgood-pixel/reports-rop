<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportFiltersStore } from '@/stores/reportFilters'
import FiltersComponentHead from './FiltersComponentHead.vue'
import ReportModeSelector from './ReportModeSelector.vue'
import { REPORT_MODE_FILTERS } from './modes/index'

const { reportMode } = storeToRefs(useReportFiltersStore())
const ModeFilters = computed(() => REPORT_MODE_FILTERS[reportMode.value])
</script>

<template>
  <B24ScrollArea class="h-full">
    <div class="space-y-4 p-4">
      <FiltersComponentHead />
      <div class="flex gap-4">
        <ReportModeSelector class="max-w-[400px] flex-shrink-0 w-full" />
        <div class="min-w-0">
          <component :is="ModeFilters" />
        </div>
      </div>
    </div>
  </B24ScrollArea>
</template>

<style scoped></style>
