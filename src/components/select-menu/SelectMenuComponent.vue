<script lang="ts" setup>
import type { SelectMenuModel } from './model';

const props = defineProps<SelectMenuModel>();
const modelValue = defineModel<any>('modelValue');
const open = defineModel<boolean>('open');
const searchTerm = defineModel<string>('searchTerm');

defineEmits<{
  'update:open': [value: boolean];
  change: [event: Event];
  blur: [event: FocusEvent];
  focus: [event: FocusEvent];
  create: [item: string];
  highlight: [payload: { ref: HTMLElement; value: any } | undefined];
  'update:modelValue': [value: any];
  'update:searchTerm': [value: string];
}>();

</script>

<template>
  <B24SelectMenu
    v-bind="props"
    v-model="modelValue"
    v-model:open="open"
    v-model:search-term="searchTerm"
    @update:open="$emit('update:open', $event)"
    @change="$emit('change', $event)"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
    @create="$emit('create', $event)"
    @highlight="$emit('highlight', $event)"
    @update:model-value="$emit('update:modelValue', $event)"
    @update:search-term="$emit('update:searchTerm', $event)"
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
  </B24SelectMenu>
</template>
