<script lang="ts" setup>
import type { CommandPaletteModel, AcceptableValue } from './model';

const props = defineProps<CommandPaletteModel>();
const modelValue = defineModel<AcceptableValue | AcceptableValue[] | undefined>('modelValue');
const searchTerm = defineModel<string>('searchTerm', { default: '' });

defineEmits<{
  'update:modelValue': [value: AcceptableValue | AcceptableValue[]];
  highlight: [payload: { ref: HTMLElement; value: any } | undefined];
  entryFocus: [event: CustomEvent<any>];
  leave: [event: Event];
  'update:open': [value: boolean];
  'update:searchTerm': [value: string];
}>();

defineSlots<{
  empty(): any;
  footer(): any;
  back(): any;
  close(): any;
  item(): any;
  'item-leading'(): any;
  'item-label'(): any;
  'item-description'(): any;
  'item-trailing'(): any;
}>();

</script>

<template>
  <B24CommandPalette
    v-bind="props"
    v-model="modelValue"
    v-model:search-term="searchTerm"
    @update:model-value="$emit('update:modelValue', $event)"
    @highlight="$emit('highlight', $event)"
    @entry-focus="$emit('entryFocus', $event)"
    @leave="$emit('leave', $event)"
    @update:open="$emit('update:open', $event)"
    @update:search-term="$emit('update:searchTerm', $event)"
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
  </B24CommandPalette>
</template>
