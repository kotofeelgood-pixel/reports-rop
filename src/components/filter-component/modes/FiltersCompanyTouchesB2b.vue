<!--
  Фильтры для режима «Отчет по касаниям Компаний (B2B)».
  Содержит: пользователи/период, касания за N месяцев, учитывать ответственного.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportSettingsStore } from '@/stores/reportSettings'
import { useReportFiltersStore } from '@/stores/reportFilters'
import FiltersColumn from '../FiltersColumn.vue'
import FilterUsersSelect from '../blocks/FilterUsersSelect.vue'

const { dateValue } = storeToRefs(useReportSettingsStore())
const { touchesMonths, considerResponsible } = storeToRefs(useReportFiltersStore())

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

const startDate = computed({
  get: () => dateValue.value.start as any,
  set: (value: any) => {
    const start = value
    const end = dateValue.value.end

    const startKey = toComparable(start)
    const endKey = toComparable(end)

    let nextEnd = end
    if (startKey !== null && endKey !== null && endKey < startKey) {
      nextEnd = start
    }

    dateValue.value = { ...dateValue.value, start, end: nextEnd }
  },
})

const endDate = computed({
  get: () => dateValue.value.end as any,
  set: (value: any) => {
    const start = dateValue.value.start
    let end = value

    const startKey = toComparable(start)
    const endKey = toComparable(end)

    if (startKey !== null && endKey !== null && endKey < startKey) {
      end = start
    }

    dateValue.value = { ...dateValue.value, start, end }
  },
})
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <FiltersColumn title="2. Пользователи / период">
      <div class="space-y-4">
        <FilterUsersSelect />
        <div class="flex items-center gap-2">
          <span class="text-sm">Касания за:</span>
          <B24InputNumber v-model="touchesMonths" class="w-24" />
          <span class="text-sm">месяцев</span>
        </div>
        <B24Checkbox v-model="considerResponsible" label="Учитывать ответственного" />
      </div>
    </FiltersColumn>
  </div>
</template>
