<!--
  Фильтры для режима «Отчет по отделу продаж».
  Содержит: пользователи/период, направления сделок, этапы воронки, настройки отчёта.
-->
<script setup lang="ts">
import FilterUsersPeriod from '../blocks/FilterUsersPeriod.vue'
import FilterDealDirections from '../blocks/FilterDealDirections.vue'
import FilterFunnelStages from '../blocks/FilterFunnelStages.vue'
import FilterReportSettings from '../blocks/FilterReportSettings.vue'
import { useReportFiltersStoreRefs } from '@/stores/reportFilters'

const { selectedDealDirections, refreshToken } = useReportFiltersStoreRefs()

const handleMakeReport = () => {
  refreshToken.value += 1
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-4">
      <FilterUsersPeriod class="grow" />
      <FilterDealDirections v-model="selectedDealDirections" class="grow" />
      <FilterFunnelStages class="grow" />
      <FilterReportSettings class="grow" />
    </div>

    <div class="flex justify-end pt-2">
      <B24Button
        label="Сделать отчёт"
        color="air-primary"
        size="md"
        @click="handleMakeReport"
      />
    </div>
  </div>
</template>
