<!-- Блок «2. Пользователи / период» + касания за N дней (для отчёта по активности). -->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useReportSettingsStore } from '@/stores/reportSettings'
import { useReportFiltersStore } from '@/stores/reportFilters'
import { useBitrixUserSelector } from '@/composables/useBitrixUserSelector'
import FiltersColumn from '../FiltersColumn.vue'

const { dateValue } = storeToRefs(useReportSettingsStore())
const { selectedUserIds, touchesDays } = storeToRefs(useReportFiltersStore())
const { openUserSelector } = useBitrixUserSelector()
const selectedCount = computed(() => selectedUserIds.value?.length ?? 0)
</script>

<template>
  <FiltersColumn title="2. Пользователи / период">
    <div class="space-y-4">
      <B24Button
        :label="`Выбрано сотрудников: ${selectedCount}`"
        color="air-secondary-accent-1"
        size="md"
        @click="openUserSelector"
      />
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
