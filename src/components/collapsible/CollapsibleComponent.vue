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
      v-for="(_, slot) in $slots"
      :key="slot"
      #[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </B24Collapsible>
</template>
