<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useColorMode } from '@vueuse/core'
import { useAnalyticsCalls } from '@/composables/useAnalyticsCalls'
import { useDateRange } from '@/composables/useDateRange'
import { useReportSettingsStoreRefs } from '@/stores/reportSettings'
import { useUsersStore, useUsersStoreRefs } from '@/stores/users'
import type { TelephonyCallRecord } from '@/api/calls'

import VueApexCharts from 'vue3-apexcharts'
import * as chartConfig from '@/config/charts'
import ReportHeader from '@/components/report/ReportHeader.vue'
import ReportSettingsModal from '@/components/report/ReportSettingsModal.vue'
import CardComponent from '@/components/element/card/CardComponent.vue'

const { calls, loading, error } = useAnalyticsCalls()
const { chartStartHour, chartEndHour, chartType } = useReportSettingsStoreRefs()
const { getDateRange } = useDateRange()
const mode = useColorMode()
const usersStore = useUsersStore()
const { usersById } = useUsersStoreRefs()

const isSettingsOpen = ref(false)

onMounted(() => {
  void usersStore.fetchUsers()
})

// --- Вспомогательные функции для агрегации ---
function getHourFromCall(call: TelephonyCallRecord): number | null {
  const raw = call.CALL_START_DATE ?? call.call_start_date ?? ''
  const str = String(raw).trim()
  if (!str) return null
  const date = new Date(str)
  if (Number.isNaN(date.getTime())) return null
  return date.getHours()
}

function getDateKeyFromCall(call: TelephonyCallRecord): string | null {
  const raw = call.CALL_START_DATE ?? call.call_start_date ?? ''
  const str = String(raw).trim()
  if (!str) return null
  const date = new Date(str)
  if (Number.isNaN(date.getTime())) return null
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function getUserId(call: TelephonyCallRecord): string {
  const id = call.PORTAL_USER_ID ?? call.USER_ID ?? call.RESPONSIBLE_ID ?? call.ASSIGNED_BY_ID
  return String(id ?? '').trim()
}

function isOutgoing(call: TelephonyCallRecord): boolean {
  return Number(call.CALL_TYPE ?? call.callType ?? call.TYPE ?? call.type) === 1
}

function isMissed(call: TelephonyCallRecord): boolean {
  const duration = Number(call.CALL_DURATION ?? call.DURATION ?? call.duration ?? 0)
  if (duration <= 0) return true
  return Boolean(call.CALL_FAILED_CODE ?? call.call_failed_code)
}

// --- График по часам ---
const byHourData = computed(() => {
  const byHour = new Map<number, { outgoing: number; incoming: number; missed: number }>()
  for (let h = 0; h < 24; h++) byHour.set(h, { outgoing: 0, incoming: 0, missed: 0 })
  for (const call of calls.value) {
    const hour = getHourFromCall(call)
    if (hour === null) continue
    const b = byHour.get(hour)!
    if (isOutgoing(call)) b.outgoing += 1
    else b.incoming += 1
    if (isMissed(call)) b.missed += 1
  }
  return Array.from({ length: 24 }, (_, hour) => ({ hour, ...byHour.get(hour)! }))
    .filter(d => d.hour >= chartStartHour.value && d.hour <= chartEndHour.value)
})

const hourSeries = computed(() => [
  { name: 'Исходящие', data: byHourData.value.map(d => d.outgoing) },
  { name: 'Входящие', data: byHourData.value.map(d => d.incoming) },
  { name: 'Пропущенные', data: byHourData.value.map(d => d.missed) },
])

// --- График по типам (donut) ---
const byTypeData = computed(() => {
  let outgoing = 0
  let incoming = 0
  let missed = 0
  for (const call of calls.value) {
    if (isOutgoing(call)) outgoing += 1
    else incoming += 1
    if (isMissed(call)) missed += 1
  }
  return [
    { name: 'Исходящие', value: outgoing, color: '#4ade80' },
    { name: 'Входящие', value: incoming, color: '#2fc6f6' },
    { name: 'Пропущенные', value: missed, color: '#ef4444' },
  ].filter(d => d.value > 0)
})

const typeSeries = computed(() => byTypeData.value.map(d => d.value))
const typeLabels = computed(() => byTypeData.value.map(d => d.name))
const typeColors = computed(() => byTypeData.value.map(d => d.color))

// --- График по дням ---
const byDayData = computed(() => {
  const range = getDateRange()
  if (!range?.start || !range?.end) return []
  const byDay = new Map<string, number>()
  const start = new Date(range.start.getFullYear(), range.start.getMonth(), range.start.getDate())
  const end = new Date(range.end.getFullYear(), range.end.getMonth(), range.end.getDate())
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    byDay.set(key, 0)
  }
  for (const call of calls.value) {
    const key = getDateKeyFromCall(call)
    if (!key) continue
    if (byDay.has(key)) byDay.set(key, (byDay.get(key) ?? 0) + 1)
  }
  const sorted = Array.from(byDay.entries()).sort((a, b) => a[0].localeCompare(b[0]))
  return sorted.map(([date, count]) => ({
    label: new Date(date + 'T12:00:00').toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' }),
    count,
  }))
})

