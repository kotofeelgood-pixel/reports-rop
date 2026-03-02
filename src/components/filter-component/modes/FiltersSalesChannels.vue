<!--
  Фильтры для режима «Отчет по каналам продаж».
  Содержит: пользователи/период, направления сделок, этапы воронки, настройки отчёта.
-->
<script setup lang="ts">
import FilterUsersPeriod from '../blocks/FilterUsersPeriod.vue'
import FilterDealDirections from '../blocks/FilterDealDirections.vue'
import FilterFunnelStages from '../blocks/FilterFunnelStages.vue'
import FilterReportSettings from '../blocks/FilterReportSettings.vue'
import { useReportFiltersStoreRefs } from '@/stores/reportFilters'

const { selectedDealDirections } = useReportFiltersStoreRefs()
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    <FilterUsersPeriod />
    <FilterDealDirections v-model="selectedDealDirections" />
    <FilterFunnelStages />
    <FilterReportSettings />
  </div>
</template>
