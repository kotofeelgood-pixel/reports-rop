<!-- Блок «5. Настройки отчета»: скрыть разделы, результативный звонок, поле группировки. -->
<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportFiltersStore } from '@/stores/reportFilters'
import FiltersColumn from '../FiltersColumn.vue'

const {
  reportMode,
  hideCallsSection,
  hideLeadsSection,
  hideDealsSection,
  minCallDurationSeconds,
  groupingField,
} = storeToRefs(useReportFiltersStore())

watch(
  reportMode,
  (mode) => {
    if (mode === 'sales_channels') {
      hideCallsSection.value = true
    }
  },
  { immediate: true },
)
</script>

<template>
  <FiltersColumn title="5. Настройки отчета">
    <div class="space-y-4">
      <B24Checkbox
        v-model="hideCallsSection"
        label="Скрыть раздел Звонки"
        :disabled="reportMode === 'sales_channels'"
      />
      <B24Checkbox v-model="hideLeadsSection" label="Скрыть раздел Лиды" />
      <B24Checkbox v-model="hideDealsSection" label="Скрыть раздел Сделки" />
      <div class="flex items-center gap-2">
        <span class="text-sm">Результативный звонок больше, чем</span>
        <B24InputNumber
          v-model="minCallDurationSeconds"
          class="w-20"
          :disabled="reportMode === 'sales_channels'"
        />
        <span class="text-sm">секунд</span>
      </div>
      <div v-if="reportMode !== 'sales_department'">
        <p class="mb-1 text-sm font-medium">Поле для группировки:</p>
        <B24SelectMenu
          v-model="groupingField"
          :items="[{ value: 'UTM_SOURCE', label: 'UTM_SOURCE' }]"
          value-key="value"
          label-key="label"
        />
      </div>
    </div>
  </FiltersColumn>
</template>
