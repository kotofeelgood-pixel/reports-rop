<script lang="ts" setup>
import type { ColorModeImageModel } from './model';

const props = defineProps<ColorModeImageModel>();

defineSlots<{
  default(): any;
}>();

</script>

<template>
  <B24ColorModeImage
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
  </B24ColorModeImage>
</template>