const daySeries = computed(() => [{ name: 'Звонков', data: byDayData.value.map(d => d.count) }])
const dayCategories = computed(() => byDayData.value.map(d => d.label))
const hasDayChartData = computed(() => byDayData.value.some(d => d.count > 0))
/** Минимальная ширина графика по дням: ~32px на день, чтобы подписи не слеплялись; при длинном периоде — прокрутка */
const dayChartMinWidth = computed(() => `${Math.max(dayCategories.value.length * 32, 400)}px`)

// --- Топ сотрудников по звонкам ---
const topUsersData = computed(() => {
  const counts = new Map<string, number>()
  for (const call of calls.value) {
    const uid = getUserId(call)
    if (!uid) continue
    counts.set(uid, (counts.get(uid) ?? 0) + 1)
  }
  const items = Array.from(counts.entries())
    .map(([userId, count]) => ({
      userId,
      name: usersById.value.get(userId)?.name ?? `#${userId}`,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
  return items
})

const topUsersSeries = computed(() => [{ name: 'Звонков', data: topUsersData.value.map(d => d.count) }])
const topUsersCategories = computed(() => topUsersData.value.map(d => d.name))

// --- Общие опции темы ---
const chartTheme = computed(() => {
  const isDark = mode.value === 'dark'
  const textColor = isDark ? '#9ca3af' : '#6b7280'
  const gridColor = isDark ? '#374151' : '#e5e7eb'
  const themeMode: 'light' | 'dark' = isDark ? 'dark' : 'light'
  return { textColor, gridColor, themeMode }
})

const hourChartOptions = computed(() =>
  chartConfig.getHourChartOptions({
    chartTheme: chartTheme.value,
    chartType: chartType.value === 'bar' ? 'bar' : 'line',
    categories: byHourData.value.map(d => d.hour),
  }),
)

const typeChartOptions = computed(() =>
  chartConfig.getTypeChartOptions({
    chartTheme: chartTheme.value,
    labels: typeLabels.value,
    colors: typeColors.value,
  }),
)

const dayChartOptions = computed(() =>
  chartConfig.getDayChartOptions({
    chartTheme: chartTheme.value,
    categories: dayCategories.value,
  }),
)

const topUsersChartOptions = computed(() =>
  chartConfig.getTopUsersChartOptions({
    chartTheme: chartTheme.value,
    categories: topUsersCategories.value,
  }),
)
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gray-50 dark:bg-[#1a1a1a]">
    <ReportHeader @open-settings="isSettingsOpen = true" />

    <main class="flex-1 overflow-auto p-4">
      <div v-if="error" class="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
        {{ error }}
      </div>

      <div v-if="loading" class="flex items-center justify-center py-12">
        <span class="text-gray-500 dark:text-gray-400">Загрузка данных…</span>
      </div>

      <div v-else class="grid gap-4 lg:grid-cols-2">
        <!-- По часам -->
        <CardComponent class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-[#252525]">
          <h2 class="mb-3 text-base font-semibold text-gray-800 dark:text-white">Звонки по часам</h2>
          <VueApexCharts :options="hourChartOptions" :series="hourSeries" height="280" />
        </CardComponent>

        <!-- По типам -->
        <CardComponent class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-[#252525]">
          <h2 class="mb-3 text-base font-semibold text-gray-800 dark:text-white">Соотношение по типам</h2>
          <VueApexCharts
            v-if="typeSeries.length > 0"
            :options="typeChartOptions"
            :series="typeSeries"
            type="donut"
            height="280"
          />
          <p v-else class="flex h-[280px] items-center justify-center text-sm text-gray-500 dark:text-gray-400">
            Нет данных за период
          </p>
        </CardComponent>

        <!-- По дням -->
        <CardComponent
          v-if="dayCategories.length > 0"
          class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-[#252525] lg:col-span-2"
        >
          <h2 class="mb-3 text-base font-semibold text-gray-800 dark:text-white">Звонки по дням</h2>
          <template v-if="hasDayChartData">
            <div class="overflow-x-auto overflow-y-hidden">
              <div :style="{ minWidth: dayChartMinWidth }">
                <VueApexCharts
                  :options="dayChartOptions"
                  :series="daySeries"
                  height="280"
                />
              </div>
            </div>
          </template>
          <template v-else>
            <p class="flex h-[200px] items-center justify-center text-sm text-gray-500 dark:text-gray-400">
              Нет данных за период
            </p>
          </template>
        </CardComponent>
        <!-- Топ сотрудников -->
        <CardComponent class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-[#252525] lg:col-span-2">
          <h2 class="mb-3 text-base font-semibold text-gray-800 dark:text-white">Топ сотрудников по количеству звонков</h2>
          <VueApexCharts
            v-if="topUsersCategories.length > 0"
            :options="topUsersChartOptions"
            :series="topUsersSeries"
            type="bar"
            height="320"
          />
          <p v-else class="flex h-[200px] items-center justify-center text-sm text-gray-500 dark:text-gray-400">
            Нет данных за период
          </p>
        </CardComponent>
      </div>
    </main>

    <ReportSettingsModal v-model:open="isSettingsOpen" />
  </div>
</template>
