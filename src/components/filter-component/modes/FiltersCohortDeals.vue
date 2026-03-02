<!--
  Фильтры для режима «Когортный анализ сделок».
  Содержит: пользователи/период + период группировки, направления сделок.
-->
<script setup lang="ts">
import FilterUsersPeriodWithGrouping from '../blocks/FilterUsersPeriodWithGrouping.vue'
import FilterDealDirections from '../blocks/FilterDealDirections.vue'
import { useReportFiltersStoreRefs } from '@/stores/reportFilters'

const { selectedDealDirections } = useReportFiltersStoreRefs()
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <FilterUsersPeriodWithGrouping />
    <FilterDealDirections v-model="selectedDealDirections" />
  </div>
</template>
