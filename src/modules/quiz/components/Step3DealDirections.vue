<script setup lang="ts">
import { computed } from 'vue'
import CheckboxGroupComponent from '@/components/inputs/CheckboxGroup/CheckboxGroupComponent.vue'
import CheckboxComponent from '@/components/inputs/Checkbox/CheckboxComponent.vue'
import BannerComponent from '@/components/banner/BannerComponent.vue'
import ScrollAreaComponent from '@/components/scroll-area/ScrollAreaComponent.vue'
import type { DealDirection } from '@/stores/useReportsQuizStore'

const { data } = defineProps<{data: DealDirection[]}>()
const model = defineModel<string[]>({ default: () => [] })

// Преобразуем данные для CheckboxGroupComponent
const checkboxItems = computed(() => {
  return data.map(d => ({
    value: d.value,
    label: d.label,
  }))
})

const allDirectionsSelected = computed(() => {
  if (!data || data.length === 0) return false
  if (!model.value || model.value.length === 0) return false
  // Проверяем, что все элементы из data присутствуют в model.value
  return model.value.length === data.length &&
         data.every(d => model.value.includes(d.value))
})

const handleSelectAll = (checked: boolean) => {
  if (checked) {
    // Выбираем все - создаем новый массив со всеми значениями
    const allValues = data.map((d) => d.value)
    model.value = [...allValues]
  } else {
    // Снимаем все - создаем пустой массив
    model.value = []
  }
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 h-full flex flex-col">
    <BannerComponent
      title="3. Выберите направления сделок"
      description="Выберите направления сделок для генерации отчёта"
      color="air-primary"
      size="sm"
      class="mb-4"
    />
    <ScrollAreaComponent class="flex-1 min-h-0">
      <div class="space-y-2">
        <CheckboxComponent
          :model-value="allDirectionsSelected"
          @update:model-value="handleSelectAll"
          label="Выбрать все"
          color="air-primary"
          variant="card"
        />
        <CheckboxGroupComponent
          v-model="model"
          :items="checkboxItems"
          variant="card"
          color="air-primary"
          orientation="vertical"
        />
      </div>
    </ScrollAreaComponent>
  </div>
</template>
