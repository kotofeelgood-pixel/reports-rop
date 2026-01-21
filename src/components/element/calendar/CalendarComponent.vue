<script lang="ts" setup>
import type { CalendarModel } from './model';

const props = defineProps<CalendarModel>();
const modelValue = defineModel<Date | Date[] | undefined>('modelValue');

defineEmits<{
  'update:modelValue': [payload: Date | Date[] | undefined];
  change: [payload: Date | Date[] | undefined];
}>();

</script>

<template>
  <B24Calendar
    v-bind="props"
    v-model="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
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
  </B24Calendar>
</template>
