<script setup lang="ts">
import ButtonComponent from '@/components/buttons/ButtonComponent.vue'

interface Props {
  isFirstStep: boolean
  isLastStep: boolean
}

defineProps<Props>()

defineEmits<{
  prev: []
  next: []
  generate: []
}>()


const model = defineModel<number>('modelValue', { default: 0 })
</script>

<template>
  <div class="flex justify-end gap-4">
    <ButtonComponent
      v-if="!isFirstStep"
      label="Назад"
      variant="outline"
      color="air-primary"
      size="lg"
      @click="model > 0 ? model-- : 0"
    />
    <ButtonComponent
      v-if="!isLastStep"
      label="Далее"
      color="air-primary"
      size="lg"
      @click="model++"
    />
    <ButtonComponent
      v-if="isLastStep"
      label="Сформировать отчёт"
      color="air-primary-success"
      size="lg"
      @click="$emit('generate')"
    />
  </div>
</template>
