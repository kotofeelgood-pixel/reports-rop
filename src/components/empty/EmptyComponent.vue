<script lang="ts" setup>
import type { EmptyModel } from './model';

const props = defineProps<EmptyModel>();

defineSlots<{
  icon(): any;
  title(): any;
  description(): any;
  action(): any;
}>();

</script>

<template>
  <B24Empty
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
  </B24Empty>
</template>
