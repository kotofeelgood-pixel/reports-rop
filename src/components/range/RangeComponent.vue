<script lang="ts" setup>
import type { RangeModel } from './model';

const props = defineProps<RangeModel>();
const modelValue = defineModel<number | number[]>('modelValue');

defineEmits<{
  'update:modelValue': [value: number | number[] | undefined];
  change: [event: Event];
}>();

</script>

<template>
  <B24Range
    v-bind="props"
    v-model="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    @change="$emit('change', $event)"
  />
</template>
