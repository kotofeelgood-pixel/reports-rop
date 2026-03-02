<!--
  Фильтры для режима «Отчет по касаниям Компаний (B2B)».
  Содержит: пользователи/период, касания за N месяцев, учитывать ответственного.
-->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useReportSettingsStore } from '@/stores/reportSettings'
import { useReportFiltersStore } from '@/stores/reportFilters'
import FiltersColumn from '../FiltersColumn.vue'
import FilterUsersSelect from '../blocks/FilterUsersSelect.vue'

const { dateValue } = storeToRefs(useReportSettingsStore())
const { touchesMonths, considerResponsible } = storeToRefs(useReportFiltersStore())
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FiltersColumn title="2. Пользователи / период">
      <div class="space-y-4">
        <FilterUsersSelect />
        <div>
          <p class="mb-2 text-sm font-medium">Отчётный период:</p>
          <B24InputDate v-model="dateValue" range />
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm">Касания за:</span>
          <B24InputNumber v-model="touchesMonths" class="w-24" />
          <span class="text-sm">месяцев</span>
        </div>
        <B24Checkbox v-model="considerResponsible" label="Учитывать ответственного" />
      </div>
    </FiltersColumn>
  </div>
</template>
