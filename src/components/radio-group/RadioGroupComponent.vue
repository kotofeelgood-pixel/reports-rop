<script lang="ts" setup>
import type { RadioGroupModel } from './model';

const props = defineProps<RadioGroupModel>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modelValue = defineModel<any>('modelValue');

defineSlots<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legend?: () => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label?: (props: { label?: string; item?: any }) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: (props: { description?: string; [key: string]: any }) => any;
}>();

</script>

<template>
  <B24RadioGroup
    v-bind="props as any"
    v-model="modelValue"
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
