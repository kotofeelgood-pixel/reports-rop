import { computed, onMounted, ref, watch } from 'vue'
import { useColorMode } from '@vueuse/core'
import { useReportSettingsStoreRefs } from '@/stores/reportSettings'
import { useDateRange } from '@/composables/useDateRange'
import { telephonyCallList, type TelephonyCallRecord, isOutgoingCallType, isIncomingCallType, isMissedCall } from '@/api/calls'

type ChartDataPoint = {
  hour: number
  outgoing: number
  incoming: number
  missed: number
  processed: number
}

function getHourFromCall(call: TelephonyCallRecord): number | null {
  const raw = call.CALL_START_DATE ?? call.call_start_date ?? ''
  const str = String(raw).trim()
  if (!str) return null
  const date = new Date(str)
  if (Number.isNaN(date.getTime())) return null
  return date.getHours()
}

function buildChartDataFromCalls(calls: TelephonyCallRecord[]): ChartDataPoint[] {
  const byHour = new Map<number, { outgoing: number; incoming: number; missed: number; processed: number }>()
  for (let h = 0; h < 24; h++) {
    byHour.set(h, { outgoing: 0, incoming: 0, missed: 0, processed: 0 })
  }
  for (const call of calls) {
    const hour = getHourFromCall(call)
    if (hour === null) continue
    const bucket = byHour.get(hour)!
    const callTypeRaw = call.CALL_TYPE ?? call.callType ?? call.TYPE ?? call.type
    const duration = Number(call.CALL_DURATION ?? call.DURATION ?? call.duration ?? 0)
    const isMissed = isMissedCall(call)
    if (isOutgoingCallType(callTypeRaw)) {
      bucket.outgoing += 1
    } else if (isIncomingCallType(callTypeRaw)) {
      bucket.incoming += 1
      if (isMissed) bucket.missed += 1
    }
  }
  return Array.from({ length: 24 }, (_, hour) => {
    const b = byHour.get(hour)!
    return { hour, ...b }
  })
}

/**
 * Композабл для управления данными графика.
 * Данные загружаются за выбранный период (как таблица и рейтинг).
 */
export function useChartData() {
  const { chartType, chartStartHour, chartEndHour, minCallDurationSeconds } = useReportSettingsStoreRefs()
  const mode = useColorMode()
  const { dateRange, dateValue, getDateRange, formatB24DateFilter } = useDateRange()

  const calls = ref<TelephonyCallRecord[]>([])
  const callsFilteredByMinDuration = computed(() => {
    const list = calls.value
    const minDuration = Number(minCallDurationSeconds.value) || 0
    if (minDuration <= 0) return list
    return list.filter(call => {
      const duration = Number(call.CALL_DURATION ?? call.DURATION ?? call.duration ?? 0)
      return duration >= minDuration
    })
  })
  const chartDataFromApi = computed(() => buildChartDataFromCalls(callsFilteredByMinDuration.value))

  const fetchCalls = async () => {
    try {
      const range = getDateRange()
      const filter: Record<string, unknown> = {}
      if (range?.start && range?.end) {
        filter['>=CALL_START_DATE'] = formatB24DateFilter(range.start, 'start')
        filter['<=CALL_START_DATE'] = formatB24DateFilter(range.end, 'end')
      }
      const data = await telephonyCallList({ filter, sort: 'CALL_START_DATE', order: 'DESC' })
      calls.value = Array.isArray(data) ? data : []
    } catch {
      calls.value = []
    }
  }

  onMounted(() => {
    void fetchCalls()
  })

  watch([dateRange, dateValue], () => {
    void fetchCalls()
  }, { deep: true })

  const filteredChartData = computed(() => {
    const data = chartDataFromApi.value
    return data.filter(d => d.hour >= chartStartHour.value && d.hour <= chartEndHour.value)
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
