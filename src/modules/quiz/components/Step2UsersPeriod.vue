<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportQuizStore } from '@/stores/useReportsQuizStore'
import CheckboxComponent from '@/components/inputs/Checkbox/CheckboxComponent.vue'
import InputComponent from '@/components/inputs/InputComponent.vue'
import BannerComponent from '@/components/banner/BannerComponent.vue'
import ScrollAreaComponent from '@/components/scroll-area/ScrollAreaComponent.vue'
import AvatarComponent from '@/components/avatar/AvatarComponent.vue'
import type { Employee } from '@/stores/useReportsQuizStore'

const store = useReportQuizStore()
const { selectedEmployees, startDate, endDate, employeesData } = storeToRefs(store)

const showDismissed = ref(false)

const filteredEmployees = computed(() => {
  return showDismissed.value
    ? employeesData.value
    : employeesData.value.filter(emp => !emp.dismissed)
})

const groupedEmployees = computed(() => {
  const grouped = filteredEmployees.value.reduce((acc, emp) => {
    const dept = emp.department || 'Без отдела'
    if (!acc[dept]) {
      acc[dept] = []
    }
    acc[dept].push(emp)
    return acc
  }, {} as Record<string, Employee[]>)

  return Object.entries(grouped)
})

const allEmployeesSelected = computed(() => {
  if (!Array.isArray(selectedEmployees.value)) return false
  return filteredEmployees.value.length > 0 &&
         filteredEmployees.value.every(emp => isEmployeeSelected(emp))
})

const handleSelectAll = (checked: boolean) => {
  if (!Array.isArray(selectedEmployees.value)) {
    selectedEmployees.value = []
  }

  if (checked) {
    // Выбираем всех отфильтрованных сотрудников
    const allFiltered = [...filteredEmployees.value]
    // Очищаем и заполняем заново для правильной реактивности
    selectedEmployees.value.splice(0, selectedEmployees.value.length, ...allFiltered)
  } else {
    // Снимаем всех - используем splice для правильной реактивности
    // Удаляем все элементы из массива
    const length = selectedEmployees.value.length
    if (length > 0) {
      selectedEmployees.value.splice(0, length)
    }
  }
}

const isEmployeeSelected = (employee: Employee) => {
  if (!Array.isArray(selectedEmployees.value)) return false
  return selectedEmployees.value.some((sel: Employee) => {
    if (typeof sel === 'object' && sel !== null && 'value' in sel) {
      return sel.value === employee.value
    }
    return sel === employee.value
  })
}

const handleToggleEmployee = (employee: Employee) => (checked: boolean) => {
  if (!Array.isArray(selectedEmployees.value)) {
    selectedEmployees.value = []
  }

  if (checked) {
    // Добавляем сотрудника, если его еще нет
    const exists = selectedEmployees.value.some((sel: Employee) => {
      if (typeof sel === 'object' && sel !== null && 'value' in sel) {
        return sel.value === employee.value
      }
      return sel === employee.value
    })
    if (!exists) {
      selectedEmployees.value.push(employee)
    }
  } else {
    // Удаляем сотрудника
    const index = selectedEmployees.value.findIndex((sel: Employee) => {
      if (typeof sel === 'object' && sel !== null && 'value' in sel) {
        return sel.value === employee.value
      }
      return sel === employee.value
    })
    if (index > -1) {
      selectedEmployees.value.splice(index, 1)
    }
  }
}

const toggleEmployee = (employee: Employee) => {
  if (!Array.isArray(selectedEmployees.value)) {
    selectedEmployees.value = []
  }

  const index = selectedEmployees.value.findIndex((sel: Employee) => {
    if (typeof sel === 'object' && sel !== null && 'value' in sel) {
      return sel.value === employee.value
    }
    return sel === employee.value
  })

  if (index > -1) {
    selectedEmployees.value.splice(index, 1)
  } else {
    selectedEmployees.value.push(employee)
  }
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
    <BannerComponent
      title="Выберите сотрудников"
      description="Выберите сотрудников для генерации отчета"
      color="air-primary"
      size="sm"
      class="mb-6"
    />
    <div class="space-y-4">

      <!-- Список сотрудников -->
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <ScrollAreaComponent class="h-[425px]">
          <div class="p-4 space-y-1">
            <!-- Чекбокс "Выбрать все" -->
            <div class="pb-2 mb-2 border-b border-gray-200 dark:border-gray-700">
              <CheckboxComponent
                :model-value="allEmployeesSelected"
                @update:model-value="handleSelectAll"
                label="Выбрать все"
                color="air-primary"
                variant="list"
              />
            </div>
            <template
              v-for="[department, employees] in groupedEmployees"
              :key="department"
            >
              <!-- Отдел -->
              <div class="py-2 px-3 font-semibold text-gray-700 dark:text-gray-300">
                {{ department }}
              </div>

              <!-- Сотрудники отдела -->
              <div
                v-for="employee in employees"
                :key="employee.id"
                class="flex items-center gap-3 py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded cursor-pointer"
                @click="toggleEmployee(employee)"
              >
                <CheckboxComponent
                  :model-value="isEmployeeSelected(employee)"
                  @update:model-value="handleToggleEmployee(employee)"
                  @click.stop
                  color="air-primary"
                  variant="list"
                />
                <AvatarComponent
                  v-if="employee.avatar"
                  :src="employee.avatar.src"
                  :alt="employee.label"
                  size="sm"
                />
                <div
                  v-else
                  class="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 text-xs"
                >
                  {{ employee.label.charAt(0).toUpperCase() }}
                </div>
                <span class="flex-1 text-gray-900 dark:text-gray-100">
                  {{ employee.label }}
                </span>
              </div>
            </template>
          </div>
        </ScrollAreaComponent>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Отчётный период:
        </label>
        <div class="flex items-center gap-4">
          <div class="">
            <InputComponent
              v-model="startDate"
              type="date"
            />
          </div>
          <span class="text-gray-500 dark:text-gray-400">—</span>
          <div class="flex-1">
            <InputComponent
              v-model="endDate"
              type="date"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
