<script lang="ts" setup>
import type { CollapsibleModel } from './model';

const props = defineProps<CollapsibleModel>();
const open = defineModel<boolean>('open');

</script>

<template>
  <B24Collapsible
    v-bind="props"
    v-model:open="open"
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
  </B24Collapsible>
</template>
