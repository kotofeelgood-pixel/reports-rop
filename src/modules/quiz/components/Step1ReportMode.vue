<script setup lang="ts">
import RadioGroupComponent from '@/components/radio-group/RadioGroupComponent.vue'
import BadgeComponent from '@/components/badge/BadgeComponent.vue'
import BannerComponent from '@/components/banner/BannerComponent.vue'
import ScrollAreaComponent from '@/components/scroll-area/ScrollAreaComponent.vue'

export interface StepOneModel {
  label: string
  value: string
  isNew?: boolean
}

const { data } = defineProps<{data: StepOneModel[]}>()
const model = defineModel<string>()

const getItemByLabel = (label: string | undefined) => {
  if (!label) return undefined
  return data.find(item => item.label === label)
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 h-full flex flex-col">
    <BannerComponent
      title="1. Выберите режим отчёта"
      description="Выберите режим отчёта для генерации отчёта"
      color="air-primary"
      size="sm"
      class="mb-4"
    />
    <ScrollAreaComponent class="flex-1 min-h-0">
      <RadioGroupComponent
        v-model="model"
        :items="data"
        variant="card"
        color="air-primary"
      >
        <template #label="slotProps">
          <div class="flex items-center gap-2">
            <span>{{ slotProps.label || slotProps.item?.label }}</span>
            <BadgeComponent
              v-if="slotProps.item?.isNew || getItemByLabel(slotProps.label || slotProps.item?.label || undefined)?.isNew"
              variant="new"
              size="sm"
            >
              NEW
            </BadgeComponent>
          </div>
        </template>
      </RadioGroupComponent>
    </ScrollAreaComponent>
  </div>
</template>
