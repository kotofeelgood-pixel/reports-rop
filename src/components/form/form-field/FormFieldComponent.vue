<script lang="ts" setup>
import type { FormFieldModel } from './model';

const props = defineProps<FormFieldModel>();

defineSlots<{
  default(): any;
  label(): any;
  description(): any;
  error(): any;
}>();

</script>

<template>
  <B24FormField
    v-bind="props"
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
  </B24FormField>
</template>
