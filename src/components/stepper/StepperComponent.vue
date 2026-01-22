<script lang="ts" setup>
import type { StepperModel } from './model';

const props = defineProps<StepperModel>();
const modelValue = defineModel<string | number>('modelValue');

defineEmits<{
  next: [value: any];
  prev: [value: any];
}>();

</script>

<template>
  <B24Stepper
    v-bind="props"
    v-model="modelValue"
    @next="$emit('next', $event)"
    @prev="$emit('prev', $event)"
  >
    <template
      v-for="(_, slot) in ($slots as any)"
      :key="slot"
      #[slot]="scope"
    >
      <slot
        :name="slot as string"
        v-bind="scope"
      />
    </template>
  </B24Stepper>
</template>
