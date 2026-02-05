import type { ChartTheme } from './types'

export interface DayChartParams {
  chartTheme: ChartTheme
  categories: string[]
}

export function getDayChartOptions(params: DayChartParams) {
  const { chartTheme, categories } = params
  return {
    chart: { type: 'bar' as const, height: 280, toolbar: { show: false } },
    colors: ['#2fc6f6'],
    plotOptions: { bar: { columnWidth: '60%', borderRadius: 2, borderRadiusApplication: 'end' as const } },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      labels: { style: { colors: chartTheme.textColor, fontSize: '10px' } },
    },
    yaxis: {
      title: { text: 'Звонков', style: { color: chartTheme.textColor } },
      labels: { style: { colors: chartTheme.textColor } },
    },
    grid: { borderColor: chartTheme.gridColor },
    theme: { mode: chartTheme.themeMode },
  }
}
