<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useColorMode } from '@vueuse/core'
import { useReportSettingsStoreRefs } from '@/stores/reportSettings'
import { useUsersStore, useUsersStoreRefs } from '@/stores/users'
import ModalComponent from '@/components/modal/ModalComponent.vue'
import SelectComponent from '@/components/select/SelectComponent.vue'
import CheckboxComponent from '@/components/inputs/Checkbox/CheckboxComponent.vue'
import ButtonComponent from '@/components/buttons/ButtonComponent.vue'

const model = defineModel<boolean>('open', { default: false })

const {
  chartStartHour,
  chartEndHour,
  chartType,
  layoutType,
  excludedDepartment,
  excludedEmployeeIds,
  minCallDurationSeconds,
  fontSizePercent,
  embedAnalytics,
  embedStatsMenu,
} = useReportSettingsStoreRefs()

const usersStore = useUsersStore()
const { users } = useUsersStoreRefs()

const employeeOptions = computed(() =>
  (users.value || []).map(u => ({ label: u.name, value: u.id }))
)

onMounted(() => {
  void usersStore.fetchUsers()
})

const mode = useColorMode({
  initialValue: 'dark',
})

const isDarkTheme = computed({
  get: () => mode.value === 'dark',
  set: (value: boolean) => {
    mode.value = value ? 'dark' : 'light'
  },
})

const departments = [
  { label: 'Отдел продаж', value: 'sales' },
  { label: 'Служба поддержки', value: 'support' },
  { label: 'Менеджмент', value: 'management' },
  { label: 'Разработка', value: 'development' },
]

const hours = Array.from({ length: 25 }, (_, i) => ({
  label: `${i}:00`,
  value: i,
}))
</script>

<template>
  <ModalComponent
    v-model:open="model"
    title="Настройки"
    description="Параметры отображения отчета по звонкам."
    overlay
    modal
    :close="true"
  >
    <template #body>
      <div class="max-h-[60vh] space-y-4 overflow-y-auto pr-2">
          <!-- Диапазон графика -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">Диапазон графика</label>
            <div class="grid grid-cols-2 gap-4">
              <!-- Начало диапазона -->
              <div class="min-w-0 space-y-2">
                <label class="block text-xs text-gray-600 dark:text-gray-400">С</label>
                <SelectComponent
                  v-model="chartStartHour"
                  :items="hours.filter(h => h.value < chartEndHour)"
                  placeholder="Начало"
                  full-width
                />
              </div>

              <!-- Конец диапазона -->
              <div class="min-w-0 space-y-2">
                <label class="block text-xs text-gray-600 dark:text-gray-400">До</label>
                <SelectComponent
                  v-model="chartEndHour"
                  :items="hours.filter(h => h.value > chartStartHour)"
                  placeholder="Конец"
                  full-width
                />
              </div>
            </div>
          </div>

          <!-- Тип графика и Расположение блоков -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Тип графика -->
            <div class="min-w-0 space-y-2 w-full">
              <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">Тип графика</label>
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
              <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">Расположение блоков</label>
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

          <!-- Исключить отдел и сотрудников -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Исключить отдел -->
            <div class="min-w-0 space-y-2">
              <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">Исключить отдел</label>
              <SelectComponent
                v-model="excludedDepartment"
                :items="departments"
                placeholder="Выберите отдел"
                full-width
              />
            </div>

            <!-- Исключить сотрудников -->
            <div class="min-w-0 space-y-2">
              <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">Исключить сотрудников</label>
              <SelectComponent
                v-model="excludedEmployeeIds"
                :items="employeeOptions"
                multiple
                placeholder="Выберите сотрудников"
                full-width
              />
            </div>
          </div>

          <!-- Минимальная длительность звонка -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">Минимальная длительность звонка</label>
            <div class="flex items-center gap-3">
              <input
                v-model="minCallDurationSeconds"
                type="range"
                min="0"
                max="600"
                class="h-1 flex-1 cursor-pointer rounded-full bg-blue-200 accent-[#2fc6f6] dark:bg-gray-700"
              />
              <span class="min-w-[72px] rounded bg-white px-2 py-1 text-xs text-center shadow dark:bg-gray-700 dark:text-gray-200">
                {{ minCallDurationSeconds }} сек.
              </span>
            </div>
          </div>

          <!-- Размер шрифта -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">Размер шрифта</label>
            <div class="flex items-center gap-3">
              <input
                v-model="fontSizePercent"
                type="range"
                min="50"
                max="150"
                class="h-1 flex-1 cursor-pointer rounded-full bg-blue-200 accent-[#2fc6f6] dark:bg-gray-700"
              />
              <span class="min-w-[56px] rounded bg-white px-2 py-1 text-xs text-center shadow dark:bg-gray-700 dark:text-gray-200">
                {{ fontSizePercent }}
              </span>
            </div>
          </div>

          <!-- Места встраивания -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-800 dark:text-gray-200">Места встраивания</label>
            <div class="flex gap-2">
              <button
                type="button"
                class="flex-1 rounded border px-3 py-2 text-sm"
                :class="embedAnalytics ? 'border-[#2fc6f6] bg-white text-gray-900 dark:bg-gray-700 dark:text-white' : 'border-gray-300 bg-gray-50 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300'"
                @click="embedAnalytics = !embedAnalytics"
              >
                Аналитика
              </button>
              <button
                type="button"
                class="flex-1 rounded border px-3 py-2 text-sm"
                :class="embedStatsMenu ? 'border-[#2fc6f6] bg-white text-gray-900 dark:bg-gray-700 dark:text-white' : 'border-gray-300 bg-gray-50 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300'"
                @click="embedStatsMenu = !embedStatsMenu"
              >
                Меню статистики звонков
              </button>
            </div>
          </div>

          <!-- Тёмная тема -->
          <div class="flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700">
            <label class="text-sm font-medium text-gray-800 dark:text-gray-200">Тёмная тема</label>
            <CheckboxComponent v-model="isDarkTheme">
              <template #label>
                <span class="text-sm text-gray-800 dark:text-gray-200">Включить</span>
              </template>
            </CheckboxComponent>
          </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-3">
        <ButtonComponent
          variant="ghost"
          class="px-4"
          @click="model = false"
        >
          Отменить
        </ButtonComponent>
        <ButtonComponent
          variant="primary"
          class="px-4"
          @click="model = false"
        >
          Сохранить
        </ButtonComponent>
      </div>
    </template>
  </ModalComponent>
</template>

