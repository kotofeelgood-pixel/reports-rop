<script lang="ts" setup>
import { useSlots } from 'vue';

const slots = useSlots();
const slotNames = Object.keys(slots) as string[];

defineEmits<{
  'update:modelValue': [value: any];
  blur: [event: FocusEvent];
  change: [event: Event];
}>();

</script>

<template>
  <B24Textarea
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)"
    @blur="$emit('blur', $event)"
    @change="$emit('change', $event)"
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
  </B24Textarea>
</template>
