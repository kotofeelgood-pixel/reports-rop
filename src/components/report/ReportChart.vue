<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import CardComponent from '@/components/element/card/CardComponent.vue'
import { useChartData } from '@/composables/useChartData'
import type { TelephonyCallRecord } from '@/api/calls'

const props = defineProps<{
  calls?: TelephonyCallRecord[]
}>()

const callsRef = computed(() => props.calls ?? [])

const { series, chartOptions } = useChartData(callsRef)
</script>

<template>
  <CardComponent class="flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-[#252525]">
    <h2 class="mb-3 text-base font-semibold text-gray-700 dark:text-white">График</h2>
    <div class="mb-3 flex flex-wrap gap-4 text-xs text-gray-600 dark:text-gray-300">
      <span class="flex items-center gap-1.5"><span class="size-3 shrink-0 rounded-full bg-green-400" /> Исходящие</span>
      <span class="flex items-center gap-1.5"><span class="size-3 shrink-0 rounded-full bg-[#2fc6f6]" /> Входящие</span>
      <span class="flex items-center gap-1.5"><span class="size-3 shrink-0 rounded-full bg-red-500" /> Пропущенные</span>
      <span class="flex items-center gap-1.5"><span class="size-3 shrink-0 rounded-full bg-orange-500" /> Обработанные пропущенные</span>
    </div>
    <VueApexCharts
      :options="chartOptions"
      :series="series"
      height="220"
    />
  </CardComponent>
</template>

