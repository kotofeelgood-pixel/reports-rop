<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportFiltersStore } from '@/stores/reportFilters'
import { REPORT_MODE_TABLES } from '@/components/report-tables/modes'
import { REPORT_MODES } from '@/types/reportMode'

const { reportMode, reportModeLabel } = storeToRefs(useReportFiltersStore())

const titleText = computed(() => reportModeLabel.value || 'Отчёт')

const currentTableComponent = computed(() => REPORT_MODE_TABLES[reportMode.value])

const modeItems = REPORT_MODES.map((m) => ({
  value: m.id,
  label: m.isNew ? `${m.label} NEW` : m.label,
}))
</script>

<template>
  <div class="h-full p-4">
    <B24Card class="h-full flex flex-col">
      <template #header>
        <div class="flex flex-col gap-4">
          <div class="font-semibold">
            {{ titleText }}
          </div>
          <div class="flex flex-wrap gap-2">
            <B24RadioGroup
              size="sm"
              variant="card"
              v-model="reportMode"
              :items="modeItems"
              value-key="value"
              label-key="label"
              orientation="horizontal"
            />
          </div>
        </div>
      </template>

      <div class="p-4 grow min-h-0 flex flex-col">
        <div
          class="h-full min-h-0 table-scroll-container"
          data-simplebar
          data-simplebar-auto-hide="false"
        >
          <component :is="currentTableComponent" />
        </div>
      </div>
    </B24Card>
  </div>
</template>
