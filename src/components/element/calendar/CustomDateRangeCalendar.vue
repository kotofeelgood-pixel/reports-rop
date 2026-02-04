<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { CalendarDate } from '@internationalized/date'
import type { DateValue } from '@internationalized/date'
import type { CalendarDateRange } from '@/tools/date'
import { toCalendarDate, fromDateRange } from '@/tools/date'

const props = defineProps<{
  modelValue: CalendarDateRange
}>()

const emit = defineEmits<{
  'update:modelValue': [value: CalendarDateRange]
}>()

function getInitialPlaceholder(): CalendarDate {
  const v = props.modelValue?.start ?? props.modelValue?.end
  if (v) return new CalendarDate(v.year, v.month, v.day)
  const today = new Date()
  return new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate())
}

const placeholder = ref<CalendarDate>(getInitialPlaceholder())

watch(
  () => props.modelValue,
  (val) => {
    const v = val?.start ?? val?.end
    if (v) placeholder.value = new CalendarDate(v.year, v.month, v.day)
  },
  { immediate: true }
)

type DateRangeValue = { start: DateValue; end: DateValue } | null

const calendarModel = computed({
  get(): DateRangeValue {
    const r = props.modelValue
    const start = r?.start ? toCalendarDate(r.start) : null
    const end = r?.end ? toCalendarDate(r.end) : null
    if (!start && !end) return null
    return {
      start: start ?? end!,
      end: end ?? start!,
    }
  },
  set(val: DateRangeValue) {
    if (!val) {
      emit('update:modelValue', { start: null, end: null })
      return
    }
    emit('update:modelValue', fromDateRange({ start: val.start, end: val.end }))
  },
})

const headingValue = computed(() => {
  const d = placeholder.value
  const formatter = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' })
  const date = new Date(d.year, d.month - 1, d.day)
  return formatter.format(date)
})

function onCalendarModelUpdate(val: DateRangeValue | { start?: DateValue; end?: DateValue } | null) {
  if (!val || !val.start || !val.end) {
    emit('update:modelValue', { start: null, end: null })
    return
  }
  emit('update:modelValue', fromDateRange({ start: val.start, end: val.end }))
}
</script>

<template>
  <div class="custom-date-range-calendar">
    <B24Calendar
      :model-value="calendarModel as { start: DateValue; end: DateValue } | null"
      range
      locale="ru-RU"
      :placeholder="placeholder as DateValue"
      @update:placeholder="(d: DateValue | undefined) => d != null && (placeholder = d as CalendarDate)"
      @update:model-value="onCalendarModelUpdate"
    >
      <template #heading>
        {{ headingValue }}
      </template>
    </B24Calendar>
  </div>
</template>
