<script lang="ts" setup>
import type { BadgeModel } from './model';

const props = defineProps<BadgeModel>();

</script>

<template>
  <B24Badge
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
  </B24Badge>
</template>
