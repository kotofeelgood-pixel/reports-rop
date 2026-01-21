<script lang="ts" setup>
import type { ColorModeButtonModel } from './model';

const props = defineProps<ColorModeButtonModel>();

defineSlots<{
  default(): any;
}>();

</script>

<template>
  <B24ColorModeButton
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
  </B24ColorModeButton>
</template>
