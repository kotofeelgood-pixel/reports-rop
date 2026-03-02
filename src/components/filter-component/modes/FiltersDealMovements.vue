<!--
  Фильтры для режима «Отчет по движениям Сделок».
  Содержит: пользователи/период, направления сделок, исключение стадий.
-->
<script setup lang="ts">
import FilterUsersPeriod from '../blocks/FilterUsersPeriod.vue'
import FilterDealDirections from '../blocks/FilterDealDirections.vue'
import FilterExcludeStages from '../blocks/FilterExcludeStages.vue'
import { useReportFiltersStoreRefs } from '@/stores/reportFilters'

const { selectedDealDirections } = useReportFiltersStoreRefs()
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <FilterUsersPeriod />
    <FilterDealDirections v-model="selectedDealDirections" />
    <FilterExcludeStages />
  </div>
</template>
