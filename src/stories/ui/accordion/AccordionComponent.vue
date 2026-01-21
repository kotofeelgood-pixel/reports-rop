<script lang="ts" setup>
import type { AccordionModel } from './model';

const props = defineProps<AccordionModel>();
const modelValue = defineModel<string | string[]>('modelValue');

</script>

<template>
  <B24Accordion
    v-bind="props"
    v-model="modelValue"
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
  </B24Accordion>
</template>
