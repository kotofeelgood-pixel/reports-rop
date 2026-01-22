<script lang="ts" setup>
import type { ColorPickerModel } from './model';

const props = defineProps<ColorPickerModel>();
const modelValue = defineModel<string | undefined>('modelValue');

defineEmits<{
  'update:modelValue': [payload: string | undefined];
  change: [payload: string | undefined];
}>();

</script>

<template>
  <B24ColorPicker
    v-bind="props"
    v-model="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    @change="$emit('change', $event)"
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
  </B24ColorPicker>
</template>
