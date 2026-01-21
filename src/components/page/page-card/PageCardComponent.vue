<script lang="ts" setup>
import type { PageCardModel } from './model';

const props = defineProps<PageCardModel>();

defineSlots<{
  default(): any;
}>();

</script>

<template>
  <B24PageCard
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
  </B24PageCard>
</template>
