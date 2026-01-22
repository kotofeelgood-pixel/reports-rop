<script lang="ts" setup>
import type { TooltipModel } from './model';

const props = defineProps<TooltipModel>();

defineSlots<{
  default(): any;
  trigger(): any;
}>();

</script>

<template>
  <B24Tooltip
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
  </B24Tooltip>
</template>
