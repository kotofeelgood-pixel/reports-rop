<!--
  Фильтры для режима «Когортный анализ по клиентам».
  Содержит: пользователи/период + период группировки, направления сделок.
-->
<script setup lang="ts">
import FilterUsersPeriodWithGrouping from '../blocks/FilterUsersPeriodWithGrouping.vue'
import FilterDealDirections from '../blocks/FilterDealDirections.vue'
import { useReportFiltersStoreRefs } from '@/stores/reportFilters'

const { selectedDealDirections } = useReportFiltersStoreRefs()
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FilterUsersPeriodWithGrouping class="grow" />
    <FilterDealDirections v-model="selectedDealDirections" type="DealDirectionId" class="grow" />
  </div>
</template>
