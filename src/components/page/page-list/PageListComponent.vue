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
      v-for="(_, slot) in $slots"
      :key="slot"
      #[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </B24PageList>
</template>
