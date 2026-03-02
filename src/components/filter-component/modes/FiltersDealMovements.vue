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
  <div class="flex flex-wrap gap-4">
    <FilterUsersPeriod class="grow" />
    <FilterDealDirections v-model="selectedDealDirections" class="grow" />
    <FilterExcludeStages class="grow" />
  </div>
</template>
