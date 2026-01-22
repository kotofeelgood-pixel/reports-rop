<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useReportQuizStoreRefs, useReportQuizStore } from '@/stores/useReportsQuizStore'
import { useColorMode } from '@vueuse/core'
import Step1ReportMode from './components/Step1ReportMode.vue'
import Step2UsersPeriod from './components/Step2UsersPeriod.vue'
import Step3DealDirections from './components/Step3DealDirections.vue'
import Step4FunnelStages from './components/Step4FunnelStages.vue'
import Step5ReportSettings from './components/Step5ReportSettings.vue'
import ColorModeSwitchComponent from '@/components/color-mode-switch/ColorModeSwitchComponent.vue'
import ButtonComponent from '@/components/buttons/ButtonComponent.vue'

const { reportModes, filteredDealDirections, filteredFunnelStages, dealDirections, reportMode, funnelStage, hideCallsSection, hideLeadsSection, hideDealsSection, effectiveCallSeconds, isLoading, loadingError, loadErrors } = useReportQuizStoreRefs()
const { loadDealCategories } = useReportQuizStore()

// Инициализация при монтировании компонента
onMounted(() => {
  loadDealCategories()
})

const colorMode = useColorMode({
  selector: 'html',
  attribute: 'class',
  modes: {
    light: '',
    dark: 'dark',
  },
})

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value: boolean) => {
    colorMode.value = value ? 'dark' : 'light'
  },
})

const reportSettings = computed({
  get: () => ({
    hideCallsSection: hideCallsSection.value,
    hideLeadsSection: hideLeadsSection.value,
    hideDealsSection: hideDealsSection.value,
    effectiveCallSeconds: effectiveCallSeconds.value,
  }),
  set: (value) => {
    hideCallsSection.value = value.hideCallsSection
    hideLeadsSection.value = value.hideLeadsSection
    hideDealsSection.value = value.hideDealsSection
    effectiveCallSeconds.value = value.effectiveCallSeconds
  },
})

const handleGenerateReport = () => {
  // generateReport()
}
</script>

<template>
  <div class="min-h-dvh bg-white dark:bg-gray-900">
    <div class="mx-auto space-y-6 w-full max-w-[1800px]">
      <!-- Заголовок и переключатель темы -->
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Инструкция по работе с отчетом
        </h1>
        <ColorModeSwitchComponent
          v-model="isDark"
          label="Темная тема"
          color="air-primary"
          size="md"
        />
      </div>

      <!-- Отображение ошибок загрузки -->
      <div v-if="Object.keys(loadErrors).length > 0" class="space-y-2">
        <div
          v-for="(error, key) in loadErrors"
          :key="key"
          class="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4"
        >
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-red-800 dark:text-red-200">
                {{ error }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Общая ошибка загрузки -->
      <div
        v-if="loadingError"
        class="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4"
      >
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3 flex-1">
            <p class="text-sm font-medium text-red-800 dark:text-red-200">
              {{ loadingError }}
            </p>
          </div>
        </div>
      </div>

      <!-- Индикатор загрузки -->
      <div v-if="isLoading" class="flex items-center justify-center p-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span class="ml-3 text-gray-700 dark:text-gray-300">Загрузка данных...</span>
      </div>

      <!-- Основной контент: колонки 1-4 -->
      <div class="grid grid-cols-4 gap-4 mb-6 items-stretch">
        <!-- Колонка 1: Выберите режим отчёта -->
        <div class="flex">
          <Step1ReportMode
            :data="reportModes"
            v-model="reportMode"
            class="w-full"
          />
        </div>

        <!-- Колонка 2: Пользователи / период -->
        <div class="flex">
          <Step2UsersPeriod class="w-full" />
        </div>

        <!-- Колонка 3: Выберите направления сделок -->
        <div class="flex">
          <Step3DealDirections
            :data="filteredDealDirections"
            v-model="dealDirections"
            class="w-full"
          />
        </div>

        <!-- Колонка 4: Выберите ключевые этапы воронки -->
        <div class="flex">
          <Step4FunnelStages
            :data="filteredFunnelStages"
            v-model="funnelStage"
            class="w-full"
          />
        </div>
      </div>

      <!-- Раздел 5: Настройки отчета -->
      <div class="mb-6">
        <Step5ReportSettings
          v-model="reportSettings"
        />
      </div>

      <!-- Кнопка Сформировать отчёт -->
      <div class="flex justify-end">
        <ButtonComponent
          label="Сформировать отчёт"
          color="air-primary-success"
          size="lg"
          @click="handleGenerateReport"
        />
      </div>
    </div>
  </div>
</template>
