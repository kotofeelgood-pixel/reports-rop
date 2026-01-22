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
      v-for="(_, slot) in ($slots as any)"
      :key="slot"
      #[slot]="scope"
    >
      <slot
        :name="slot as string"
        v-bind="scope"
      />
    </template>
  </B24ColorModeImage>
</template>
