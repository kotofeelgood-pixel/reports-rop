import { computed, onMounted, ref, watch, type Ref } from 'vue'
import { useReportSettingsStoreRefs } from '@/stores/reportSettings'
import { type TelephonyCallRecord, isOutgoingCallType, isIncomingCallType, isMissedCall } from '@/api/calls'
import { useThemeStoreRefs } from '@/stores/theme'

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
    const failedCode = String(call.CALL_FAILED_CODE ?? call.call_failed_code ?? '').trim()
    const is304 = failedCode === '304'
    if (isOutgoingCallType(callTypeRaw)) {
      bucket.outgoing += 1
    } else if (isIncomingCallType(callTypeRaw) && !is304) {
      bucket.incoming += 1
    }
    if (isMissed) bucket.missed += 1
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
export function useChartData(externalCalls?: Ref<TelephonyCallRecord[]>) {
  const { chartType, chartStartHour, chartEndHour, minCallDurationSeconds } = useReportSettingsStoreRefs()
  const { isDark } = useThemeStoreRefs()
  const { dateRange, dateValue, getDateRange, formatB24DateFilter } = useDateRange()

  const internalCalls = ref<TelephonyCallRecord[]>([])
  const calls = externalCalls ?? internalCalls
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
    if (externalCalls) return
    try {
      const range = getDateRange()
      const filter: Record<string, unknown> = {}
      if (range?.start && range?.end) {
        filter['>=CALL_START_DATE'] = formatB24DateFilter(range.start, 'start')
        filter['<=CALL_START_DATE'] = formatB24DateFilter(range.end, 'end')
      }
      const data = await telephonyCallList({ filter, sort: 'CALL_START_DATE', order: 'DESC' })
      internalCalls.value = Array.isArray(data) ? data : []
    } catch {
      internalCalls.value = []
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

  const pieSeries = computed(() => {
    const list = callsFilteredByMinDuration.value
    let outgoing = 0
    let incoming = 0
    let missed = 0
    for (const call of list) {
      const callTypeRaw = call.CALL_TYPE ?? call.callType ?? call.TYPE ?? call.type
      const failedCode = String(call.CALL_FAILED_CODE ?? call.call_failed_code ?? '').trim()
      const is304 = failedCode === '304'
      if (isOutgoingCallType(callTypeRaw)) {
        outgoing += 1
      } else if (isIncomingCallType(callTypeRaw) && !is304) {
        incoming += 1
      }
      if (isMissedCall(call)) {
        missed += 1
      }
    }
    return [outgoing, incoming, missed]
  })

  const chartOptions = computed(() => {
    const dark = isDark.value
    const textColor = dark ? '#9ca3af' : '#6b7280'
    const gridColor = dark ? '#374151' : '#e5e7eb'
    const themeMode: 'dark' | 'light' = dark ? 'dark' : 'light'

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

  const pieOptions = computed(() => {
    const dark = isDark.value
    const textColor = dark ? '#e5e7eb' : '#111827'
    const secondaryText = dark ? '#9ca3af' : '#6b7280'
    const themeMode: 'dark' | 'light' = dark ? 'dark' : 'light'

    return {
      chart: {
        type: 'donut' as const,
        height: 260,
        toolbar: {
          show: false,
        },
      },
      labels: ['Исходящие', 'Входящие', 'Пропущенные'],
      colors: ['#4ade80', '#2fc6f6', '#ef4444'],
      legend: {
        show: true,
        position: 'bottom' as const,
        horizontalAlign: 'center' as const,
        fontSize: '12px',
        labels: {
          colors: secondaryText,
        },
        markers: {
          width: 10,
          height: 10,
          radius: 999,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => `${val.toFixed(1)}%`,
        style: {
          fontSize: '12px',
          fontWeight: 600,
          colors: ['#ffffff'],
        },
        dropShadow: {
          enabled: false,
        },
      },
      stroke: {
        width: 2,
        colors: [isDark ? '#1f2937' : '#ffffff'],
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: {
                show: false,
              },
              value: {
                show: true,
                fontSize: '18px',
                fontWeight: 700,
                color: textColor,
                formatter: (val: string) => val,
              },
              total: {
                show: true,
                label: 'Всего',
                color: secondaryText,
                fontSize: '12px',
                formatter: (w: any) => {
                  const sum = (w?.globals?.seriesTotals || []).reduce(
                    (acc: number, n: number) => acc + n,
                    0,
                  )
                  return String(sum)
                },
              },
            },
          },
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
    pieSeries,
    pieOptions,
  }
}
