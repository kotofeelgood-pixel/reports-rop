<script setup lang="ts">
import { computed } from 'vue'
import CheckboxComponent from '@/components/inputs/Checkbox/CheckboxComponent.vue'
import BannerComponent from '@/components/banner/BannerComponent.vue'
import ScrollAreaComponent from '@/components/scroll-area/ScrollAreaComponent.vue'
import type { DealDirection } from '@/stores/useReportsQuizStore'

const { data } = defineProps<{data: DealDirection[]}>()
const model = defineModel<string[]>({ default: () => [] })

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
    // Используем splice для замены всех элементов
    if (model.value.length === 0) {
      model.value.push(...allValues)
    } else {
      model.value.splice(0, model.value.length, ...allValues)
    }
  } else {
    // Снимаем все - удаляем все элементы через splice
    const currentLength = model.value.length
    if (currentLength > 0) {
      model.value.splice(0, currentLength)
    }
  }
}

const handleToggleDirection = (directionValue: string) => (checked: boolean) => {
  if (checked) {
    if (!model.value.includes(directionValue)) {
      model.value.push(directionValue)
    }
  } else {
    const index = model.value.indexOf(directionValue)
    if (index > -1) {
      model.value.splice(index, 1)
    }
  }
}

const isDirectionSelected = (value: string) => {
  return model.value.includes(value)
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
    <BannerComponent
      title="Выберите направления сделок"
      description="Выберите направления сделок для генерации отчёта"
      color="air-primary"
      size="sm"
      class="mb-6"
    />
    <ScrollAreaComponent class="h-[425px]">
      <div class="space-y-2">
        <CheckboxComponent
          :model-value="allDirectionsSelected"
          @update:model-value="handleSelectAll"
          label="Выбрать все"
          color="air-primary"
          variant="card"
        />
        <CheckboxComponent
          v-for="direction in data"
          :key="direction.value"
          :model-value="isDirectionSelected(direction.value)"
          @update:model-value="handleToggleDirection(direction.value)"
          :label="direction.label"
          color="air-primary"
          variant="card"
        />
      </div>
    </ScrollAreaComponent>
  </div>
</template>
