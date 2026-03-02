<!--
  Фильтры для режима «Отчет по активности в продажах».
  Содержит: пользователи/период + касания за N дней, направления сделок, исключение стадий.
-->
<script setup lang="ts">
import FilterUsersPeriodWithTouches from '../blocks/FilterUsersPeriodWithTouches.vue'
import FilterDealDirections from '../blocks/FilterDealDirections.vue'
import FilterExcludeStages from '../blocks/FilterExcludeStages.vue'
import { useReportFiltersStoreRefs } from '@/stores/reportFilters'

const { selectedDealDirections } = useReportFiltersStoreRefs()
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FilterUsersPeriodWithTouches class="grow" />
    <FilterDealDirections v-model="selectedDealDirections" class="grow" />
    <FilterExcludeStages class="grow" />
  </div>
</template>
