<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import VueApexCharts from 'vue3-apexcharts'
import CardComponent from '@/components/element/card/CardComponent.vue'
import { useReportSettingsStoreRefs } from '@/stores/reportSettings'

const { chartType, chartStartHour, chartEndHour } = useReportSettingsStoreRefs()
const mode = useColorMode()

const allChartData = [
  { hour: 0, outgoing: 0, incoming: 0, missed: 0, processed: 0 },
  { hour: 1, outgoing: 0, incoming: 0, missed: 0, processed: 0 },
  { hour: 2, outgoing: 0, incoming: 0, missed: 0, processed: 0 },
  { hour: 3, outgoing: 0, incoming: 0, missed: 0, processed: 0 },
  { hour: 4, outgoing: 0, incoming: 0, missed: 0, processed: 0 },
  { hour: 5, outgoing: 0, incoming: 0, missed: 0, processed: 0 },
  { hour: 6, outgoing: 0, incoming: 0, missed: 0, processed: 0 },
  { hour: 7, outgoing: 0, incoming: 0, missed: 0, processed: 0 },
  { hour: 8, outgoing: 0, incoming: 0, missed: 0, processed: 0 },
  { hour: 9, outgoing: 0, incoming: 1, missed: 1, processed: 0 },
  { hour: 10, outgoing: 0, incoming: 2, missed: 0, processed: 0 },
  { hour: 11, outgoing: 15, incoming: 1, missed: 1, processed: 2 },
  { hour: 12, outgoing: 15, incoming: 12, missed: 6, processed: 4 },
  { hour: 13, outgoing: 2, incoming: 16, missed: 9, processed: 0 },
  { hour: 14, outgoing: 13, incoming: 11, missed: 5, processed: 5 },
  { hour: 15, outgoing: 0, incoming: 0, missed: 0, processed: 0 },
  { hour: 16, outgoing: 0, incoming: 0, missed: 0, processed: 0 },
  { hour: 17, outgoing: 0, incoming: 0, missed: 0, processed: 0 },
  { hour: 18, outgoing: 0, incoming: 0, missed: 0, processed: 0 },
  { hour: 19, outgoing: 0, incoming: 0, missed: 0, processed: 0 },
  { hour: 20, outgoing: 0, incoming: 0, missed: 0, processed: 0 },
  { hour: 21, outgoing: 0, incoming: 0, missed: 0, processed: 0 },
  { hour: 22, outgoing: 0, incoming: 0, missed: 0, processed: 0 },
  { hour: 23, outgoing: 0, incoming: 0, missed: 0, processed: 0 },
]

const filteredChartData = computed(() => {
  return allChartData.filter(d => d.hour >= chartStartHour.value && d.hour <= chartEndHour.value)
})

const series = computed(() => [
  {
    name: 'Исходящие',
    data: filteredChartData.value.map(d => d.outgoing),
  },
  {
    name: 'Входящие',
    data: filteredChartData.value.map(d => d.incoming),
  },
  {
    name: 'Пропущенные',
    data: filteredChartData.value.map(d => d.missed),
  },
  {
    name: 'Обработанные пропущенные',
    data: filteredChartData.value.map(d => d.processed),
  },
])

const chartOptions = computed(() => {
  const isDark = mode.value === 'dark'
  const textColor = isDark ? '#9ca3af' : '#6b7280'
  const gridColor = isDark ? '#374151' : '#e5e7eb'

  return {
    chart: {
      type: chartType.value === 'bar' ? 'bar' : 'line',
      height: 220,
      toolbar: {
        show: false,
      },
      background: 'transparent',
      offsetX: 0,
    },
    colors: ['#4ade80', '#2fc6f6', '#ef4444', '#f97316'],
    plotOptions: {
      bar: {
        columnWidth: '70%',
        borderRadius: 2,
        dataLabels: {
          position: 'top',
        },
        borderRadiusApplication: 'end',
      },
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 0.9,
        },
      },
    },
    stroke: {
      show: true,
      width: chartType.value === 'line' ? 2 : 3,
      colors: chartType.value === 'line' ? undefined : [isDark ? '#1a1a1a' : '#ffffff'],
      curve: 'smooth',
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: filteredChartData.value.map(d => d.hour),
      title: {
        text: 'Часы',
        style: {
          fontSize: '12px',
          color: textColor,
        },
      },
      labels: {
        style: {
          colors: textColor,
          fontSize: '10px',
        },
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
    },
    yaxis: {
      title: {
        text: 'Кол-во звонков',
        style: {
          fontSize: '12px',
          color: textColor,
        },
      },
      labels: {
        style: {
          colors: textColor,
          fontSize: '10px',
        },
      },
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: gridColor,
      strokeDashArray: 0,
      padding: {
        left: 10,
        right: 10,
      },
    },
    theme: {
      mode: isDark ? 'dark' : 'light',
    },
  }
})
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

