<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useReportFiltersStore } from '@/stores/reportFilters'

const { reportModeLabel } = storeToRefs(useReportFiltersStore())
</script>

<template>
  <div class="flex flex-col items-start gap-2 text-sm text-gray-600">
    <p>
      Таблица для режима
      <span class="font-semibold">
        {{ reportModeLabel }}
      </span>
      пока не реализована.
    </p>
    <p>Выберите другой режим или дождитесь обновления отчёта.</p>
  </div>
</template>

