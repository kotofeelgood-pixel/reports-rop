<script setup lang="ts">
import { computed } from 'vue'
import StepperComponent from '@/components/stepper/StepperComponent.vue'
import type { StepperItem } from '@bitrix24/b24ui-nuxt'

interface Step { title: string}


const { steps } = defineProps<{ steps: Step[]}>()
const model = defineModel<number>('modelValue')

const items = computed<StepperItem[]>(() => {
  return steps.map(step => ({
    title: step.title,
  }))
})
</script>

<template>
  <StepperComponent
    :items="items"
    v-model="model"
    :disabled="true"
    size="md"
    color="air-primary"
    orientation="horizontal"
    class=""
    />
</template>
