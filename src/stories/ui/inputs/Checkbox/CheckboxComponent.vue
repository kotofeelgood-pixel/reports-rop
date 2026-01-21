<script lang="ts" setup>
import type { CheckboxModel } from './model';

const props = defineProps<CheckboxModel>();

defineSlots<{
  label?: (props: { label?: string }) => any;
  description?: (props: { description?: string }) => any;
}>();

</script>

<template>
  <B24Checkbox
    v-bind="props"
  >
    <template v-if="$slots.label" #label="slotProps">
      <slot name="label" v-bind="slotProps" />
    </template>
    <template v-if="$slots.description" #description="slotProps">
      <slot name="description" v-bind="slotProps" />
    </template>
  </B24Checkbox>
</template>
