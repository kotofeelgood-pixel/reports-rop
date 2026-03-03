<!--
  Фильтры для режима «Отчет по конверсиям».
  Содержит: пользователи/период, направления сделок.
-->
<script setup lang="ts">
import FilterUsersPeriod from '../blocks/FilterUsersPeriod.vue'
import FilterDealDirections from '../blocks/FilterDealDirections.vue'
import { useReportFiltersStoreRefs } from '@/stores/reportFilters'

const { selectedDealDirections } = useReportFiltersStoreRefs()
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FilterUsersPeriod class="grow" />
    <FilterDealDirections v-model="selectedDealDirections" single hide-select-all class="grow" />
  </div>
</template>
