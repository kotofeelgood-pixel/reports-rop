<script lang="ts" setup>
import type { NavigationMenuModel } from './model';

const props = defineProps<NavigationMenuModel>();

defineSlots<{
  default(): any;
}>();

</script>

<template>
  <B24NavigationMenu
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
  </B24NavigationMenu>
</template>
