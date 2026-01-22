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
      v-for="(_, slot) in ($slots as any)"
      :key="slot"
      #[slot]="scope"
    >
      <slot
        :name="slot as string"
        v-bind="scope"
      />
    </template>
  </B24PageCard>
</template>
