<script lang="ts" setup>
import type { PageListModel } from './model';

const props = defineProps<PageListModel>();

defineSlots<{
  default(): any;
}>();

</script>

<template>
  <B24PageList
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
  </B24PageList>
</template>
