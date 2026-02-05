import type { ChartTheme } from './types'

export interface TypeChartParams {
  chartTheme: ChartTheme
  labels: string[]
  colors: string[]
}

export function getTypeChartOptions(params: TypeChartParams) {
  const { chartTheme, labels, colors } = params
  return {
    chart: { type: 'donut' as const, height: 280 },
    colors: colors.length ? colors : ['#4ade80', '#2fc6f6', '#ef4444'],
    labels,
    legend: { position: 'bottom' as const },
    dataLabels: { enabled: true },
    plotOptions: { pie: { donut: { size: '65%' } } },
    theme: { mode: chartTheme.themeMode },
  }
}
