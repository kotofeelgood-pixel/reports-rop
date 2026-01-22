<script lang="ts" setup>
import type { DropdownMenuModel } from './model';

const props = defineProps<DropdownMenuModel>();

defineSlots<{
  default(): any;
  trigger(): any;
}>();

</script>

<template>
  <B24DropdownMenu
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
  </B24DropdownMenu>
</template>
