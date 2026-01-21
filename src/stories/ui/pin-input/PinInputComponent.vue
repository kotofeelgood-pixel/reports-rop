<script lang="ts" setup>
import type { PinInputModel } from './model';

const props = defineProps<PinInputModel>();
const modelValue = defineModel<string[] | null>('modelValue');

defineEmits<{
  'update:modelValue': [value: string[]];
  complete: [value: string[]];
  change: [event: Event];
  blur: [event: Event];
}>();

</script>

<template>
  <B24PinInput
    v-bind="props"
    v-model="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    @complete="$emit('complete', $event)"
    @change="$emit('change', $event)"
    @blur="$emit('blur', $event)"
  />
</template>
