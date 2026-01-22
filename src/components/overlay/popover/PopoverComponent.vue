<script lang="ts" setup>
import type { PopoverModel } from './model';

const props = defineProps<PopoverModel>();

defineSlots<{
  default(): any;
  trigger(): any;
}>();

</script>

<template>
  <B24Popover
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
  </B24Popover>
</template>
