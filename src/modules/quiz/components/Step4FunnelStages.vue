<script setup lang="ts">
import { computed } from 'vue'
import RadioGroupComponent from '@/components/radio-group/RadioGroupComponent.vue'
import BannerComponent from '@/components/banner/BannerComponent.vue'
import ScrollAreaComponent from '@/components/scroll-area/ScrollAreaComponent.vue'

export interface FunnelStageModel {
  label: string
  value: string | null
}

const { data } = defineProps<{data: FunnelStageModel[]}>()
const model = defineModel<string | null>()

// Преобразуем данные для RadioGroupComponent (null -> undefined)
const radioItems = computed(() => {
  return data.map(item => ({
    label: item.label,
    value: item.value ?? undefined,
  })) as Array<{ label: string; value: string | undefined }>
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 h-full flex flex-col">
    <BannerComponent
      title="4. Выберите ключевые этапы воронки:"
      description="Выберите ключевые этапы воронки для генерации отчёта"
      color="air-primary"
      size="sm"
      class="mb-4"
    />
    <ScrollAreaComponent class="flex-1 min-h-0">
      <RadioGroupComponent
        v-model="model"
        :items="radioItems"
        variant="card"
        color="air-primary"
      />
    </ScrollAreaComponent>
  </div>
</template>
