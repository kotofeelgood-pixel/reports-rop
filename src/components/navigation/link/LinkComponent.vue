<script lang="ts" setup>
import type { LinkModel } from './model';

const props = defineProps<LinkModel>();

defineSlots<{
  default(): any;
}>();

</script>

<template>
  <B24Link
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
  </B24Link>
</template>
