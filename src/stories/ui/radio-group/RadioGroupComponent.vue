<script lang="ts" setup>
import type { RadioGroupModel } from './model';

const props = defineProps<RadioGroupModel>();
const modelValue = defineModel<any>('modelValue');

defineEmits<{
  'update:modelValue': [value: any];
  change: [event: Event];
}>();

defineSlots<{
  legend?: () => any;
  label?: (props: { label?: string }) => any;
  description?: (props: { description?: string }) => any;
}>();

</script>

<template>
  <B24RadioGroup
    v-bind="props"
    v-model="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    @change="$emit('change', $event)"
  >
    <template
      v-if="$slots.legend"
      #legend
    >
      <slot name="legend" />
    </template>
    <template
      v-if="$slots.label"
      #label="slotProps"
    >
      <slot
        name="label"
        v-bind="slotProps"
      />
    </template>
    <template
      v-if="$slots.description"
      #description="slotProps"
    >
      <slot
        name="description"
        v-bind="slotProps"
      />
    </template>
  </B24RadioGroup>
</template>
