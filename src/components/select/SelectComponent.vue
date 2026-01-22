<script lang="ts" setup>
import type { SelectModel } from './model';

const props = defineProps<SelectModel>();
const modelValue = defineModel<any>('modelValue');
const open = defineModel<boolean>('open');

defineEmits<{
  'update:open': [value: boolean];
  change: [event: Event];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
  'update:modelValue': [value: any];
}>();

</script>

<template>
  <B24Select
    v-bind="props"
    v-model="modelValue"
    v-model:open="open"
    @update:open="$emit('update:open', $event)"
    @change="$emit('change', $event)"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
    @update:model-value="$emit('update:modelValue', $event)"
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
  </B24Select>
</template>
