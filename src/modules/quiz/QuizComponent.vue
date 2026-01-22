<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useReportQuizStoreRefs, useReportQuizStore } from '@/stores/useReportsQuizStore'
import { useColorMode } from '@vueuse/core'
import Step1ReportMode from './components/Step1ReportMode.vue'
import Step2UsersPeriod from './components/Step2UsersPeriod.vue'
import Step3DealDirections from './components/Step3DealDirections.vue'
import Step4FunnelStages from './components/Step4FunnelStages.vue'
import Step5ReportSettings from './components/Step5ReportSettings.vue'
import QuizStepsIndicator from './components/QuizStepsIndicator.vue'
import QuizNavigation from './components/QuizNavigation.vue'
import ColorModeSwitchComponent from '@/components/color-mode-switch/ColorModeSwitchComponent.vue'

const { currentStep, reportModes, dealDirectionsList, dealDirections, reportMode, funnelStages, funnelStage, hideCallsSection, hideLeadsSection, hideDealsSection, effectiveCallSeconds, isLoading, loadingError, loadErrors } = useReportQuizStoreRefs()
const { generateReport, initializeQuiz } = useReportQuizStore()

// Инициализация при монтировании компонента
onMounted(() => {
  initializeQuiz()
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

const steps = computed(() => [
  { component: Step1ReportMode, title: 'Выберите режим отчёта', data: reportModes.value },
  { component: Step2UsersPeriod, title: 'Пользователи / период' },
  { component: Step3DealDirections, title: 'Выберите направления сделок', data: dealDirectionsList.value },
  { component: Step4FunnelStages, title: 'Выберите ключевые этапы воронки', data: funnelStages.value },
  { component: Step5ReportSettings, title: 'Настройки отчета' },
])

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

const currentStepComponent = computed(() => steps.value[currentStep.value]?.component)
const currentStepData = computed(() => steps.value[currentStep.value]?.data)
const isLastStep = computed(() => currentStep.value === steps.value.length - 1)
const isFirstStep = computed(() => currentStep.value === 0)



const handleGenerateReport = () => {
  generateReport()
}
</script>

<template>
  <div class="min-h-dvh bg-white dark:bg-gray-900 p-6">
    <div class="mx-auto space-y-6 w-full">
      <div class="flex justify-end mb-4">
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

      <QuizStepsIndicator
        :steps="steps"
        v-model="currentStep"
      />

      <div class="space-y-6">
        <Step1ReportMode
          v-if="currentStep === 0"
          :data="reportModes"
          v-model="reportMode"
        />
        <Step2UsersPeriod
          v-else-if="currentStep === 1"
        />
        <Step3DealDirections
          v-else-if="currentStep === 2"
          :data="dealDirectionsList"
          v-model="dealDirections"
        />
        <Step4FunnelStages
          v-else-if="currentStep === 3"
          :data="funnelStages"
          v-model="funnelStage"
        />
        <Step5ReportSettings
          v-else-if="currentStep === 4"
          v-model="reportSettings"
        />
      </div>

      <QuizNavigation
        :is-first-step="isFirstStep"
        :is-last-step="isLastStep"
        v-model="currentStep"
        @generate="handleGenerateReport"
      />
    </div>
  </div>
</template>
