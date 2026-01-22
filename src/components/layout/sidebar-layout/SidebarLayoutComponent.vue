<script lang="ts" setup>
import type { SidebarLayoutModel } from './model';

const props = defineProps<SidebarLayoutModel>();

defineSlots<{
  default(): any;
  sidebar(): any;
}>();

</script>

<template>
  <B24SidebarLayout
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
  </B24SidebarLayout>
</template>
