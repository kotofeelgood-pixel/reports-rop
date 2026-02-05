import type { ChartTheme } from './types'

export interface TopUsersChartParams {
  chartTheme: ChartTheme
  categories: string[]
}

export function getTopUsersChartOptions(params: TopUsersChartParams) {
  const { chartTheme, categories } = params
  return {
    chart: { type: 'bar' as const, height: 320, toolbar: { show: false } },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '70%',
        borderRadius: 2,
        borderRadiusApplication: 'end' as const,
      },
    },
    colors: ['#4ade80'],
    dataLabels: { enabled: true },
    xaxis: {
      categories,
      labels: { style: { colors: chartTheme.textColor, fontSize: '11px' } },
    },
    yaxis: {
      labels: { style: { colors: chartTheme.textColor } },
    },
    grid: { borderColor: chartTheme.gridColor },
    theme: { mode: chartTheme.themeMode },
  }
}
