<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useChartData } from '@/composables/useChartData'
import type { TelephonyCallRecord } from '@/api/calls'

const props = defineProps<{
  calls?: TelephonyCallRecord[]
}>()

const callsRef = computed(() => props.calls ?? [])

const { series, chartOptions } = useChartData(callsRef)
</script>

<template>
  <B24Card>
    <template #header>График</template>

    <div class="flex flex-wrap gap-2 pb-4">
      <span class="rounded-full bg-green-400 px-3 py-1 text-xs font-medium text-white">
        Исходящие
      </span>
      <span class="rounded-full bg-sky-400 px-3 py-1 text-xs font-medium text-white">
        Входящие
      </span>
      <span class="rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white">
        Пропущенные
      </span>
      <span class="rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white">
        Обработанные пропущенные
      </span>
    </div>

    <VueApexCharts :options="chartOptions" :series="series" height="260" />
  </B24Card>
</template>
