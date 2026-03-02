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
  <div class="flex flex-wrap gap-4">
    <FilterUsersPeriod class="grow" />
    <FilterDealDirections v-model="selectedDealDirections" class="grow" />
    <FilterFunnelStages class="grow" />
    <FilterReportSettings class="grow" />
  </div>
</template>
