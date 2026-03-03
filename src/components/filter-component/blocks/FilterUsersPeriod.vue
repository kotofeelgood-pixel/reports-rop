<!-- Блок «2. Пользователи / период»: выбор сотрудников, отчётный период. -->
<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import Calendar1Icon from '@bitrix24/b24icons-vue/main/Calendar1Icon'
import { storeToRefs } from 'pinia'
import { useReportSettingsStore } from '@/stores/reportSettings'
import FiltersColumn from '../FiltersColumn.vue'
import FilterUsersSelect from './FilterUsersSelect.vue'

const props = defineProps<{
  hideUsersSelect?: boolean
  calendarMonths?: number
}>()
const hideUsersSelect = props.hideUsersSelect ?? false
const calendarMonths = props.calendarMonths ?? 2
const hidePeriod = (props as { hidePeriod?: boolean }).hidePeriod ?? false

const { dateValue } = storeToRefs(useReportSettingsStore())

const modelValue = shallowRef({
  start: dateValue.value.start as CalendarDate | null,
  end: dateValue.value.end as CalendarDate | null,
})

watch(
  modelValue,
  (value) => {
    dateValue.value = {
      start: value.start as CalendarDate | null,
      end: value.end as CalendarDate | null,
    }
  },
  { deep: true },
)

const df = new DateFormatter('ru-RU', {
  dateStyle: 'medium',
})
</script>

<template>
  <FiltersColumn title="2. Пользователи / период">
    <div class="">
      <FilterUsersSelect v-if="!hideUsersSelect" class="mb-4" />

      <div v-if="!hidePeriod">
        <p class="mb-2 text-sm font-medium">Отчётный период:</p>

        <B24Popover>
          <B24Button :icon="Calendar1Icon">
            <template v-if="modelValue.start">
              <template v-if="modelValue.end">
                {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }} -
                {{ df.format(modelValue.end.toDate(getLocalTimeZone())) }}
              </template>

              <template v-else>
                {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }}
              </template>
            </template>
            <template v-else> Выбрать период </template>
          </B24Button>

          <template #content>
            <B24Calendar
              v-model="modelValue"
              class="p-2"
              :number-of-months="calendarMonths"
              locale="ru-RU"
              range
            />
          </template>
        </B24Popover>
      </div>
    </div>
  </FiltersColumn>
</template>
