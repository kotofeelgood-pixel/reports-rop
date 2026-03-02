<!--
  Фильтры для режима «Отчет по конверсиям (сокращённый)».
  Содержит: пользователи/период, направления сделок.
-->
<script setup lang="ts">
import FilterUsersPeriod from '../blocks/FilterUsersPeriod.vue'
import FilterDealDirections from '../blocks/FilterDealDirections.vue'
import { useReportFiltersStoreRefs } from '@/stores/reportFilters'

const { selectedDealDirections } = useReportFiltersStoreRefs()
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <FilterUsersPeriod />
    <FilterDealDirections v-model="selectedDealDirections" />
  </div>
</template>
