<script lang="ts" setup>
import { useSlots } from 'vue';

const slots = useSlots();
const slotNames = Object.keys(slots) as string[];

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
    v-bind="$attrs"
    @update:open="$emit('update:open', $event)"
    @change="$emit('change', $event)"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
    @update:model-value="$emit('update:modelValue', $event)"
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
  </B24Select>
</template>
