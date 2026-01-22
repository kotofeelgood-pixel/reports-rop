<script lang="ts" setup>
import { useSlots } from 'vue';

const slots = useSlots();
const slotNames = Object.keys(slots) as string[];

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
    v-bind="$attrs"
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
      v-for="slot in slotNames"
      :key="slot"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </B24SelectMenu>
</template>
