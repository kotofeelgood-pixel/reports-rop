import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import { useReportSettingsStoreRefs } from '@/stores/reportSettings'

type ChartDataPoint = {
  hour: number
  outgoing: number
  incoming: number
  missed: number
  processed: number
}

/**
 * Данные графика по умолчанию
 */
const allChartData: ChartDataPoint[] = [
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

/**
 * Композабл для управления данными графика
 * @returns объект с отфильтрованными данными, сериями и настройками графика
 */
export function useChartData() {
  const { chartType, chartStartHour, chartEndHour } = useReportSettingsStoreRefs()
  const mode = useColorMode()

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
    const themeMode: 'dark' | 'light' = isDark ? 'dark' : 'light'

    return {
      chart: {
        type: (chartType.value === 'bar' ? 'bar' : 'line') as 'bar' | 'line',
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
          borderRadiusApplication: 'end' as const,
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
        curve: 'smooth' as const,
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
        mode: themeMode,
      },
    }
  })

  return {
    filteredChartData,
    series,
    chartOptions,
  }
}
