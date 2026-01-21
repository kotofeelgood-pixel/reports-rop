<script lang="ts" setup>
import type { TimelineModel } from './model';

const props = defineProps<TimelineModel>();
const modelValue = defineModel<string | number | undefined>('modelValue');

defineEmits<{
  'update:modelValue': [payload: string | number | undefined];
}>();

defineSlots<{
  indicator(): any;
  date(): any;
  title(): any;
  description(): any;
}>();

</script>

<template>
  <B24Timeline
    v-bind="props"
    v-model="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
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
  </B24Timeline>
</template>
