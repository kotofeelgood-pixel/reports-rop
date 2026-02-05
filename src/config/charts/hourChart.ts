import type { ChartTheme } from './types'

export interface HourChartParams {
  chartTheme: ChartTheme
  chartType: 'bar' | 'line'
  categories: number[]
}

export function getHourChartOptions(params: HourChartParams) {
  const { chartTheme, chartType, categories } = params
  return {
    chart: {
      type: (chartType === 'bar' ? 'bar' : 'line') as 'bar' | 'line',
      height: 280,
      toolbar: { show: false },
      background: 'transparent',
    },
    colors: ['#4ade80', '#2fc6f6', '#ef4444'],
    plotOptions: {
      bar: { columnWidth: '70%', borderRadius: 2, borderRadiusApplication: 'end' as const },
    },
    stroke: {
      show: true,
      width: chartType === 'line' ? 2 : 3,
      curve: 'smooth' as const,
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      title: { text: 'Часы', style: { fontSize: '12px', color: chartTheme.textColor } },
      labels: { style: { colors: chartTheme.textColor, fontSize: '10px' } },
    },
    yaxis: {
      title: { text: 'Кол-во звонков', style: { fontSize: '12px', color: chartTheme.textColor } },
      labels: { style: { colors: chartTheme.textColor } },
    },
    legend: { show: true, position: 'top' as const },
    grid: { borderColor: chartTheme.gridColor, strokeDashArray: 0 },
    theme: { mode: chartTheme.themeMode },
  }
}
