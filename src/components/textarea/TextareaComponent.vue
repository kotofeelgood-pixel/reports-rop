<script lang="ts" setup>
import type { TextareaModel, TextareaValue } from './model';

const props = defineProps<TextareaModel>();
const modelValue = defineModel<TextareaValue>('modelValue');

defineEmits<{
  'update:modelValue': [value: TextareaValue];
  blur: [event: FocusEvent];
  change: [event: Event];
}>();

</script>

<template>
  <B24Textarea
    v-bind="props"
    v-model="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    @blur="$emit('blur', $event)"
    @change="$emit('change', $event)"
  >
    <template
      v-for="(_, slot) in $slots"
      :key="slot"
      #[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </B24Textarea>
</template>
