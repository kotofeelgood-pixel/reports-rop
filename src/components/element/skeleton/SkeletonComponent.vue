<script lang="ts" setup>
import type { SkeletonModel } from './model';

const props = defineProps<SkeletonModel>();

defineSlots<{
  default(): any;
}>();

</script>

<template>
  <B24Skeleton
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
  </B24Skeleton>
</template>
