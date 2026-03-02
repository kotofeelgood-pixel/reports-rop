<!-- Блок «2. Пользователи / период» + касания за N дней (для отчёта по активности). -->
<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportSettingsStore } from '@/stores/reportSettings'
import { useReportFiltersStore } from '@/stores/reportFilters'
import FiltersColumn from '../FiltersColumn.vue'
import FilterUsersSelect from './FilterUsersSelect.vue'

const { dateValue } = storeToRefs(useReportSettingsStore())
const { touchesDays } = storeToRefs(useReportFiltersStore())

const startDate = defineModel<any>('start')
const endDate = defineModel<any>('end')

const toComparable = (value: unknown): number | null => {
  if (!value) return null

  if (typeof value === 'string') {
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (!match) return null
    const [, y, m, d] = match
    return Number(y) * 10000 + Number(m) * 100 + Number(d)
  }

  if (typeof value === 'object') {
    const anyValue = value as any

    // DateValue из @internationalized/date
    if (typeof anyValue.toDate === 'function') {
      try {
        const jsDate: Date = anyValue.toDate('UTC')
        const y = jsDate.getUTCFullYear()
        const m = jsDate.getUTCMonth() + 1
        const d = jsDate.getUTCDate()
        return y * 10000 + m * 100 + d
      } catch {
        // ignore
      }
    }

    const v = value as { year?: number; month?: number; day?: number }
    if (typeof v.year === 'number' && typeof v.month === 'number' && typeof v.day === 'number') {
      return v.year * 10000 + v.month * 100 + v.day
    }
  }

  return null
}

watch(
  dateValue,
  (value) => {
    startDate.value = value.start as any
    endDate.value = value.end as any
  },
  { immediate: true, deep: true }
)

watch(
  [startDate, endDate],
  ([start, end]) => {
    const startKey = toComparable(start)
    const endKey = toComparable(end)

    if (startKey !== null && endKey !== null && endKey < startKey) {
      end = start
      endDate.value = start
    }

    dateValue.value = { ...dateValue.value, start, end }
  }
)
</script>

<template>
  <FiltersColumn title="2. Пользователи / период">
    <div class="space-y-4">
      <FilterUsersSelect />
      <div>
        <p class="mb-2 text-sm font-medium">Отчётный период:</p>
        <div class="flex items-center gap-2">
          <B24InputDate v-model="startDate" />
          <span class="text-sm text-gray-500">—</span>
          <B24InputDate v-model="endDate" />
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm">Касания за:</span>
        <B24InputNumber v-model="touchesDays" class="w-24" />
        <span class="text-sm">дней</span>
      </div>
    </div>
  </FiltersColumn>
</template>
