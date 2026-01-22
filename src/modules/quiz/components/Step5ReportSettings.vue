<script setup lang="ts">
import CheckboxComponent from '@/components/inputs/Checkbox/CheckboxComponent.vue'
import InputNumberComponent from '@/components/inputs/InputNumber/InputNumberComponent.vue'
import BannerComponent from '@/components/banner/BannerComponent.vue'

export interface ReportSettingsModel {
  hideCallsSection: boolean
  hideLeadsSection: boolean
  hideDealsSection: boolean
  effectiveCallSeconds: number
}

const model = defineModel<ReportSettingsModel>({
  default: () => ({
    hideCallsSection: false,
    hideLeadsSection: false,
    hideDealsSection: false,
    effectiveCallSeconds: 5,
  }),
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg">
    <BannerComponent
      title="5. Настройки отчета"
      description="Настройте параметры генерации отчёта"
      color="air-primary"
      size="sm"
      class="mb-4"
    />
    <div class="space-y-2">
      <CheckboxComponent
        v-model="model.hideCallsSection"
        label="Скрыть раздел Звонки"
        color="air-primary"
        variant="card"
      />
      <CheckboxComponent
        v-model="model.hideLeadsSection"
        label="Скрыть раздел Лиды"
        color="air-primary"
        variant="card"
      />
      <CheckboxComponent
        v-model="model.hideDealsSection"
        label="Скрыть раздел Сделки"
        color="air-primary"
        variant="card"
      />
      <div class="flex items-center gap-2 pt-2 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <span class="text-sm text-gray-700 dark:text-gray-300">Результативный звонок больше, чем</span>
        <InputNumberComponent
          v-model="model.effectiveCallSeconds"
          class="w-20"
        />
        <span class="text-sm text-gray-700 dark:text-gray-300">секунд</span>
      </div>
    </div>
  </div>
</template>
