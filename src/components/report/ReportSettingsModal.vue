<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useReportSettingsStoreRefs } from '@/stores/reportSettings'
import { useUsersStore, useUsersStoreRefs } from '@/stores/users'
import { useDepartmentsStore, useDepartmentsStoreRefs } from '@/stores/departments'
import SelectComponent from '@/components/select/SelectComponent.vue'

const {
  chartStartHour,
  chartEndHour,
  chartType,
  layoutType,
  excludedDepartment,
  excludedEmployeeIds,
  minCallDurationSeconds,
} = useReportSettingsStoreRefs()

const usersStore = useUsersStore()
const { users } = useUsersStoreRefs()
const departmentsStore = useDepartmentsStore()
const { departments } = useDepartmentsStoreRefs()

const employeeOptions = computed(() =>
  (users.value || []).map((u) => ({ label: u.name, value: u.id })),
)

const departmentOptions = computed(() =>
  (departments.value || []).map((d) => ({ label: d.name, value: d.id })),
)

onMounted(() => {
  void usersStore.fetchUsers()
  void departmentsStore.fetchDepartments()
})

const hours = Array.from({ length: 25 }, (_, i) => ({
  label: `${i}:00`,
  value: i,
}))
</script>

<template>
  <div class="max-h-[60vh] space-y-4 overflow-y-auto pr-2">
    <B24Card>
      <template #header>Основные настройки</template>
      <div class="space-y-4">
        <label class="block text-sm font-medium text-gray-800 dark:text-gray-200"
          >Диапазон графика</label
        >
        <div class="grid grid-cols-2 gap-4">
          <!-- Начало диапазона -->
          <div class="min-w-0 space-y-2">
            <label class="block text-xs text-gray-600 dark:text-gray-400">С</label>
            <SelectComponent
              v-model="chartStartHour"
              :items="hours.filter((h) => h.value < chartEndHour)"
              placeholder="Начало"
              full-width
            />
          </div>

          <!-- Конец диапазона -->
          <div class="min-w-0 space-y-2">
            <label class="block text-xs text-gray-600 dark:text-gray-400">До</label>
            <SelectComponent
              v-model="chartEndHour"
              :items="hours.filter((h) => h.value > chartStartHour)"
              placeholder="Конец"
              full-width
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <!-- Тип графика -->
          <div class="min-w-0 space-y-2 w-full">
            <label class="block text-sm font-medium text-gray-800 dark:text-gray-200"
              >Тип графика</label
            >
            <SelectComponent
              v-model="chartType"
              :items="[
                { label: 'Линейный', value: 'line' },
                { label: 'Гистограмма', value: 'bar' },
              ]"
              placeholder="Выберите тип графика"
              full-width
            />
          </div>

          <!-- Расположение блоков -->
          <div class="min-w-0 space-y-2">
            <label class="block text-sm font-medium text-gray-800 dark:text-gray-200"
              >Расположение блоков</label
            >
            <SelectComponent
              v-model="layoutType"
              :items="[
                { label: 'Столбцы', value: 'columns' },
                { label: 'Строки', value: 'rows' },
              ]"
              placeholder="Выберите расположение"
              full-width
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <!-- Исключить отдел -->
          <div class="min-w-0 space-y-2">
            <label class="block text-sm font-medium text-gray-800 dark:text-gray-200"
              >Исключить отдел</label
            >
            <SelectComponent
              v-model="excludedDepartment"
              :items="departmentOptions"
              placeholder="Выберите отдел"
              full-width
            />
          </div>

          <!-- Исключить сотрудников -->
          <div class="min-w-0 space-y-2">
            <label class="block text-sm font-medium text-gray-800 dark:text-gray-200"
              >Исключить сотрудников</label
            >
            <SelectComponent
              v-model="excludedEmployeeIds"
              :items="employeeOptions"
              multiple
              placeholder="Выберите сотрудников"
              full-width
            />
          </div>
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-800 dark:text-gray-200"
            >Минимальная длительность звонка</label
          >
          <div class="flex items-center gap-3">
            <input
              v-model="minCallDurationSeconds"
              type="range"
              min="0"
              max="600"
              class="h-1 flex-1 cursor-pointer rounded-full bg-blue-200 accent-[#2fc6f6] dark:bg-gray-700"
            />
            <span
              class="min-w-[72px] rounded bg-white px-2 py-1 text-xs text-center shadow dark:bg-gray-700 dark:text-gray-200"
            >
              {{ minCallDurationSeconds }} сек.
            </span>
          </div>
        </div>
      </div>
    </B24Card>
  </div>
</template>
