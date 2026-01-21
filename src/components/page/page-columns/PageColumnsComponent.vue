<script lang="ts" setup>
import type { PageColumnsModel } from './model';

const props = defineProps<PageColumnsModel>();

defineSlots<{
  default(): any;
}>();

</script>

<template>
  <B24PageColumns
    v-bind="props"
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
  </B24PageColumns>
</template>
