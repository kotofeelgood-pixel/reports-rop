<script lang="ts" setup>
import type { ChipModel } from './model';

const props = defineProps<ChipModel>();

defineSlots<{
  default(): any;
}>();

</script>

<template>
  <B24Chip
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
  </B24Chip>
</template>
